import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../../../utils/test-utils'
import TopNavBar from './TopNavBar';
import * as appStateReducer from 'src/app/store/appState/appState.reducer';
import RootRoute from '../../RootRoute';

describe('TopNavBar component', () => {

	it('renders', async() => {
    const {getAllById} = render(<TopNavBar />) 
		await waitFor(() => {
			expect(getAllById('TopNavBar').length).toEqual(1);
		})
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
