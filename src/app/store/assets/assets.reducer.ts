import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { sortBy as sortTransactionsBy } from './../transactions/transactions.reducer'
import { Convert } from "easy-currencies";

export const initialState = { assets:[] as Asset[] }

export const setAssets = createAsyncThunk(
  'assets/setAssets',
  async (assets:Asset[], thunkAPI) => {
		assets.forEach(asset => {
			let current_profit_loss = (asset.current_shares * asset.price) + asset.current_invest
			asset.current_profit_loss = (asset.current_shares * asset.price) + asset.current_invest
			asset.current_profit_loss_percentage = (asset.current_invest != 0 ? -1 * current_profit_loss/asset.current_invest * 100 : 0)
			asset.current_profit_loss_percentage_formatted = (asset.current_invest != 0 ? -1 * current_profit_loss/asset.current_invest * 100 : 0).toFixed(2)
		})
		const sorted = assets.slice().sort((a:Asset, b:Asset) => sortBy(a, b, 'name', 'asc'))
		thunkAPI.dispatch(setAssetsInternal(sorted))
  }
)

export const loadAssets = createAsyncThunk(
  'assets/loadAssets',
  async (props, thunkAPI) => {
		let sql = 'SELECT * FROM assets_v'
		console.log(sql)
		await window.API.sendToDB(sql).then(async (assets:Asset[]) => {
			console.log('assets: ', assets)
			thunkAPI.dispatch(setAssets(assets))
			await thunkAPI.dispatch(updateCurrentInvest())
			await thunkAPI.dispatch(loadPricesAndDividends())
		})
  }
)

export const updateCurrentInvest = createAsyncThunk(
  'assets/updateCurrentInvest',
  async (props, thunkAPI) => {
		let state = thunkAPI.getState() as State
		const assets = state.assets.assets
		var assets_new = [] as Asset[]
		assets.forEach((asset:Asset) => {
			const filtered = state.transactions.transactions.filter((trans:Transaction) => trans.asset == asset.name)
			const sorted = filtered.slice().sort((a:Transaction, b:Transaction) => sortTransactionsBy(a, b, 'date', 'desc'))
			asset = Object.assign({}, asset, { current_invest: sorted[0].invest_cumulated })
			assets_new.push(asset)
		})
		thunkAPI.dispatch(setAssets(assets_new))
  }
)

export const loadPricesAndDividends = createAsyncThunk(
  'assets/loadPrices',
  async (props, thunkAPI) => {
		let state = thunkAPI.getState() as State
		let assets_with_prices:Asset[] = []
		const USD = await Convert().from("USD").fetch();
		const DKK = await Convert().from("DKK").fetch();
		const USD_conversion_rate = USD.rates.EUR
		const DKK_conversion_rate = DKK.rates.EUR
		for(const asset of state.assets.assets) {
			console.log(asset.symbol)
			const result:any = await callFinanceAPI(asset.symbol)
			console.log(result)
			let asset_params_from_finance_api = { 
				price: result.price.regularMarketPrice, 
				currencySymbol: result.price.currencySymbol,
				dividendYield: result.summaryDetail.dividendYield, // dividend per share
				exDividendDate: Date.parse(result.summaryDetail.exDividendDate)
			}
			let asset_with_price = Object.assign({}, asset, asset_params_from_finance_api)
			if(result.price.currency == 'USD') {
				asset_with_price.price *= USD_conversion_rate
				asset_with_price.currencySymbol = '€'
			}
			else if(result.price.currency == 'DKK') {
				asset_with_price.price *= DKK_conversion_rate
				asset_with_price.currencySymbol = '€'
			}
			asset_with_price = Object.assign({}, asset_with_price, { next_estimated_dividend_per_share: asset_with_price.price * result.summaryDetail.dividendYield})
			console.log(asset_with_price)
			assets_with_prices.push(asset_with_price)
		}
		console.log(assets_with_prices)
		thunkAPI.dispatch(setAssets(assets_with_prices))
  }
)

async function callFinanceAPI(symbol:string) {
	var result = await window.API.sendToFinanceAPI({symbol:symbol})
	return result
}

export function sortBy(a:Asset, b:Asset, property:string, direction:'asc'|'desc') {
	if(property == 'name') {
		if(direction == 'asc')
			return a.name.localeCompare(b.name)
		else
			return b.name.localeCompare(a.name)
	}
	else if(property == 'KGV') {
		if(direction == 'asc')
			return a.kgv.localeCompare(b.kgv)
		else
			return b.kgv.localeCompare(a.kgv)
	}
	else if(property == 'current_profit_loss_percentage') {
		if(direction == 'asc')
			if(a.current_profit_loss_percentage > b.current_profit_loss_percentage)
				return -1
			else return 1
		else
			if(b.current_profit_loss_percentage < a.current_profit_loss_percentage)
				return -1
			else return 1
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