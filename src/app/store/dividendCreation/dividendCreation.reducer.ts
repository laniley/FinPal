import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as dividendsReducer from './../dividends/dividends.reducer';
import * as assetsReducer from '../assets/assets.reducer';

export const initialState = {
  newID: null,
  dateInput: '',
	dateInputGotTouched: false,
  assetInput: '',
  assetInputGotTouched: false,
  incomeInput: '',
  incomeInputGotTouched: false,
} as DividendCreation

export const handleDateInputGotTouched = createAsyncThunk(
  'dividendCreation/handleDateInputGotTouched',
  async (props, thunkAPI) => {
		thunkAPI.dispatch(setDateInputGotTouched(true))
		thunkAPI.dispatch(validate())
  }
)

export const handleAssetInputGotTouched = createAsyncThunk(
  'dividendCreation/handleAssetInputGotTouched',
  async (props, thunkAPI) => {
		thunkAPI.dispatch(setAssetInputGotTouched(true))
		thunkAPI.dispatch(validate())
  }
)

export const handleIncomeInputGotTouched = createAsyncThunk(
  'dividendCreation/handleAmountInputGotTouched',
  async (props, thunkAPI) => {
		thunkAPI.dispatch(setIncomeInputGotTouched(true))
		thunkAPI.dispatch(validate())
  }
)

export const validate = createAsyncThunk(
  'dividendCreation/validate',
  async (props, thunkAPI) => {
		let state = thunkAPI.getState() as State
    console.log(
      state.dividendCreation.dateInputGotTouched, 
      state.dividendCreation.assetInputGotTouched,
      state.dividendCreation.incomeInputGotTouched,
    )
    if(state.dividendCreation.dateInputGotTouched && 
      state.dividendCreation.assetInputGotTouched && 
      state.dividendCreation.incomeInputGotTouched
   ) {
    let sql  = 'INSERT OR REPLACE INTO dividends (ID, date, asset_ID, income) '
        sql += 'VALUES (\'' + state.dividendCreation.newID
        sql += '\',\'' + state.dividendCreation.dateInput
        sql += '\',\'' + state.dividendCreation.assetInput.replace('\'', '\'\'')
        sql += '\',\'' + state.dividendCreation.incomeInput.replace(',', '.') + '\')'
    
    console.log(sql)
     
    await window.API.sendToDB(sql).then(async (result:any) => {
      console.log(result)
      let sql  = 'SELECT MAX(ID) as ID FROM dividends'
			console.log(sql)
			await window.API.sendToDB(sql).then(async (result:any) => {
				thunkAPI.dispatch(setNewID(result[0].ID + 1))
				await thunkAPI.dispatch(dividendsReducer.loadDividends())
        await thunkAPI.dispatch(assetsReducer.loadAssets())
			});
     });
     thunkAPI.dispatch(reset())
   }
  }
)

export const reset = createAsyncThunk(
  'dividendCreation/reset',
  async (props, thunkAPI) => {
		thunkAPI.dispatch(setDateInputGotTouched(false))
		thunkAPI.dispatch(setDateInput(''))
    thunkAPI.dispatch(setAssetInputGotTouched(false))
		thunkAPI.dispatch(setAssetInput(''))
    thunkAPI.dispatch(setIncomeInputGotTouched(false))
		thunkAPI.dispatch(setIncomeInput(''))

    let state = thunkAPI.getState() as State
    console.log(
      state.dividendCreation.dateInputGotTouched, 
      state.dividendCreation.assetInputGotTouched,
      state.dividendCreation.incomeInputGotTouched,
    )
    document.getElementById("dateInput").focus();
  }
)

const dividendCreationSlice = createSlice({
	name: 'dividendCreation',
	initialState,
	reducers: {
    setNewID(state, action) {
			state.newID = action.payload
		},
    setDateInput(state, action) {
			state.dateInput = action.payload
		},
		setDateInputGotTouched(state, action) {
			state.dateInputGotTouched = action.payload
		},
    setAssetInput(state, action) {
			state.assetInput = action.payload
		},
    setAssetInputGotTouched(state, action) {
			state.assetInputGotTouched = action.payload
		},
    setIncomeInput(state, action) {
			state.incomeInput = action.payload
		},
    setIncomeInputGotTouched(state, action) {
			state.incomeInputGotTouched = action.payload
		}
	}
})

// Extract the action creators object and the reducer
const { actions, reducer } = dividendCreationSlice
// Extract and export each action creator by name
export const {
  setNewID,
  setDateInput,
	setDateInputGotTouched,
  setAssetInput,
  setAssetInputGotTouched,
  setIncomeInput,
  setIncomeInputGotTouched,
} = actions

export default reducer