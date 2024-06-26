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
        load():any,
        saveTheme(theme:string):any,
        saveSelectedTab(selectedTab:string):any
      },
      sendToDB(sql:string):any,
      sendToFinanceAPI(args:{symbol:string}):any,
      quit():any
    }
  }
}

contextBridge.exposeInMainWorld('API', {
  appState: appState,
  quit: () => remote.app.quit(),
  sendToDB(message:any) {
    return new Promise((resolve) => {
        ipcRenderer.once('async-db-reply', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('async-db-message', message);
    });
  },
  sendToFinanceAPI(args: { symbol:string}) {
    return new Promise((resolve) => {
        ipcRenderer.once('finance-api-reply', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('finance-api-message', args);
    });
  },
})