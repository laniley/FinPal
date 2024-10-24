import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { sortBy as sortTransactionsBy } from './../transactions/transactions.reducer'
import { Convert } from "easy-currencies";

export const initialState = { assets:[] as Asset[] }

export const setAssets = createAsyncThunk(
  'assets/setAssets',
  async (assets:Asset[], thunkAPI) => {
		const currently_invested = assets.filter(asset => { return asset.current_shares > 0})
		const currently_not_invested = assets.filter(asset => { return asset.current_shares <= 0})
		const currently_invested_sorted = currently_invested.slice().sort((a:Asset, b:Asset) => sortBy(a, b, 'name', 'asc'))
		const currently_not_invested_sorted = currently_not_invested.slice().sort((a:Asset, b:Asset) => sortBy(a, b, 'name', 'asc'))
		thunkAPI.dispatch(setAssetsInternal(currently_invested_sorted.concat(currently_not_invested_sorted)))
  }
)

export const loadAssets = createAsyncThunk(
  'assets/loadAssets',
  async (props, thunkAPI) => {
		let sql = 'SELECT * FROM assets_v'
		console.log(sql)
		let assets = await window.API.sendToDB(sql)
		console.log('assets: ', assets)
		for(const asset of assets) {
			asset.currencySymbol = '€'
		}
		await thunkAPI.dispatch(setAssets(assets))
		thunkAPI.dispatch(updateCurrentInvest())
		thunkAPI.dispatch(loadPricesAndDividends())
  }
)

export const updateCurrentInvest = createAsyncThunk(
  'assets/updateCurrentInvest',
  async (props, thunkAPI) => {
		let state = thunkAPI.getState() as State
		const assets = state.assets.assets

		assets.forEach((asset:Asset) => {
			const filtered = state.transactions.transactions.filter((trans:Transaction) => trans.asset == asset.name)
			const sorted = filtered.slice().sort((a:Transaction, b:Transaction) => sortTransactionsBy(a, b, 'date', 'desc'))

			let current_invest = 0
			
			if(sorted[0])
				current_invest = sorted[0].invest_cumulated
				
			thunkAPI.dispatch(setCurrentInvest({asset, current_invest}))
		})
  }
)

export const loadPricesAndDividends = createAsyncThunk(
  'assets/loadPrices',
  async (props, thunkAPI) => {

		let state = thunkAPI.getState() as State

		// conversion rates
		const USD = await Convert().from("USD").fetch();
		const DKK = await Convert().from("DKK").fetch();
		const USD_conversion_rate = USD.rates.EUR
		const DKK_conversion_rate = DKK.rates.EUR

		for(const asset of state.assets.assets) {
			
			console.log(asset.name, '-', asset.symbol)

			const resultYahooFinance:any = await callYahooFinanceAPI(asset.symbol)
			console.log(asset.name, '- YahooFinance:', resultYahooFinance)

			let price = resultYahooFinance.price.regularMarketPrice

			if(resultYahooFinance.price.currency == 'USD') {
				price *= USD_conversion_rate
			}
			else if(resultYahooFinance.price.currency == 'DKK') {
				price *= DKK_conversion_rate
			}
			
			thunkAPI.dispatch(setPrice({ asset, price }))
			thunkAPI.dispatch(setDividendYield({ asset, dividendYield: resultYahooFinance.summaryDetail.dividendYield })) // dividend per share

			try {
				const response = await fetch('https://api.divvydiary.com/symbols/' + asset.isin)
				
				if(!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}

				const json = await response.json();
				console.log(asset.name, '- divvydiary: ', json)

				if(json.dividends[0]) {
					thunkAPI.dispatch(setExDividendDate({ asset, exDividendDate: json.dividends[0].exDate }))
					thunkAPI.dispatch(setPayDividendDate({ asset, payDividendDate: json.dividends[0].payDate }))
					thunkAPI.dispatch(setNextEstimatedDividendPerShare({ asset, next_estimated_dividend_per_share: json.dividends[0].amount }))
				}
			} 
			catch (error) {
				console.error(error.message);
			}
		}
  }
)

async function callYahooFinanceAPI(symbol:string) {
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
		setCurrencySymbol(state, action) {
			let mapped = state.assets.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { currencySymbol: action.payload.currencySymbol })
				}
				else {
					return item
				}
			})
			state.assets = mapped
		},
		setCurrentInvest(state, action) {
			let mapped = state.assets.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { current_invest: action.payload.current_invest })
				}
				else {
					return item
				}
			})
			state.assets = mapped
		},
		setExDividendDate(state, action) {
			let mapped = state.assets.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { exDividendDate: action.payload.exDividendDate })
				}
				else {
					return item
				}
			})
			state.assets = mapped
		},
		setNextEstimatedDividendPerShare(state, action) {
			let mapped = state.assets.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { next_estimated_dividend_per_share: action.payload.next_estimated_dividend_per_share })
				}
				else {
					return item
				}
			})
			state.assets = mapped
		},
		setPayDividendDate(state, action) {
			let mapped = state.assets.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { payDividendDate: action.payload.payDividendDate })
				}
				else {
					return item
				}
			})
			state.assets = mapped
		},
		setPrice(state, action) {
			let mapped = state.assets.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { price: action.payload.price })
				}
				else {
					return item
				}
			})
			state.assets = mapped
		},
		setDividendYield(state, action) {
			let mapped = state.assets.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { dividendYield: action.payload.dividendYield })
				}
				else {
					return item
				}
			})
			state.assets = mapped
		}
	}
})

// Extract the action creators object and the reducer
const { actions, reducer } = assetsSlice
// Extract and export each action creator by name
export const {
	setAssetsInternal,
	setCurrencySymbol,
	setCurrentInvest,
	setDividendYield,
	setExDividendDate,
	setNextEstimatedDividendPerShare,
	setPayDividendDate,
	setPrice
} = actions

export default reducer