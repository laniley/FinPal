import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const initialState = { transactions:[] as Transaction[] }

export const setTransactions = createAsyncThunk(
  'transactions/sortTransactions',
  async (transactions:Transaction[], thunkAPI) => {
		const sorted = transactions.slice().sort((a:Transaction, b:Transaction) => sortBy(a, b, 'date', 'desc'))
		let state:any = thunkAPI.getState()
		thunkAPI.dispatch(setTransactionsInternal(sorted))
  }
)

function sortBy(a:Transaction, b:Transaction, property:string, direction:'asc'|'desc') {
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

const transactionsSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		setTransactionsInternal(state, action) {
			state.transactions = action.payload
		},
	}
})

// Extract the action creators object and the reducer
const { actions, reducer } = transactionsSlice
// Extract and export each action creator by name
export const {
	setTransactionsInternal
} = actions

export default reducer