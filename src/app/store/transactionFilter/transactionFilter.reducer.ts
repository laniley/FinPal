import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as transactionsReducer from '../transactions/transactions.reducer';

export const initialState = {
  dateInput: '',
  typeInput: '',
  assets: [],
  amountInput: '',
  priceInput: '',
  feeInput: '',
  solidaritySurchargeInput: '',
} as TransactionFilter

const transactionFilterSlice = createSlice({
	name: 'transactionFilter',
	initialState,
	reducers: {
    setDateInput(state, action) {
			state.dateInput = action.payload
		},
    setTypeInput(state, action) {
			state.typeInput = action.payload
		},
    toggleAsset(state, action) {
      if(!state.assets.includes(action.payload))
			  state.assets.push(action.payload)
      else 
        state.assets.splice(state.assets.indexOf(action.payload), 1)
		},
    setAssets(state, action) {
			state.assets = action.payload
		},
    setAmountInput(state, action) {
			state.amountInput = action.payload
		},
    setPriceInput(state, action) {
			state.priceInput = action.payload
		},
    setFeeInput(state, action) {
			state.feeInput = action.payload
		},
    setSolidaritySurchargeInput(state, action) {
			state.solidaritySurchargeInput = action.payload
		},
	}
})

// Extract the action creators object and the reducer
const { actions, reducer } = transactionFilterSlice
// Extract and export each action creator by name
export const {
  setDateInput,
  setTypeInput,
  toggleAsset,
  setAssets,
  setAmountInput,
  setPriceInput,
  setFeeInput,
  setSolidaritySurchargeInput,
} = actions

export default reducer