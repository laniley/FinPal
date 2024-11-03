import { act, waitFor } from '@testing-library/react'
import { render } from '../../utils/test-utils'
import RootRoute, {setTheme} from './RootRoute';
import { setupStore } from '../store';
import { Provider } from 'react-redux';
import * as appStateAPI from './../../../src/api/appStateAPI'

describe('RootRoute component', () => {

	it('renders', async() => {
    const {getAllById} = render(<RootRoute />) 
		await waitFor(() => {
			expect(getAllById('RootRoute').length).toEqual(1);
		})
	});

	describe('setTheme(theme:string)', () => {

		beforeEach(() => {
			const filePath = 'C:\\Users\\melan\\AppData\\Roaming\\FinPal_Test\\config_no_theme.json'
			window.API = {
				appState:{
					dataPath: 'C:\\Users\\melan\\AppData\\Roaming\\FinPal_Test',
					filePath: filePath,
					load: () => appStateAPI.load(filePath),
					saveTheme: jest.fn(),
					saveSelectedTab: jest.fn()
				},
				sendToDB: jest.fn((param) => { if(param == 'SELECT MAX(ID) as ID FROM assets') return [{ID: 1}] }),
				sendToFinanceAPI: jest.fn(),
				quit: jest.fn()
			}
		});

		it('sets theme to default "bp5-dark" if it is not set in the config file', async() => {
			const store = setupStore();
			await act(async() => {
				render(
					<Provider store={store}>
						<RootRoute />
					</Provider>
				)
			})
			await waitFor(() => {
        expect(store.getState().appState.theme).toEqual('bp5-dark');
      })
		});
	
	})

	describe('setSelectedTab(selectedTab:string)', () => {

		beforeEach(() => {
			const filePath = 'C:\\Users\\melan\\AppData\\Roaming\\FinPal_Test\\config_no_selectedTab.json'
			window.API = {
				appState:{
					dataPath: 'C:\\Users\\melan\\AppData\\Roaming\\FinPal_Test',
					filePath: filePath,
					load: () => appStateAPI.load(filePath),
					saveTheme: jest.fn(),
					saveSelectedTab: jest.fn()
				},
				sendToDB: jest.fn((param) => { if(param == 'SELECT MAX(ID) as ID FROM assets') return [{ID: 1}] }),
				sendToFinanceAPI: jest.fn(),
				quit: jest.fn()
			}
		});

		it('sets selectedTab to default "transactionsTab" if it is not set in the config file', async() => {
			const store = setupStore();
			await act(async() => {
				render(
					<Provider store={store}>
						<RootRoute />
					</Provider>
				)
			})
			await waitFor(() => {
        expect(store.getState().appState.selectedTab).toEqual('transactionsTab');
      })
		});
	
	})

})
