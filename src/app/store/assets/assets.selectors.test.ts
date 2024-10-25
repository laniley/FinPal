import * as assetsSelector from './assets.selectors'

describe('Assets selectors', () => {

	describe('selectAssetsSortedByProfitLoss(state: Assets[])', () => {

		it('should return active assets sorted by profit_loss_percentage and then inactive assets', () => {

			const assets = [
				{
					ID: 2,
					current_shares: 0,
					price: 100,
					current_invest: 0
				},
				{
					ID: 1,
					current_shares: 0.5,
					price: 100,
					current_invest: -50
				}
			] as Asset[]
			expect(assetsSelector.selectAssetsSortedByProfitLoss(assets)).toEqual(
				[
					{"ID": 1, "current_invest": -50, "current_shares": 0.5, "price": 100}, 
					{"ID": 2, "current_invest": 0, "current_shares": 0, "price": 100}
				]
			)
		})

	})

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

})
