// @flow
import { combineReducers } from '@reduxjs/toolkit';
import { routerReducer } from 'react-router-redux';

import appState from './appState/appState.reducer';

export const rootReducer = combineReducers({
	appState,
	routerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
