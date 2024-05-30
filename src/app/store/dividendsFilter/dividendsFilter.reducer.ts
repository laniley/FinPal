import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const initialState = {
  dateInput: '',
  assets: [],
} as DividendsFilter

const dividendsFilterSlice = createSlice({
	name: 'dividendsFilter',
	initialState,
	reducers: {
    setDateInput(state, action) {
			state.dateInput = action.payload
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
	}
})

// Extract the action creators object and the reducer
const { actions, reducer } = dividendsFilterSlice
// Extract and export each action creator by name
export const {
  setDateInput,
  toggleAsset,
  setAssets,
} = actions

export default reducer