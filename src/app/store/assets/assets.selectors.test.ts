import * as assetsSelector from './assets.selectors'

describe('Assets selectors', () => {

	describe('get_current_profit_loss(asset:Asset)', () => {

		it('should return (asset.current_shares * asset.price) + asset.current_invest', () => {
			const asset = {
        current_shares: 0.5,
        price: 100,
        current_invest: -50
      } as Asset
			expect(assetsSelector.get_current_profit_loss(asset)).toEqual(0)
		})

	})

	describe('get_current_profit_loss_percentage(asset:Asset)', () => {

		it('should return 0 if asset.current_invest == 0', () => {
			const asset = {
        current_shares: 0.5,
        price: 100,
        current_invest: 0
      } as Asset
			expect(assetsSelector.get_current_profit_loss_percentage(asset)).toEqual(0)
		})

		it('should return (-1 * get_current_profit_loss(asset)/asset.current_invest * 100) if asset.current_invest != 0', () => {
			const asset = {
        current_shares: 0.5,
        price: 100,
        current_invest: -50
      } as Asset
			expect(assetsSelector.get_current_profit_loss_percentage(asset)).toEqual(0)
		})

	})

	describe('get_current_profit_loss_bgColor(asset:Asset)', () => {

		it('should return "bg-teal-600" if asset.current_profit_loss > 0', () => {
			const asset = {
        current_shares: 1,
        price: 100,
        current_invest: -50
      } as Asset
			expect(assetsSelector.get_current_profit_loss_bgColor(asset)).toEqual("bg-teal-600")
		})

		it('should return "bg-slate-500" if asset.current_profit_loss == 0', () => {
			const asset = {
        current_shares: 1,
        price: 50,
        current_invest: -50
      } as Asset
			expect(assetsSelector.get_current_profit_loss_bgColor(asset)).toEqual("bg-slate-500")
		})

		it('should return "bg-custom-red" if asset.current_profit_loss < 0', () => {
			const asset = {
        current_shares: 1,
        price: 50,
        current_invest: -100
      } as Asset
			expect(assetsSelector.get_current_profit_loss_bgColor(asset)).toEqual("bg-custom-red")
		})

	})

	describe('get_current_sum_in_out_bgColor(asset:Asset)', () => {

		it('should return "bg-teal-600" if asset.current_sum_in_out > 0', () => {
			const asset = {
        current_sum_in_out: 100
      } as Asset
			expect(assetsSelector.get_current_sum_in_out_bgColor(asset)).toEqual("bg-teal-600")
		})

		it('should return "bg-custom-red" if asset.current_profit_loss < 0', () => {
			const asset = {
        current_sum_in_out: -100
      } as Asset
			expect(assetsSelector.get_current_sum_in_out_bgColor(asset)).toEqual("bg-custom-red")
		})

	})

	describe('selectAssetsSortedByName(state: Assets[], direction:\'asc\'|\'desc\')', () => {

		it('should return [] if state is undefined', () => {
		
			expect(assetsSelector.selectAssetsSortedByName(undefined, 'asc')).toEqual([])
			expect(assetsSelector.selectAssetsSortedByName(undefined, 'desc')).toEqual([])
		
		})

		it('should return assets sorted by name', () => {

			const assets = [
				{
					ID: 1,
					name: 'Coca-Cola'
				},
				{
					ID: 2,
					name: '3M'
				},
				,
				{
					ID: 3,
					name: 'Amazon'
				}
			] as Asset[]
			expect(assetsSelector.selectAssetsSortedByName(assets, 'asc')).toEqual(
				[
					{"ID": 2, "name": '3M'}, 
					{"ID": 3, "name":'Amazon'},
					{"ID": 1, "name":'Coca-Cola'}
				]
			)
			expect(assetsSelector.selectAssetsSortedByName(assets, 'desc')).toEqual(
				[
					{"ID": 1, "name":'Coca-Cola'},
					{"ID": 3, "name":'Amazon'},
					{"ID": 2, "name": '3M'}
				]
			)
		})

	})

	describe('selectAssetsSortedByDividendPayDate(state: Assets[], direction:\'asc\'|\'desc\')', () => {

		it('should return [] if state is undefined', () => {
		
			expect(assetsSelector.selectAssetsSortedByDividendPayDate(undefined, 'asc')).toEqual([])
			expect(assetsSelector.selectAssetsSortedByDividendPayDate(undefined, 'desc')).toEqual([])
		
		})

		it('should return assets sorted by dividendPayDate', () => {

			const assets = [
				{
					ID: 1,
					payDividendDate: '2024-10-01'
				},
				{
					ID: 2,
					payDividendDate: '2024-11-01'
				},
				,
				{
					ID: 3,
					payDividendDate: '2024-12-01'
				}
			] as Asset[]
			expect(assetsSelector.selectAssetsSortedByDividendPayDate(assets, 'asc')).toEqual(
				[
					{"ID": 1, "payDividendDate":'2024-10-01'}, 
					{"ID": 2, "payDividendDate":'2024-11-01'},
					{"ID": 3, "payDividendDate":'2024-12-01'}
				]
			)
			expect(assetsSelector.selectAssetsSortedByDividendPayDate(assets, 'desc')).toEqual(
				[
					{"ID": 3, "payDividendDate":'2024-12-01'},
					{"ID": 2, "payDividendDate":'2024-11-01'},
					{"ID": 1, "payDividendDate":'2024-10-01'}
				]
			)
		})

	})

	describe('selectAssetsSortedByProfitLoss(state: Assets[], direction:\'asc\'|\'desc\')', () => {

		describe('selectAssetsSortedByProfitLoss - asc', () => {

			it('should return active assets, sorted ascending by profit_loss_percentage, and then inactive assets', () => {

				const assets = [
					{
						ID: 1,
						current_shares: 0,
						price: 100,
						current_invest: 0
					},
					{
						ID: 2,
						current_shares: 3,
						price: 100,
						current_invest: -50
					},
					{
						ID: 3,
						current_shares: 1,
						price: 100,
						current_invest: -50
					},
					{
						ID: 4,
						current_shares: 2,
						price: 100,
						current_invest: -50
					},
				] as Asset[]
				expect(assetsSelector.selectAssetsSortedByProfitLoss(assets, 'asc')).toEqual(
					[
						{"ID": 3, "current_invest": -50, "current_shares": 1, "price": 100},
						{"ID": 4, "current_invest": -50, "current_shares": 2, "price": 100},
						{"ID": 2, "current_invest": -50, "current_shares": 3, "price": 100},
						{"ID": 1, "current_invest": 0, "current_shares": 0, "price": 100}
					]
				)
			})

		})

		describe('selectAssetsSortedByProfitLoss - desc', () => {

			it('should return active assets, sorted descending by profit_loss_percentage, and then inactive assets', () => {

				const assets = [
					{
						ID: 1,
						current_shares: 0,
						price: 100,
						current_invest: 0
					},
					{
						ID: 2,
						current_shares: 3,
						price: 100,
						current_invest: -50
					},
					{
						ID: 3,
						current_shares: 1,
						price: 100,
						current_invest: -50
					},
					{
						ID: 4,
						current_shares: 2,
						price: 100,
						current_invest: -50
					}
				] as Asset[]
				expect(assetsSelector.selectAssetsSortedByProfitLoss(assets, 'desc')).toEqual(
					[
						{"ID": 2, "current_invest": -50, "current_shares": 3, "price": 100}, 
						{"ID": 4, "current_invest": -50, "current_shares": 2, "price": 100},
						{"ID": 3, "current_invest": -50, "current_shares": 1, "price": 100},
						{"ID": 1, "current_invest": 0, "current_shares": 0, "price": 100}
					]
				)
			})

		})
	})

})
