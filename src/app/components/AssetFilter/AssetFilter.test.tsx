import { act, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../../testing/test-utils'
import { setupStore } from './../../store';
import AssetFilter from './AssetFilter';
import * as assetsReducer from '../../store/assets/assets.reducer';
import { Provider } from 'react-redux';

describe('AssetFilter component', () => {

  const onChange = jest.fn()

	it('renders', async() => {
    const filerForAssets: number[] = []
    render(<AssetFilter filter={filerForAssets} onChange={onChange} />) 
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

    render(<AssetFilter filter={filerForAssets} onChange={onChange} />, { preloadedState: { assets: assets } })
    
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

  it('renders sorted assets in ascending order', async () => {
    const filerForAssets: number[] = [];
    const assets = [
      { ID: 2, name: 'B Asset', symbol: 'symbol_b', isin: 'isin_b' },
      { ID: 1, name: 'A Asset', symbol: 'symbol_a', isin: 'isin_a' },
    ];

    render(<AssetFilter filter={filerForAssets} onChange={onChange} />, { preloadedState: { assets } });

    fireEvent.click(screen.getByTestId('AssetFilterButton'));

    await waitFor(() => {
      const labels = screen.getAllByRole('checkbox').map((checkbox) => checkbox.nextSibling?.textContent);
      expect(labels).toEqual(['A Asset', 'B Asset']);
    });
  });

})
