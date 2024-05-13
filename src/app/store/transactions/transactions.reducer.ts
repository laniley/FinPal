import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { updateCurrentInvest } from './../assets/assets.reducer'

export const initialState = { transactions:[] as Transaction[] }

export const loadTransactions = createAsyncThunk(
  'transactions/loadTransactions',
  async (props, thunkAPI) => {
		var sql = 'SELECT * FROM transactions_v'
		console.log(sql)
		var result = await window.API.sendToDB(sql)
		result.forEach((transaction:Transaction) => {
			if(transaction.rank == 1)
				transaction.invest_cumulated = transaction.in_out
			else
				transaction.invest_cumulated = 0
		});
		result.forEach((transaction:Transaction) => {
			var prev_trans = result.find((other_trans:Transaction) => other_trans.asset == transaction.asset && other_trans.rank == transaction.rank-1)
			if(transaction.rank > 1 && transaction.type == 'Buy')
				transaction.invest_cumulated = transaction.in_out + prev_trans.invest_cumulated
			else if(transaction.rank > 1 && transaction.type == 'Sell')
				transaction.invest_cumulated = transaction.shares_cumulated * prev_trans.invest_cumulated
		});

		console.log('result - load transactions: ', result)

		thunkAPI.dispatch(setTransactions(result))

		thunkAPI.dispatch(updateCurrentInvest())
  }
)

export const setTransactions = createAsyncThunk(
  'transactions/sortTransactions',
  async (transactions:Transaction[], thunkAPI) => {
		const sorted = transactions.slice().sort((a:Transaction, b:Transaction) => sortBy(a, b, 'date', 'desc'))
		thunkAPI.dispatch(setTransactionsInternal(sorted))
  }
)

export function sortBy(a:Transaction, b:Transaction, property:string, direction:'asc'|'desc') {
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