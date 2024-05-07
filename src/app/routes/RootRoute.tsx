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
			setupTransactions().then(() => {
				setupAssetsView().then(() => {
					let sql = 'SELECT * FROM assets_v'
					console.log(sql)
					window.API.sendToDB(sql).then((assets:Asset[]) => {
						console.log('assets: ', assets)
						dispatch(assetsReducer.setAssets(assets))
						loadPrices(assets)
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

	async function loadPrices(assets:Asset[]) {
		let assets_with_prices:Asset[] = []
		for(const asset of assets) {
			console.log(asset.symbol)
			const result:any = await loadPrice(asset.symbol)
			console.log(result)
			let asset_with_price = Object.assign({}, asset, { price: result.price.regularMarketPrice, currencySymbol: result.price.currencySymbol })
			console.log(asset_with_price)
			assets_with_prices.push(asset_with_price)
		}
		console.log(assets_with_prices)
		dispatch(assetsReducer.setAssets(assets_with_prices))
	}

	async function loadPrice(symbol:string) {
		var result = await window.API.sendToFinanceAPI({symbol:symbol})
		return result
	}

	async function setupAssets() {
		var sql  = 'CREATE TABLE IF NOT EXISTS assets ('
				sql += 'ID INTEGER PRIMARY KEY, '
				sql += 'name UNIQUE VARCHAR NOT NULL, '
				sql += 'symbol UNIQUE VARCHAR NOT NULL, '
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
		dispatch(assetCreationReducer.setNewID(newID))
	}

	async function setupTransactions() {
		let sql  = 'CREATE TABLE IF NOT EXISTS transactions ('
				sql += 'ID INTEGER PRIMARY KEY, '
				sql += 'date DATE, '
				sql += 'type VARCHAR NOT NULL, '
				sql += 'asset VARCHAR NOT NULL, '
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
		dispatch(transactionCreationReducer.setNewID(newID + 1))
				sql  = 'CREATE VIEW IF NOT EXISTS transactions_v AS '
				sql += 'SELECT *, ((CASE WHEN type = \'Sell\' THEN 1 ELSE -1 END) * (amount*price_per_share))-fee-IFNULL(solidarity_surcharge,0) as in_out FROM transactions'
		console.log(sql)
		result = await window.API.sendToDB(sql)
		console.log('result: ', result)
				sql = 'SELECT * FROM transactions_v'
		console.log(sql)
		result = await window.API.sendToDB(sql)
		console.log('result: ', result)
		dispatch(transactionsReducer.setTransactions(result))
	}

	async function setupAssetsView() {
		let sql  = 'CREATE VIEW IF NOT EXISTS assets_v AS '
				sql += 		'SELECT '
				sql += 			'assets.ID as ID, '
				sql += 			'assets.name as name, '
				sql += 			'assets.symbol as symbol, '
				sql += 			'kgv, '
				sql += 			'SUM(CASE WHEN type = \'Buy\' THEN amount * price_per_share ELSE 0 END) AS invested, '
				sql += 			'SUM(CASE WHEN type = \'Sell\' THEN amount * price_per_share ELSE 0 END) AS profit, '
				sql +=			'SUM(fee) AS fees, '
				sql +=			'SUM(CASE WHEN type = \'Buy\' THEN amount ELSE amount * -1 END) AS current_shares, '
				sql += 			'SUM(in_out) AS current_sum_in_out '
				sql +=		'FROM assets '
				sql +=		'LEFT JOIN transactions_v ON transactions_v.asset = assets.name '
				sql +=		'GROUP BY assets.ID, asset, kgv'
		console.log(sql)
		let result = await window.API.sendToDB(sql)
		console.log('result: ', result)
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