import * as appStateAPI from './src/api/appStateAPI'

const path_to_test_configs = process.cwd() + '\\src\\testing\\test_configs\\'
const filePath = path_to_test_configs + 'config.json'

window.API = {
  appState:{
    dataPath: path_to_test_configs,
    filePath: filePath,
    load: () => appStateAPI.load(filePath),
    saveTheme: jest.fn(),
    saveSelectedTab: jest.fn()
  },
  sendToDB: jest.fn((param) => { if(param == 'SELECT MAX(ID) as ID FROM assets') return [{ID: 1}] }),
  sendToFinanceAPI: jest.fn(),
  quit: jest.fn()
}