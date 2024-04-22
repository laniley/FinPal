import { TabId } from '@blueprintjs/core';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { appStateAPI } from './../../../../src/api/appStateAPI';

const { dialog } = require('@electron/remote');

export const initialState = {
	route: "databaseTab",
	theme: "bp5-dark",
} as AppState

export const changeRoute = createAsyncThunk(
  'appState/changeCurrentRootRoute',
  async (navbarTabId:TabId, thunkAPI) => {
		console.log("Changing the current root route to '" + navbarTabId + "' ...")
		let state:any = thunkAPI.getState()
		thunkAPI.dispatch(setRoute(navbarTabId))
		state = thunkAPI.getState()
		appStateAPI.save(state.appState)
		return state.appState
  }
)

const appStateSlice = createSlice({
	name: 'appState',
	initialState,
	reducers: {
		setRoute(state, action) {
			state.route = action.payload
		},
		setTheme(state, action) {
			state.theme = action.payload
		},
	}
})

// Extract the action creators object and the reducer
const { actions, reducer } = appStateSlice
// Extract and export each action creator by name
export const {
	setRoute, 
	setTheme,
} = actions

export default reducer


/*
	switch (action.type) {

		case appStateActions.SET_OBJECT_TO_DELETE:
			return Object.assign({}, state, {
				object_to_delete: action.object_to_delete
			});

		case appStateActions.SHOW_MOVE_TO_TRASH_ALERT:
			return Object.assign({}, state, {
				showMoveToTrashAlert: true,
			});

		case appStateActions.HIDE_MOVE_TO_TRASH_ALERT:
			return Object.assign({}, state, {
				showMoveToTrashAlert: false,
			});

        default:
            return state;
						
    }
		*/
