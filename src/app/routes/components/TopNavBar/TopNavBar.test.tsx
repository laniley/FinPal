import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../../../testing/test-utils'
import TopNavBar from './TopNavBar';
import * as appStateReducer from '../../../store/appState/appState.reducer';
import RootRoute from '../../RootRoute';

describe('TopNavBar component', () => {

	it('renders', async() => {
    const {getAllById} = render(<TopNavBar />) 
		await waitFor(() => {
			expect(getAllById('TopNavBar').length).toEqual(1);
		})
	});

  it('quits on button click', async() => {
    render(<TopNavBar />)
    const spy = jest.spyOn(window.API, 'quit')
    fireEvent.click(screen.getByTestId('quit-button'));
		expect(spy).toHaveBeenCalled();
	});

  describe('handleTabChange', () => {

    it('changes the current root route to "transactionsTab" if the tab got clicked and if appState.route != "transactionsTab" ', async() => {
      
      const user = userEvent.setup()
      const appState = Object.assign({}, appStateReducer.initialState)

      const {getAllById} = render(<RootRoute />, { preloadedState: { appState: appState } })
      
      act(() => {
        const tab = screen.getByTestId('transactionsTab')
        user.click(tab)
      });
      
      await waitFor(() => {
        expect(getAllById('TransactionsRoute').length).toEqual(1);
      })
      
    });

  })
  
})
