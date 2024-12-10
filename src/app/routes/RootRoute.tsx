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
import DatabaseRoute from './routes/DatabaseRoute/DatabaseRoute';

import assets_sql from '../../sql/assets_sql'
import dividends_sql from '../../sql/dividends_sql'
import assets_v_sql from '../../sql/assets_v_sql'
import transactions_v_sql from '../../sql/transactions_v_sql'
import appState_sql from '../../sql/appState_sql';


export default function RootRoute() {

	console.log("dataPath: " + window.API.appState.dataPath)
	console.log("filePath: " + window.API.appState.filePath)

	const dispatch = useAppDispatch();

	const result = window.API.appState.load(window.API.appState.filePath)
	console.log("appState loaded: ", result)

	setTheme(result.theme)
	
	if (result.database && result.database != "" && window.API.dbFileExists()) {
		console.log("database: " + result.database);
		setDatabase(result.database)
		if(result.selectedTab != "databaseTab")
			setSelectedTab(result.selectedTab)
		else
			setSelectedTab("assetsTab")
	}
	else {
		console.log("database: not set");
		setSelectedTab("databaseTab")
	}

	const database = useAppSelector(state => state.appState.database)

	if(database && database != "") {
		sendToDB(appState_sql).then(() => {
			setupAssets().then(() => {
				setupTransactions().then(() => {
					setupDividends().then(() => {
						setupDividendsView().then(() => {
							setupAssetsView().then(() => {
								dispatch(assetsReducer.loadAssets()).then(() => {
									dispatch(transactionsReducer.loadTransactions())
								})
							})
						})
					})
				})
			})
		})
	}

	return (
		<div id="RootRoute" className="h-screen">
 			<TopNavBar />
			<div id="Title" className={`flex items-center p-2 bg-gradient-to-l from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%`}></div>
			<Content />
		</div>
	);

	async function setupAssets() {
		await sendToDB(assets_sql)
		let sql  = 'SELECT MAX(ID) as ID FROM assets'
		var result = await sendToDB(sql)
		var newID = 0
		if(result[0]) {
			newID = result[0].ID + 1
		}
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
		await sendToDB(sql)
		sql  = 'SELECT MAX(ID) as ID FROM transactions'
		var result = await sendToDB(sql)
		var newID = 0
		if(result) {
			newID = result[0].ID + 1
		}
		console.log('New ID (transactions): ' + newID)
		dispatch(transactionCreationReducer.setNewID(newID))
		result = await sendToDB(transactions_v_sql)
	}

	async function setupDividends() {
		await sendToDB(dividends_sql)
		let sql  = 'SELECT MAX(ID) as ID FROM dividends'
		var result = await sendToDB(sql)
		var newID = 0
		if(result) {
			newID = result[0].ID + 1
		}
		console.log('New ID (dividends): ' + newID)
		dispatch(dividendCreationReducer.setNewID(newID))
		await dispatch(dividendsReducer.loadDividends())
	}

	async function setupDividendsView() {
		await sendToDB(dividends_sql)
		let sql  = `CREATE VIEW IF NOT EXISTS dividends_v AS 
									SELECT 
										d.*, 
										a.name as asset_name 
									FROM dividends d
									LEFT JOIN assets a ON d.asset_ID = a.ID;`
		var result = await sendToDB(sql)
		console.log('result - dividends_v: ', result)
	}

	async function setupAssetsView() {
		let result = await window.API.sendToDB(assets_v_sql)
		console.log('result - assets_v: ', result)
	}
}

export async function sendToDB(sql:string) {
	var result:any = await window.API.sendToDB(sql)
	if(result && !Array.isArray(result) && result.includes('SQLITE_ERROR')) {
		console.error(result)
	}
	else {
		console.log('result', result)
		return result
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

export function setSelectedTab(selectedTab:string) {
	const dispatch = useAppDispatch();
	if (selectedTab) {
		console.log("selectedTab: " + selectedTab);
		dispatch(appStateReducer.changeSelectedTab(selectedTab))
	}
}

export function setDatabase(database:string) {
	const dispatch = useAppDispatch();
	if (database) {
		console.log("database: " + database);
		dispatch(appStateReducer.setDatabase(database))
	}
}

export function Content() {
	const selectedTab = useAppSelector(state => state.appState.selectedTab)
	const theme = useAppSelector(state => state.appState.theme)

	let mainContent = <DatabaseRoute/>
	if(selectedTab == 'transactionsTab')
		mainContent = <TransactionsRoute/>
	else if(selectedTab == 'dividendsTab')
		mainContent = <DividendsRoute/>
	else if(selectedTab == 'assetsTab')
		mainContent = <AssetsRoute/>

	return(
		<div id="rootContent" className={"absolute flex flex-col items-center w-full top-[66px] bottom-0 p-[15px] overflow-auto "  + theme}>
			{mainContent}
		</div>
	)
	
}