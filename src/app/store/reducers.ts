// @flow
import { combineReducers } from '@reduxjs/toolkit';

import appState from './appState/appState.reducer';
import transactions from './transactions/transactions.reducer';
import transactionCreation from './transactionCreation/transactionCreation.reducer'

export const rootReducer = combineReducers({
	appState,
	transactions,
	transactionCreation
});

export type RootState = ReturnType<typeof rootReducer>;
