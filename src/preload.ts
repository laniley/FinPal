// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import * as appState from './api/appStateAPI'
const { contextBridge, ipcRenderer } = window.require('electron');
const remote = require('@electron/remote')

declare global {
  interface Window {
    API: { 
      appState: {
        dataPath: string,
        filePath: string,
        load(filePath:string):any,
        saveTheme(theme:string):any,
        saveSelectedTab(selectedTab:string):any,
        saveDatabase(database:string):any
      },
      selectFolder():any,
      dbFileExists():boolean,
      sendToDB(sql:string):any,
      sendToFinanceAPI(args:{symbol:string}):any,
      quit():any
    }
  }
}

contextBridge.exposeInMainWorld('API', {
  appState: appState,
  quit: () => remote.app.quit(),
  selectFolder: () => ipcRenderer.invoke('dialog:openDirectory'),
  dbFileExists() {
    return new Promise((resolve) => {
      ipcRenderer.send('check-if-db-file-exists');
      ipcRenderer.once('check-if-db-file-exists', (_, arg) => {
          resolve(arg);
      });
    });
  },
  sendToDB(sql:any) {
    console.log(sql)
    return new Promise((resolve) => {
      ipcRenderer.send('async-db-message', sql);
      ipcRenderer.once('async-db-reply', (_, arg) => {
          resolve(arg);
      });
    });
  },
  sendToFinanceAPI(args: { symbol:string}) {
    return new Promise((resolve) => {
      ipcRenderer.send('finance-api-message', args);
      ipcRenderer.once('finance-api-reply', (_, arg) => {
          resolve(arg);
      });
    });
  },
})