import { act, screen, waitFor, fireEvent } from '@testing-library/react'
import { render } from '../../../../../utils/test-utils'
import * as appStateReducer from '../../../../store/appState/appState.reducer';
import Settings from './Settings';
import { setupStore } from './../../../../store';
import TopNavBar from '../TopNavBar';

describe('TableCell component', () => {

	it('renders', async() => {
    render(<Settings />) 
		await waitFor(() => {
			expect(screen.getAllByTestId('Settings').length).toEqual(1);
		})
	});

  it('opens the menu Settings > Theme & switches the theme', async() => {
    const store = setupStore();
    const appState = Object.assign({}, appStateReducer.initialState, { theme: 'bp5-dark' })
    render(<TopNavBar />, { preloadedState: { appState: appState } })
    await waitFor(() => {
      expect(screen.getByTestId('TopNavBar').className.indexOf("bp5-dark") != -1).toBe(true);
		})
    fireEvent.click(screen.getByTestId('TopNavBarSettings'))
    await waitFor(() => {
			expect(screen.getAllByTestId('Settings').length).toEqual(1);
		})
    fireEvent.mouseOver(screen.getByText('Theme'))
    await waitFor(() => {
			expect(screen.getAllByTestId('menuItem-lightMode').length).toEqual(1);
		})
    fireEvent.click(screen.getByTestId('menuItem-lightMode'))
    await waitFor(() => {
      expect(screen.getByTestId('TopNavBar').className.indexOf("bp5-body") != -1).toBe(true);
		})
	});
  
})
