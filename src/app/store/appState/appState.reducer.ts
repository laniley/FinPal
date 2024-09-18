import { TabId } from '@blueprintjs/core';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AppState from './appState';

export enum AssetOverlayType {
  NEW = 'NEW',
  EDIT = 'EDIT'
}

export const initialState = {
	selectedTab: "transactionsTab",
	theme: "bp5-dark",
	database: "",
	assetOverlayType: AssetOverlayType.NEW,
	showAssetOverlay: false
} as AppState

export const changeSelectedTab = createAsyncThunk(
  'appState/changeSelectedTab',
  async (navbarTabId:TabId, thunkAPI) => {
		console.log("Changing the selected tab to '" + navbarTabId + "' ...")
		let state:any = thunkAPI.getState()
		thunkAPI.dispatch(setSelectedTab(navbarTabId))
		state = thunkAPI.getState()
		window.API.appState.saveSelectedTab(state.appState.selectedTab)
		return state.appState
  }
)

const appStateSlice = createSlice({
	name: 'appState',
	initialState,
	reducers: {
		setSelectedTab(state, action) {
			state.selectedTab = action.payload
		},
		setTheme(state, action) {
			state.theme = action.payload
		},
		setDatabase(state, action) {
			state.database = action.payload
		},
		setAssetOverlayType(state, action) {
			state.assetOverlayType = action.payload
		},
		setShowAssetOverlay(state, action) {
			state.showAssetOverlay = action.payload
		},
	}
})

// Extract the action creators object and the reducer
const { actions, reducer } = appStateSlice
// Extract and export each action creator by name
export const {
	setSelectedTab, 
	setTheme,
	setDatabase,
	setAssetOverlayType,
	setShowAssetOverlay,
} = actions

export default reducer
