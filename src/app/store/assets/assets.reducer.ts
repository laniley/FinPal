import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const initialState = { assets:[] as Asset[] }

export const setAssets = createAsyncThunk(
  'assets/sortAssets',
  async (assets:Asset[], thunkAPI) => {
		const sorted = assets.slice().sort((a:Asset, b:Asset) => sortBy(a, b, 'name', 'desc'))
		thunkAPI.dispatch(setAssetsInternal(sorted))
  }
)

function sortBy(a:Asset, b:Asset, property:string, direction:'asc'|'desc') {
	if(property == 'name') {
		if(direction == 'asc')
			return a.name.localeCompare(b.name)
		else
			return b.name.localeCompare(a.name)
	}
	else if(property == 'KGV') {
		if(direction == 'asc')
			return a.KGV.localeCompare(b.KGV)
		else
			return b.KGV.localeCompare(a.KGV)
	}
}

const assetsSlice = createSlice({
	name: 'assets',
	initialState,
	reducers: {
		setAssetsInternal(state, action) {
			state.assets = action.payload
		},
	}
})

// Extract the action creators object and the reducer
const { actions, reducer } = assetsSlice
// Extract and export each action creator by name
export const {
	setAssetsInternal
} = actions

export default reducer