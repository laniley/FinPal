import * as appStateAPI from './src/api/appStateAPI'

window.API = {
  appState:{
    dataPath: 'C:\\Users\\melan\\AppData\\Roaming\\FinPal_Test',
    filePath: 'C:\\Users\\melan\\AppData\\Roaming\\FinPal_Test\\config.json',
    load: () => appStateAPI.load(),
    saveTheme: jest.fn(),
    saveSelectedTab: jest.fn()
  },
  sendToDB: jest.fn((param) => { if(param == 'SELECT MAX(ID) as ID FROM assets') return [{ID: 1}] }),
  sendToFinanceAPI: jest.fn(),
  quit: jest.fn()
}