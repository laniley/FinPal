import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { updateCurrentInvest } from '../assets/assets.reducer'

export const initialState = { dividends:[] as Dividend[] }

export const loadDividends = createAsyncThunk(
  'dividends/loadDividends',
  async (props, thunkAPI) => {
		var sql = 'SELECT * FROM dividends'
		console.log(sql)
		var result = await window.API.sendToDB(sql)
		console.log('result - load dividends: ', result)

		thunkAPI.dispatch(setDividends(result))

		//thunkAPI.dispatch(updateCurrentInvest())
  }
)

export const setDividends = createAsyncThunk(
  'dividends/sortDividends',
  async (dividends:Dividend[], thunkAPI) => {
		const sorted = dividends.slice().sort((a:Dividend, b:Dividend) => sortBy(a, b, 'date', 'desc'))
		thunkAPI.dispatch(setDividendsInternal(sorted))
  }
)

export function sortBy(a:Dividend, b:Dividend, property:string, direction:'asc'|'desc') {
	if(property == 'date') {
		if(direction == 'asc')
			return a.date.localeCompare(b.date)
		else
			return b.date.localeCompare(a.date)
	}
	else if(property == 'asset') {
		if(direction == 'asc')
			return a.asset.localeCompare(b.asset)
		else
			return b.asset.localeCompare(a.asset)
	}
}

const dividendsSlice = createSlice({
	name: 'dividends',
	initialState,
	reducers: {
		setDividendsInternal(state, action) {
			state.dividends = action.payload
		},
	}
})

// Extract the action creators object and the reducer
const { actions, reducer } = dividendsSlice
// Extract and export each action creator by name
export const {
	setDividendsInternal
} = actions

export default reducer