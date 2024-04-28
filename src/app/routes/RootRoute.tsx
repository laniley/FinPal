import { useAppSelector, useAppDispatch } from './../hooks'
import * as appStateReducer from "./../store/appState/appState.reducer";
import * as assetsReducer from '../store/assets/assets.reducer';
import * as assetCreationReducer from '../store/assetCreation/assetCreation.reducer';
import * as transactionsReducer from '../store/transactions/transactions.reducer';
import * as transactionCreationReducer from '../store/transactionCreation/transactionCreation.reducer';

import TopNavBar from './components/TopNavBar/TopNavBar';
import AnalysisRoute from './routes/AnalysisRoute/AnalysisRoute';
import TransactionsRoute from './routes/TransactionsRoute/TransactionsRoute';
import DividendsRoute from './routes/DividendsRoute/DividendsRoute';
import AssetsRoute from './routes/AssetsRoute/AssetsRoute';

export default function RootRoute() {

	console.log("dataPath: " + window.API.appState.dataPath)
	console.log("filePath: " + window.API.appState.filePath)

	const dispatch = useAppDispatch();

	const result = window.API.appState.load()
	console.log("appState loaded: ", result)

	if (result.theme) {
		console.log("theme: " + result.theme);
		dispatch(appStateReducer.setTheme(result.theme))
	}
	else {
		console.log("theme: not set");
	}

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
			console.log("Test")
			setupTransactions()
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
				sql += 'name VARCHAR NOT NULL, '
				sql += 'kgv)'
		console.log(sql)
		await window.API.send(sql)
		sql  = 'SELECT MAX(ID) as ID FROM assets'
		console.log(sql)
		var result = await window.API.send(sql)
		var newID = 0
		if(result[0]) {
			newID = result[0].ID + 1
		}
		console.log('New ID (assets): ' + newID)
		dispatch(assetCreationReducer.setNewID(newID))
		sql = 'SELECT * FROM assets'
		console.log(sql)
		result = await window.API.send(sql)
		console.log('result: ', result)
		dispatch(assetsReducer.setAssets(result))
	}

	function setupTransactions() {
		let sql  = 'CREATE TABLE IF NOT EXISTS transactions ('
				sql += 'ID INTEGER PRIMARY KEY, '
				sql += 'date DATE, '
				sql += 'type VARCHAR NOT NULL, '
				sql += 'asset VARCHAR NOT NULL, '
				sql += 'amount, '
				sql += 'price_per_share, '
				sql += 'fee, '
				sql += 'solidarity_surcharge)'
		console.log(sql)
		window.API.send(sql).then((result:any) => {
			let sql  = 'SELECT MAX(ID) as ID FROM transactions'
			console.log(sql)
			window.API.send(sql).then((result:any) => {
				console.log(result)
				var newID = 0
				if(result[0]) {
					newID = result[0].ID + 1
				}
				console.log('New ID (transactions): ' + newID)
				dispatch(transactionCreationReducer.setNewID(newID + 1))
				sql = 'SELECT * FROM transactions'
				console.log(sql)
				window.API.send(sql).then((result:Transaction[]) => {
					console.log('result: ', result)
					dispatch(transactionsReducer.setTransactions(result))
				});
			});
		});
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
	else return (<AnalysisRoute/>)
}