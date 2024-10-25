import { act, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../../utils/test-utils'
import AssetFilter from './AssetFilter';
import * as transactionFilterReducer from './../../store/transactionFilter/transactionFilter.reducer';
import * as appStateReducer from '../../store/appState/appState.reducer';

describe('AssetFilter component', () => {

	it('renders', async() => {
    const filerForAssets: string[] = []
    render(<AssetFilter filter={filerForAssets} reducer={transactionFilterReducer} />) 
		await waitFor(() => {
			expect(screen.getAllByTestId('AssetFilterButton').length).toEqual(1);
		})
	});

  it('renders the popup content, after button click', async() => {

    const filerForAssets: string[] = ['test1', 'test2']

    const assets = [
      {ID: 1, name: 'test1', symbol: 'test_symbol_1', isin: 'test_isin_1'},
      {ID: 2, name: 'test2', symbol: 'test_symbol_2', isin: 'test_isin_2'},
      {ID: 3, name: 'test3', symbol: 'test_symbol_3', isin: 'test_isin_3'},
    ]

    render(<AssetFilter filter={filerForAssets} reducer={transactionFilterReducer} />, { preloadedState: { assets: {assets: assets }} } )
    
    fireEvent.click(screen.getByTestId('AssetFilterButton'));

    await waitFor(() => {
      const input1 = screen.getByTestId('assetsFilter_1') as HTMLInputElement
			expect(input1.checked).toEqual(true);
      const input2 = screen.getByTestId('assetsFilter_2') as HTMLInputElement
			expect(input2.checked).toEqual(true);
      const input3 = screen.getByTestId('assetsFilter_3') as HTMLInputElement
			expect(input3.checked).toEqual(false);
		})
	});

})
