import { act, fireEvent, getByText, screen, waitFor, within } from '@testing-library/react'
import { render } from '../../../../../testing/test-utils'
import { getById } from '../../../../../testing/custom-queries';
import AssetListItem from './AssetListItem';
import { Provider } from 'react-redux';
import { setupStore } from '../../../../store';
import userEvent from '@testing-library/user-event';
import AssetsRoute from '../AssetsRoute';

describe('AssetsListItem component', () => {

	it('renders', async() => {
    
    const asset = {ID: 1, name: 'test1', symbol: 'test_symbol_1', isin: 'test_isin_1', current_shares: 1, price: 50, current_invest: -50} as Asset

    const {getAllById} = render(<AssetListItem key={"asset-" + 1} i={1} asset={asset} />) 
		
    await waitFor(() => {
			expect(getAllById('AssetListItem_1').length).toEqual(1);
		})
	});

  it('renders the overlay, after button click', async() => {

    const assets = [
      {ID: 1, name: 'test1', symbol: 'test_symbol_1', isin: 'test_isin_1', current_shares: 1, price: 50, current_invest: -50, avg_price_paid: 20},   // current_profit_loss = 0
      {ID: 2, name: 'test2', symbol: 'test_symbol_2', isin: 'test_isin_2', current_shares: 2, price: 100, current_invest: -50, avg_price_paid: 100}, // current_profit_loss = 150
      {ID: 3, name: 'test3', symbol: 'test_symbol_3', isin: 'test_isin_3', current_shares: 3, price: 100, current_invest: -50, avg_price_paid: 150}, // current_profit_loss = 250
      {ID: 4, name: 'test4', symbol: 'test_symbol_4', isin: 'test_isin_4', current_shares: 1, price: 50, current_invest: -150, avg_price_paid: 100}, // current_profit_loss = -100
    ]

    render(<AssetsRoute />, { preloadedState: { assets: {assets: assets }} } )
    
    fireEvent.click(screen.getByTestId('openOverlayButton_1'));

    await waitFor(() => {
      expect(screen.getAllByTestId('AssetOverlay').length).toEqual(1);
		})
	});

})