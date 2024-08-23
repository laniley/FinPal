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

  it('Popup content renders after button click', async() => {
    const user = userEvent.setup()
    const appState = Object.assign({}, appStateReducer.initialState, { assets: { assets: [{id: 1, name: 'test1'}]}})
    const filerForAssets: string[] = ['test1', 'test2']

    render(<AssetFilter filter={filerForAssets} reducer={transactionFilterReducer} />, { preloadedState: { appState: appState } })
    fireEvent.click(screen.getByTestId('AssetFilterButton'));
    const filterPopup = await screen.getByTestId('AssetFilterPopupContent')
    expect(filterPopup.children.length).toEqual(2)

	});
})
