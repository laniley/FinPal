import { act, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../../utils/test-utils'
import { setupStore } from './../../store';
import AssetFilter from './AssetFilter';
import * as transactionFilterReducer from './../../store/transactionFilter/transactionFilter.reducer';
import * as assetsReducer from '../../store/assets/assets.reducer';

describe('AssetFilter component', () => {

	it('renders', async() => {
    const filerForAssets: number[] = []
    render(<AssetFilter filter={filerForAssets} reducer={transactionFilterReducer} />) 
		await waitFor(() => {
			expect(screen.getAllByTestId('AssetFilterButton').length).toEqual(1);
		})
	});

  it('renders the popup content, after button click', async() => {

    const filerForAssets: number[] = [1, 2]

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
/*
  it('checks / unchecks on click', async() => {

    const store = setupStore();
    const filerForAssets: number[] = [1]

    const assets = [
      {ID: 1, name: 'test1', symbol: 'test_symbol_1', isin: 'test_isin_1'},
      {ID: 2, name: 'test2', symbol: 'test_symbol_2', isin: 'test_isin_2'},
    ]

    store.dispatch(assetsReducer.setAssets(assets))
    store.dispatch(transactionFilterReducer.setAssets(filerForAssets))

    render(<AssetFilter filter={filerForAssets} reducer={transactionFilterReducer} />, { preloadedState: { assets: {assets: assets }} } )
    
    fireEvent.click(screen.getByTestId('AssetFilterButton'));
    store.getState().

    await waitFor(() => {
      const input1 = screen.getByTestId('assetsFilter_1') as HTMLInputElement
			expect(input1.checked).toEqual(true);
      const input2 = screen.getByTestId('assetsFilter_2') as HTMLInputElement
			expect(input2.checked).toEqual(false);
		})

    fireEvent.click(screen.getByTestId('assetsFilter_1') as HTMLInputElement);
    
  
    await waitFor(() => {
      const input1 = screen.getByTestId('assetsFilter_1') as HTMLInputElement
			expect(input1.checked).toEqual(false);
		})

    fireEvent.click(screen.getByTestId('assetsFilter_2'));

    await waitFor(() => {
      const input2 = screen.getByTestId('assetsFilter_2') as HTMLInputElement
			expect(input2.checked).toEqual(true);
		})
  });
*/
})
