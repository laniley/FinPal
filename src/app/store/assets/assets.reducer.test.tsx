import { act, screen, waitFor } from '@testing-library/react'
import reducer, * as assetsReducer from './assets.reducer'
import { setupStore } from '..';

describe('AssetCreation reducer', () => {

  it('should return the initial state', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual(assetsReducer.initialState)
	})

  describe('Assets Thunks', () => {

    it('should handle updateCurrentInvest', async() => {
      const store = setupStore();
      var assets = [{
        ID: 1,
        name: '3M',
        symbol: 'MMM'
      }] as Asset[]
      var transactions = [] as Transaction[]
      store.dispatch(assetsReducer.setAssets(assets))
      store.dispatch(assetsReducer.updateCurrentInvest())
      expect(store.getState().assets).toEqual(
        {
          assets: [{
            ID: 1,
            name: '3M',
            symbol: 'MMM',
            current_invest: 0,
            current_profit_loss: NaN,
            current_profit_loss_percentage: 0,
            current_profit_loss_percentage_formatted: "0.00",
          }]
        }
      )
    })

  })

})