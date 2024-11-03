import * as appStateAPI from './src/api/appStateAPI'

const filePath = 'C:\\Users\\melan\\AppData\\Roaming\\FinPal_Test\\config.json'

window.API = {
  appState:{
    dataPath: 'C:\\Users\\melan\\AppData\\Roaming\\FinPal_Test',
    filePath: filePath,
    load: () => appStateAPI.load(filePath),
    saveTheme: jest.fn(),
    saveSelectedTab: jest.fn()
  },
  sendToDB: jest.fn((param) => { if(param == 'SELECT MAX(ID) as ID FROM assets') return [{ID: 1}] }),
  sendToFinanceAPI: jest.fn(),
  quit: jest.fn()
}