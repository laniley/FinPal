import { act, waitFor } from '@testing-library/react'
import { render } from '../../testing/test-utils'
import RootRoute from './RootRoute';
import { setupStore } from '../store';
import { Provider } from 'react-redux';
import * as appStateAPI from '../../api/appStateAPI'

const path_to_test_configs = process.cwd() + '\\src\\testing\\test_configs\\'

describe('RootRoute component', () => {

	it('renders', async() => {
    const {getAllById} = render(<RootRoute />) 
		await waitFor(() => {
			expect(getAllById('RootRoute').length).toEqual(1);
		})
	});

	describe('Content()', () => {

		describe('assetsTab', () => {

			beforeEach(() => {
				const filePath = path_to_test_configs + 'config_assetsTab.json'
				window.API = {
					appState:{
						dataPath: path_to_test_configs,
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

			it('sets selectedTab to "assetsTab" if "selectedTab":"assetsTab" and a database is set in the config file', async() => {
				const store = setupStore();
				await act(async() => {
					render(
						<Provider store={store}>
							<RootRoute />
						</Provider>
					)
				})
				await waitFor(() => {
					expect(store.getState().appState.selectedTab).toEqual('assetsTab');
				})
			});

		})

		describe('dividendsTab', () => {

			beforeEach(() => {
				const filePath = path_to_test_configs + 'config_dividendsTab.json'
				window.API = {
					appState:{
						dataPath: path_to_test_configs,
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

			it('sets selectedTab to "dividendsTab" if "selectedTab":"dividendsTab" and a database is set in the config file', async() => {
				const store = setupStore();
				await act(async() => {
					render(
						<Provider store={store}>
							<RootRoute />
						</Provider>
					)
				})
				await waitFor(() => {
					expect(store.getState().appState.selectedTab).toEqual('dividendsTab');
				})
			});

		})

		describe('databaseTab', () => {

			describe('databaseTab - no database is set in the config file', () => {
			
				beforeEach(() => {
					const filePath = path_to_test_configs + 'config_no_database.json'
					window.API = {
						appState:{
							dataPath: path_to_test_configs,
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

				it('sets selectedTab to "databaseTab" if no database is set in the config file', async() => {
					const store = setupStore();
					await act(async() => {
						render(
							<Provider store={store}>
								<RootRoute />
							</Provider>
						)
					})
					await waitFor(() => {
						expect(store.getState().appState.selectedTab).toEqual('databaseTab');
					})
				});

			})

			describe('databaseTab - "selectedTab":"databaseTab" and database is set in the config file', () => {
			
				beforeEach(() => {
					const filePath = path_to_test_configs + 'config_no_database.json'
					window.API = {
						appState:{
							dataPath: path_to_test_configs,
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

				it('sets selectedTab to "databaseTab" if "selectedTab":"databaseTab" and database is set in the config file', async() => {
					const store = setupStore();
					await act(async() => {
						render(
							<Provider store={store}>
								<RootRoute />
							</Provider>
						)
					})
					await waitFor(() => {
						expect(store.getState().appState.selectedTab).toEqual('databaseTab');
					})
				});
				
			})

		})
	
	})

	describe('setTheme(theme:string)', () => {

		beforeEach(() => {
			const filePath = path_to_test_configs + 'config_no_theme.json'
			window.API = {
				appState:{
					dataPath: path_to_test_configs,
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

	describe('setupTransactions()', () => {

		beforeEach(() => {
			const filePath = path_to_test_configs + 'config.json'
			window.API = {
				appState:{
					dataPath: path_to_test_configs,
					filePath: filePath,
					load: () => appStateAPI.load(filePath),
					saveTheme: jest.fn(),
					saveSelectedTab: jest.fn()
				},
				sendToDB: jest.fn((param) => { 
					if(param == 'SELECT MAX(ID) as ID FROM assets') return [{ID: 1}]
					else if(param == 'SELECT MAX(ID) as ID FROM transactions') return [{ID: 1}] 
				}),
				sendToFinanceAPI: jest.fn(),
				quit: jest.fn()
			}
		});

		it('sets newID = result[0].ID + 1', async() => {
			const store = setupStore();
			await act(async() => {
				render(
					<Provider store={store}>
						<RootRoute />
					</Provider>
				)
			})
			await waitFor(() => {
        expect(store.getState().transactionCreation.newID).toEqual(2);
      })
		});
	
	})

	describe('setupDividends()', () => {

		beforeEach(() => {
			const filePath = path_to_test_configs + 'config.json'
			window.API = {
				appState:{
					dataPath: path_to_test_configs,
					filePath: filePath,
					load: () => appStateAPI.load(filePath),
					saveTheme: jest.fn(),
					saveSelectedTab: jest.fn()
				},
				sendToDB: jest.fn((param) => { 
					if(param == 'SELECT MAX(ID) as ID FROM assets') return [{ID: 1}]
					else if(param == 'SELECT MAX(ID) as ID FROM transactions') return [{ID: 1}]
					else if(param == 'SELECT MAX(ID) as ID FROM dividends') return [{ID: 1}] 
				}),
				sendToFinanceAPI: jest.fn(),
				quit: jest.fn()
			}
		});

		it('sets newID = result[0].ID + 1', async() => {
			const store = setupStore();
			await act(async() => {
				render(
					<Provider store={store}>
						<RootRoute />
					</Provider>
				)
			})
			await waitFor(() => {
        expect(store.getState().dividendCreation.newID).toEqual(2);
      })
		});
	
	})

})
