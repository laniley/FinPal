// @flow
import { combineReducers } from '@reduxjs/toolkit';

import appState from './appState/appState.reducer';
import assets from './assets/assets.reducer';
import assetCreation from './assetCreation/assetCreation.reducer';
import transactions from './transactions/transactions.reducer';
import transactionFilter from './transactionFilter/transactionFilter.reducer';
import transactionCreation from './transactionCreation/transactionCreation.reducer'
import dividends from './dividends/dividends.reducer';
import dividendsFilter from './dividendsFilter/dividendsFilter.reducer';
import dividendCreation from './dividendCreation/dividendCreation.reducer'

export const rootReducer = combineReducers({
	appState,
	assets,
	assetCreation,
	transactions,
	transactionFilter,
	transactionCreation,
	dividends,
	dividendsFilter,
	dividendCreation
});

export type RootState = ReturnType<typeof rootReducer>;
