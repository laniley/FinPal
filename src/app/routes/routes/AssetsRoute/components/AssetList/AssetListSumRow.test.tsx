import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import { render } from '../../../../../../testing/test-utils'
import AssetListSumRow from './AssetListSumRow';
import AssetsRoute from './../../AssetsRoute';

describe('AssetListSumRow component', () => {

	it('renders', async() => {
    
    const {getAllById} = render(<AssetListSumRow sum_profit_loss="100.00 €" sum_dividends="15.00 €" sum_in_out="-200.00 €"/>) 
		
    await waitFor(() => {
			expect(getAllById('AssetListSumRow').length).toEqual(1);
		})
	});

  it('renders the overlay, after button click', async() => {

    const assets: Asset[] = []

    const {getAllById} = render(<AssetsRoute />, { preloadedState: { assets: {assets: assets }} } )
    
    fireEvent.click(getAllById('newAssetButton')[0]);

    await waitFor(() => {
      expect(screen.getAllByTestId('AssetOverlay').length).toEqual(1);
		})
	});

})