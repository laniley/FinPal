import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as assetsReducer from '../assets/assets.reducer';

export const initialState = {
  newID: null,
  nameInput: '',
	nameInputGotTouched: false,
  symbolInput: '',
	symbolInputGotTouched: false,
  isinInput: '',
	isinInputGotTouched: false,
  kgvInput: '',
  kgvInputGotTouched: false,
} as AssetCreation

export const handleNameInputGotTouched = createAsyncThunk(
  'assetCreation/handleNameInputGotTouched',
  async (props, thunkAPI) => {
		thunkAPI.dispatch(setNameInputGotTouched(true))
		thunkAPI.dispatch(validate())
  }
)

export const handleSymbolInputGotTouched = createAsyncThunk(
  'assetCreation/handleSymbolInputGotTouched',
  async (props, thunkAPI) => {
		thunkAPI.dispatch(setSymbolInputGotTouched(true))
		thunkAPI.dispatch(validate())
  }
)

export const handleISINInputGotTouched = createAsyncThunk(
  'assetCreation/handleISINInputGotTouched',
  async (props, thunkAPI) => {
		thunkAPI.dispatch(setISINInputGotTouched(true))
		thunkAPI.dispatch(validate())
  }
)

export const handleKGVInputGotTouched = createAsyncThunk(
  'assetCreation/handleKGVInputGotTouched',
  async (props, thunkAPI) => {
		thunkAPI.dispatch(setKGVInputGotTouched(true))
		thunkAPI.dispatch(validate())
  }
)

export const validate = createAsyncThunk(
  'assetCreation/validate',
  async (props, thunkAPI) => {
		let state = thunkAPI.getState() as State
    if(state.assetCreation.nameInputGotTouched && 
       state.assetCreation.symbolInputGotTouched &&
       state.assetCreation.isinInputGotTouched &&
       state.assetCreation.kgvInputGotTouched
   ) {
    let sql  = 'INSERT OR REPLACE INTO assets (ID, name, symbol, isin, kgv) '
        sql += 'VALUES (\'' + state.assetCreation.newID
        sql += '\',\'' + state.assetCreation.nameInput.replace('\'', '\'\'')
        sql += '\',\'' + state.assetCreation.symbolInput.replace('\'', '\'\'')
        sql += '\',\'' + state.assetCreation.isinInput.replace('\'', '\'\'')
        sql += '\',\'' + state.assetCreation.kgvInput.replace('\'', '\'\'') + '\')'
    
    console.log(sql)
     
    window.API.sendToDB(sql)
      .then((result:any) => {
        console.log(result)
        let sql  = 'SELECT MAX(ID) as ID FROM assets'
        console.log(sql)
        window.API.sendToDB(sql)
          .then((result:any) => {
            thunkAPI.dispatch(setNewID(result[0].ID + 1))
            sql = 'SELECT * FROM assets_v'
            console.log(sql)
            window.API.sendToDB(sql)
              .then((result:Asset[]) => {
                console.log('result: ', result)
                thunkAPI.dispatch(assetsReducer.setAssets(result))
                return true;
              });
          });
      });
     thunkAPI.dispatch(reset())
   }
   else {
    return false;
   }
  }
)

export const reset = createAsyncThunk(
  'assetCreation/reset',
  async (props, thunkAPI) => {
		thunkAPI.dispatch(setNameInputGotTouched(false))
		thunkAPI.dispatch(setNameInput(''))
    thunkAPI.dispatch(setSymbolInputGotTouched(false))
		thunkAPI.dispatch(setSymbolInput(''))
    thunkAPI.dispatch(setISINInputGotTouched(false))
		thunkAPI.dispatch(setISINInput(''))
    thunkAPI.dispatch(setKGVInputGotTouched(false))
		thunkAPI.dispatch(setKGVInput(''))

    let state = thunkAPI.getState() as State
    document.getElementById("nameInput").focus();
  }
)

const assetCreationSlice = createSlice({
	name: 'assetCreation',
	initialState,
	reducers: {
    setNewID(state, action) {
			state.newID = action.payload
		},
    setNameInput(state, action) {
			state.nameInput = action.payload
		},
		setNameInputGotTouched(state, action) {
			state.nameInputGotTouched = action.payload
		},
    setSymbolInput(state, action) {
			state.symbolInput = action.payload
		},
		setSymbolInputGotTouched(state, action) {
			state.symbolInputGotTouched = action.payload
		},
    setISINInput(state, action) {
			state.isinInput = action.payload
		},
		setISINInputGotTouched(state, action) {
			state.isinInputGotTouched = action.payload
		},
    setKGVInput(state, action) {
			state.kgvInput = action.payload
		},
		setKGVInputGotTouched(state, action) {
			state.kgvInputGotTouched = action.payload
		}
	}
})

// Extract the action creators object and the reducer
const { actions, reducer } = assetCreationSlice
// Extract and export each action creator by name
export const {
  setNewID,
  setNameInput,
	setNameInputGotTouched,
  setSymbolInput,
	setSymbolInputGotTouched,
  setISINInput,
	setISINInputGotTouched,
  setKGVInput,
  setKGVInputGotTouched,
} = actions

export default reducer