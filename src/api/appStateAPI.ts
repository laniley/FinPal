const remote = require('@electron/remote')
const app = remote.app
const fs = require('fs');
const path = require('path');

export const dataPath = app.getPath('userData');
export const filePath = path.join(dataPath, 'config.json');

var _current_content = {
  selectedTab: "",
  theme: "",
  database: ""
}

export function load(filePath:string) {
  if(!fs.existsSync(filePath)) {
    console.log('no config file found in ' + filePath)
    return _current_content
  }
  let result = fs.readFileSync( filePath, { encoding: 'utf8', flag: 'r' } )
  if(result) {
    try {
      _current_content = JSON.parse(result)
      return _current_content
    } catch (e) {
      console.log("JSON.parse of " + filePath + " failed.")
    }
  }
  else {
    console.log('Config file ' + filePath + ' is empty.')
  }
}

export function saveTheme(theme:string) {
  load(filePath)
  Object.assign(_current_content, { theme: theme });
  fs.writeFileSync( filePath, JSON.stringify(_current_content))
}

export function saveSelectedTab(selectedTab:string) {
  load(filePath)
  Object.assign(_current_content, { selectedTab: selectedTab });
  fs.writeFileSync( filePath, JSON.stringify(_current_content))
}