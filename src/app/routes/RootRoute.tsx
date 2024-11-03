import { useAppSelector, useAppDispatch } from './../hooks'
import * as appStateReducer from "./../store/appState/appState.reducer";
import * as assetsReducer from '../store/assets/assets.reducer';
import * as assetCreationReducer from '../store/assetCreation/assetCreation.reducer';
import * as transactionsReducer from '../store/transactions/transactions.reducer';
import * as transactionCreationReducer from '../store/transactionCreation/transactionCreation.reducer';
import * as dividendsReducer from '../store/dividends/dividends.reducer';
import * as dividendCreationReducer from '../store/dividendCreation/dividendCreation.reducer';

import TopNavBar from './components/TopNavBar/TopNavBar';
import TransactionsRoute from './routes/TransactionsRoute/TransactionsRoute';
import DividendsRoute from './routes/DividendsRoute/DividendsRoute';
import AssetsRoute from './routes/AssetsRoute/AssetsRoute';

import dividends_sql from '../../sql/dividends_sql'
import assets_v_sql from '../../sql/assets_v_sql'
import transactions_v_sql from '../../sql/transactions_v_sql'

export default function RootRoute() {

	console.log("dataPath: " + window.API.appState.dataPath)
	console.log("filePath: " + window.API.appState.filePath)

	const dispatch = useAppDispatch();

	const result = window.API.appState.load(window.API.appState.filePath)
	console.log("appState loaded: ", result)

	setTheme(result.theme)

	if (result.selectedTab) {
		console.log("selectedTab: " + result.selectedTab);
		dispatch(appStateReducer.changeSelectedTab(result.selectedTab))
	}
	else {
		console.log("selectedTab: not set");
	}

	if (result.database) {
		console.log("database: " + result.database);
		dispatch(appStateReducer.setDatabase(result.database))
		setupAssets().then(() => {
			setupTransactions().then(() => {
				setupDividends().then(() => {
					setupAssetsView().then(() => {
						dispatch(assetsReducer.loadAssets()).then(() => {
							dispatch(transactionsReducer.loadTransactions())
						})
					})
				})
			})
		})
	}
	else {
		console.log("database: not set");
	}

	return (
		<div id="RootRoute" className="h-screen">
 			<TopNavBar />
			<div id="Title" className={`flex items-center p-2 bg-gradient-to-l from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%`}></div>
			
			<div id="rootContent" className="absolute flex flex-col w-full top-[65px] bottom-0">
				<Content />
			</div>
		</div>
	);



	async function setupAssets() {
		var sql  = 'CREATE TABLE IF NOT EXISTS assets ('
				sql += 'ID INTEGER PRIMARY KEY, '
				sql += 'name UNIQUE VARCHAR NOT NULL, '
				sql += 'symbol UNIQUE VARCHAR NOT NULL, '
				sql += 'isin UNIQUE VARCHAR NOT NULL, '
				sql += 'kgv)'
		console.log(sql)
		await window.API.sendToDB(sql)
		sql  = 'SELECT MAX(ID) as ID FROM assets'
		console.log(sql)
		var result = await window.API.sendToDB(sql)
		var newID = 0
		if(result[0]) {
			newID = result[0].ID + 1
		}
		console.log('New ID (assets): ' + newID)
		dispatch(assetCreationReducer.setID(newID))
	}

	async function setupTransactions() {
		let sql  = 'CREATE TABLE IF NOT EXISTS transactions ('
				sql += 'ID INTEGER PRIMARY KEY, '
				sql += 'date DATE, '
				sql += 'type VARCHAR NOT NULL, '
				sql += 'asset_ID INTEGER NOT NULL, '
				sql += 'amount REAL, '
				sql += 'price_per_share REAL, '
				sql += 'fee REAL, '
				sql += 'solidarity_surcharge REAL)'
		console.log(sql)
		await window.API.sendToDB(sql)
			 sql  = 'SELECT MAX(ID) as ID FROM transactions'
		console.log(sql)
		var result = await window.API.sendToDB(sql)
		console.log(result)
		var newID = 0
		if(result[0]) {
			newID = result[0].ID + 1
		}
		console.log('New ID (transactions): ' + newID)
		dispatch(transactionCreationReducer.setNewID(newID))
		console.log(transactions_v_sql)
		result = await window.API.sendToDB(transactions_v_sql)
		console.log('result: ', result)
	}

	async function setupDividends() {
		console.log(dividends_sql)
		await window.API.sendToDB(dividends_sql)
		let sql  = 'SELECT MAX(ID) as ID FROM dividends'
		console.log(sql)
		var result = await window.API.sendToDB(sql)
		console.log(result)
		var newID = 0
		if(result[0]) {
			newID = result[0].ID + 1
		}
		console.log('New ID (dividends): ' + newID)
		dispatch(dividendCreationReducer.setNewID(newID))
		await dispatch(dividendsReducer.loadDividends())
	}

	async function setupAssetsView() {
		console.log(assets_v_sql)
		let result = await window.API.sendToDB(assets_v_sql)
		console.log('result - assets_v: ', result)
	}
}

export function setTheme(theme:string) {
	const dispatch = useAppDispatch();
	if (theme) {
		console.log("theme: " + theme);
		dispatch(appStateReducer.setTheme(theme))
	}
	else {
		console.log("theme: not set");
	}
}

export function Content() {
	const selectedTab = useAppSelector(state => state.appState.selectedTab)
	if(selectedTab == 'transactionsTab')
		return(<TransactionsRoute/>)
	else if(selectedTab == 'dividendsTab')
		return(<DividendsRoute/>)
	else if(selectedTab == 'assetsTab')
		return(<AssetsRoute/>)
}