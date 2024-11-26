import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'path';
import installExtension, { REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const fs = require('fs');
const dataPath = app.getPath('userData');
const filePath = path.join(dataPath, 'config.json');

let json = { database: '' }

if(fs.existsSync(filePath)) {

  let result = fs.readFileSync( filePath, { encoding: 'utf8', flag: 'r' } )
  console.log(result)
  if(result) {
    try {
      console.log("Parsing file " + filePath + " ...\n")
      json = JSON.parse(result)
      console.log(json)
      console.log("\n")
    } catch (e) {
      console.log("JSON.parse of " + filePath + " failed.")
    }
  }
  else {
    console.log('Config file ' + filePath + ' is empty.')
  }
}
else {
  console.log('Config file ' + filePath + ' does not exist.')
}

const sqlite3 = require('sqlite3');

ipcMain.on('check-if-db-file-exists', (event, arg) => {
  if(fs.existsSync(json.database)) {
    event.reply('check-if-db-file-exists', true);
  }
  else {
    event.reply('check-if-db-file-exists', false);
  }

});

ipcMain.on('async-db-message', (event, arg) => {
  const sql = arg;
  const database = new sqlite3.Database(json.database, (err:any) => {
    if (err) console.error('Database opening error: ', err);
  });
  database.all(sql, (err:any, rows:any) => {
    if(err && err.message) {
			console.error(err.message)
		}
    event.reply('async-db-reply', (err && err.message) || rows);
  });
  database.close()
});

import yahooFinance from 'yahoo-finance2';

ipcMain.on('finance-api-message', (event, args) => {
  yahooFinance.quoteSummary(args.symbol).then((result) => {
    event.reply('finance-api-reply', result);
  }).catch((reason) => console.log('ERROR: finance-api-message: ', reason));
});

// Keep a reference for dev mode
let dev = false
if (!app.isPackaged) {
  dev = true
  console.log("Executing in DEV mode!\n");
}
else {
  console.log("Executed in PROD mode!\n");
}

import { initialize, enable as enableRemote } from "@electron/remote/main";

initialize();

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: true,
			nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      webSecurity: false // to allow copying of local files
    },
  });

  ipcMain.handle('dialog:openDirectory', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [sqlite3]
    })
    if (canceled) {
      return
    } else {
      return filePaths[0]
    }
  })

  enableRemote(mainWindow.webContents);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  if (dev) {
    installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

    installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
  }

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {

    mainWindow.show()

    // Open the DevTools automatically if developing
    if (dev) {
      mainWindow.webContents.on('did-frame-finish-load', () => {
        // We close the DevTools so that it can be reopened and redux reconnected.
        // This is a workaround for a bug in redux devtools.
        mainWindow.webContents.closeDevTools();
        
        mainWindow.webContents.once('devtools-opened', () => {
          mainWindow.focus();
        });
        
        mainWindow.webContents.openDevTools();
      });
    }
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
