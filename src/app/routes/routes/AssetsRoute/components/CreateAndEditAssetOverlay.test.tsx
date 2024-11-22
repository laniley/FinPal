import { act, fireEvent, waitFor } from '@testing-library/react'
import { render } from '../../../../../testing/test-utils'
import CreateAndEditAssetOverlay from './CreateAndEditAssetOverlay';
import { Provider } from 'react-redux';
import { setupStore } from '../../../../store';
import AppState from '../../../../store/appState/appState';

describe('CreateAndEditAssetOverlay component', () => {

  const preloadedState = { 
    appState: { 
      showAssetOverlay: true 
    } as AppState
  }

	it('renders', async() => {
    const {getAllById} = render(<CreateAndEditAssetOverlay />, { preloadedState: preloadedState }) 
		await waitFor(() => {
			expect(getAllById('AssetOverlay').length).toEqual(1);
		})
	});

  it('dispatches appStateReducer.setShowAssetOverlay(false) on button click', async() => {
    
    const store = setupStore(preloadedState);
    const spy = jest.spyOn(store, 'dispatch')

    const {getAllById} = await act(async() => {
      return render(
        <Provider store={store}>
          <CreateAndEditAssetOverlay />
        </Provider>
      )
    })

    await waitFor(() => {
      expect(store.getState().appState.showAssetOverlay).toEqual(true)
		})
    
    fireEvent.click(getAllById('CloseButton')[0]);

    await waitFor(() => {
      expect(store.getState().appState.showAssetOverlay).toEqual(false)
		})
	});

})