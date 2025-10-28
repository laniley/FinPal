import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { sortBy as sortTransactionsBy } from './../transactions/transactions.reducer'
import { Convert } from "easy-currencies";

export const initialState = [] as Asset[]

export const loadAssets = createAsyncThunk(
  'assets/loadAssets',
  async (props, thunkAPI) => {
		console.log('loading assets from DB...')
		let sql = 'SELECT * FROM assets_v'
		let assets = await window.API.sendToDB(sql)
		console.log('assets: ', assets)
		for(const asset of assets) {
			asset.currencySymbol = '€'
		}
		thunkAPI.dispatch(setAssets(assets))
		thunkAPI.dispatch(updateCurrentInvest())
		thunkAPI.dispatch(loadPricesAndDividends())
  }
)

export const loadAsset = createAsyncThunk(
  'assets/loadAsset',
  async (props: {assetID:number}, thunkAPI) => {
		console.log('loading asset with ID ' + props.assetID + ' from DB...')
		let sql = 'SELECT * FROM assets_v WHERE ID = ' + props.assetID
		let assets = await window.API.sendToDB(sql)
		console.log('result: ', assets)
		for(const asset of assets) {
			asset.currencySymbol = '€'
			console.log('loaded asset: ', asset)
			thunkAPI.dispatch(setAsset(asset))
		}
		
		thunkAPI.dispatch(updateCurrentInvest())
		thunkAPI.dispatch(loadPricesAndDividends())
  }
)

export const updateCurrentInvest = createAsyncThunk(
  'assets/updateCurrentInvest',
  async (props, thunkAPI) => {
		let state = thunkAPI.getState() as State
		const assets = state.assets

		assets.forEach((asset:Asset) => {
			const filtered = state.transactions.filter((trans:Transaction) => trans.asset_ID == asset.ID)
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

		for(const asset of state.assets) {
			
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
					let sql  = `
						UPDATE assets SET exDividendDate = '${json.dividends[0].exDate}'
						WHERE ID = ${asset.ID}`

						window.API.sendToDB(sql)
							.then((result:any) => {
								console.log(result)
							});

					let next_estimated_dividend_per_share = new Date(json.dividends[0].payDate) >= new Date() ? json.dividends[0].amount : 0

					if(resultYahooFinance.price.currency == 'USD') {
						next_estimated_dividend_per_share *= USD_conversion_rate
					}
					else if(resultYahooFinance.price.currency == 'DKK') {
						next_estimated_dividend_per_share *= DKK_conversion_rate
					}

					thunkAPI.dispatch(setDividends({ asset, dividends: json.dividends }))
					thunkAPI.dispatch(setExDividendDate({ asset, exDividendDate: json.dividends[0].exDate }))
					thunkAPI.dispatch(setPayDividendDate({ asset, payDividendDate: json.dividends[0].payDate }))
					thunkAPI.dispatch(setDividendFrequency({ asset, dividendFrequency: json.dividendFrequency }))
					thunkAPI.dispatch(setNextEstimatedDividendPerShare({ asset, next_estimated_dividend_per_share}))
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
		setAsset(state, action) {
			let mapped = state.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, action.payload)
				}
				else {
					return item
				}
			})
			return mapped
		},
		setAssets(state, action:{payload:Asset[]}) {
			return action.payload
		},
		setCurrencySymbol(state, action) {
			let mapped = state.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { currencySymbol: action.payload.currencySymbol })
				}
				else {
					return item
				}
			})
			return mapped
		},
		setCurrentInvest(state, action) {
			let mapped = state.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { current_invest: action.payload.current_invest })
				}
				else {
					return item
				}
			})
			return mapped
		},
		setDividends(state, action) {
			let mapped = state.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { dividends: action.payload.dividends })
				}
				else {
					return item
				}
			})
			return mapped
		},
		setDividendFrequency(state, action) {
			let mapped = state.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { dividendFrequency: action.payload.dividendFrequency })
				}
				else {
					return item
				}
			})
			return mapped
		},
		setDividendYield(state, action) {
			let mapped = state.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { dividendYield: action.payload.dividendYield })
				}
				else {
					return item
				}
			})
			return mapped
		},
		setExDividendDate(state, action) {
			let mapped = state.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { exDividendDate: action.payload.exDividendDate })
				}
				else {
					return item
				}
			})
			return mapped
		},
		setNextEstimatedDividendPerShare(state, action) {
			let mapped = state.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { next_estimated_dividend_per_share: action.payload.next_estimated_dividend_per_share })
				}
				else {
					return item
				}
			})
			return mapped
		},
		setPayDividendDate(state, action) {
			let mapped = state.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { payDividendDate: action.payload.payDividendDate })
				}
				else {
					return item
				}
			})
			return mapped
		},
		setPrice(state, action) {
			let mapped = state.map((item:Asset, index:number) => { 
				if(item.ID === action.payload.asset.ID) {
					return Object.assign({}, item, { price: action.payload.price })
				}
				else {
					return item
				}
			})
			return mapped
		}
	}
})

// Extract the action creators object and the reducer
const { actions, reducer } = assetsSlice
// Extract and export each action creator by name
export const {
	setAsset,
	setAssets,
	setCurrencySymbol,
	setCurrentInvest,
	setDividends,
	setDividendFrequency,
	setDividendYield,
	setExDividendDate,
	setNextEstimatedDividendPerShare,
	setPayDividendDate,
	setPrice
} = actions

export default reducer