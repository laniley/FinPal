import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../../../../testing/test-utils'
import TopNavBar from './TopNavBar';
import RootRoute from '../../RootRoute';
import { setupStore } from './../../../store';
import * as appStateAPI from '../../../../api/appStateAPI'
import { Provider } from 'react-redux';

const path_to_test_configs = process.cwd() + '\\src\\testing\\test_configs\\'

var API = {
  appState:{
    dataPath: path_to_test_configs,
    filePath: '',
    load: () => appStateAPI.load(''),
    saveTheme: jest.fn(),
    saveSelectedTab: jest.fn(),
    saveDatabase: jest.fn()
  }
}

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

    beforeEach(() => {
      const filePath = path_to_test_configs + 'config_assetsTab.json'
      window.API = Object.assign({}, API, {
        appState:{
          dataPath: path_to_test_configs,
          filePath: filePath,
          load: () => appStateAPI.load(filePath),
        },
        dbFileExists: jest.fn(() => { return true }),
        sendToDB: jest.fn((param) => { if(param == 'SELECT MAX(ID) as ID FROM assets') return [{ID: 1}] }),
      })
    });

    it('changes the current root route to "transactionsTab" if the tab got clicked and if appState.route != "transactionsTab" ', async() => {

      const user = userEvent.setup()
      const store = setupStore();

      render(
        <Provider store={store}>
          <RootRoute />
        </Provider>
      )

      expect(store.getState().appState.selectedTab).toEqual("assetsTab");
      expect(screen.getByTestId('AssetsRoute')).toBeDefined();

      act(() => {
        const tab = screen.getByTestId('transactionsTab')
        user.click(tab)
      });

      await waitFor(() => {
        expect(store.getState().appState.selectedTab).toEqual('transactionsTab')
        expect(screen.getByTestId('TransactionsRoute')).toBeDefined();
      })
      
    });

    it('does not change the current root route if a tab got clicked and if appState.route is already the route that got clicked ', async() => {
      
      const store = setupStore();
      const user = userEvent.setup()
      const spy = jest.spyOn(console, 'log')

      render(
        <Provider store={store}>
          <RootRoute />
        </Provider>
      )

      expect(store.getState().appState.selectedTab).toEqual("assetsTab");
      expect(screen.getByTestId('AssetsRoute')).toBeDefined();
      
      act(() => {
        const tab = screen.getByTestId('assetsTab')
        user.click(tab)
      });
      
      await waitFor(() => {
        expect(screen.getByTestId('AssetsRoute')).toBeDefined();
        expect(spy).toHaveBeenCalledWith("Tab 'assetsTab' got clicked.");
        expect(spy).toHaveBeenCalledWith("Current route is already \\assetsTab");
      })
      
    });

  })
  
})
