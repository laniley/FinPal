import { _current_content, load, saveDatabase, saveSelectedTab, saveTheme, save_Transactions_AssetFilter } from "./appStateAPI";

describe('appStateAPI', () => {

  describe('load(filePath:string)', () => {

    it('returns the default _current_content object, if the config file does not exist', async() => {

      const spyOn = jest.spyOn(console, 'log')

      const result = load('testFilePath')

      expect(spyOn).toHaveBeenCalledWith('no config file found in testFilePath')
      expect(result).toEqual(_current_content)
    });

    it('logs a message, if the config file does exist, but is empty', async() => {

      const filePath = process.cwd() + '\\src\\testing\\test_configs\\config_empty.json'
      const spyOn = jest.spyOn(console, 'log')

      load(filePath)

      expect(spyOn).toHaveBeenCalledWith('Config file ' + filePath + ' is empty.')
    });

    it('logs a message, if the config file does exist, but is no valid json', async() => {

      const filePath = process.cwd() + '\\src\\testing\\test_configs\\config_not_valid.json'
      const spyOn = jest.spyOn(console, 'log')

      load(filePath)

      expect(spyOn).toHaveBeenCalledWith('JSON.parse of ' + filePath + ' failed.')
    });

  })

  it('handles saveTheme(theme:string)', async() => {

    const filePath = process.cwd() + '\\src\\testing\\test_configs\\config.json'

    saveTheme("bp5-light")
    const result1 = load(filePath)
    expect(result1.theme).toEqual("bp5-light")

    saveTheme("bp5-dark")
    const result2 = load(filePath)
    expect(result2.theme).toEqual("bp5-dark")
  });

  it('handles saveSelectedTab(selectedTab:string)', async() => {

    const filePath = process.cwd() + '\\src\\testing\\test_configs\\config.json'

    saveSelectedTab("databaseTab")
    const result1 = load(filePath)
    expect(result1.selectedTab).toEqual("databaseTab")

    saveSelectedTab("assetsTab")
    const result2 = load(filePath)
    expect(result2.selectedTab).toEqual("assetsTab")
  });

  it('handles saveDatabase(database:string)', async() => {

    const filePath = process.cwd() + '\\src\\testing\\test_configs\\config.json'

    saveDatabase("")
    const result1 = load(filePath)
    expect(result1.database).toEqual("")

    saveDatabase("C:\\Users\\melan\\Dropbox\\Melle\\Development\\FinPal\\db_test.sqlite3")
    const result2 = load(filePath)
    expect(result2.database).toEqual("C:\\Users\\melan\\Dropbox\\Melle\\Development\\FinPal\\db_test.sqlite3")
  });

  it('handles save_Transactions_AssetFilter(assetIDs:number[])', async() => {

    const filePath = process.cwd() + '\\src\\testing\\test_configs\\config.json'

    save_Transactions_AssetFilter([1,2,3])
    const result = load(filePath)
    expect(result.transactions_AssetFilter).toEqual([1,2,3])
  });

})