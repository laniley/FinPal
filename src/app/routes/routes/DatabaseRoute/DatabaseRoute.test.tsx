import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import { render } from '../../../../testing/test-utils'
import DatabaseRoute from './DatabaseRoute';
import * as appStateAPI from '../../../../api/appStateAPI'

const path_to_test_configs = process.cwd() + '\\src\\testing\\test_configs\\'

describe('AssetListSumRow component', () => {

	it('renders', async() => {
    const {getAllById} = render(<DatabaseRoute />) 
		await waitFor(() => {
			expect(getAllById('DatabaseRoute').length).toEqual(1);
		})
	});

  it('fires selectDatabase(), after button click', async() => {

    const spyOn = jest.spyOn(console, 'log')

    const {getAllById} = render(<DatabaseRoute />)

    await waitFor(() => {
      expect(getAllById('selectDatabaseButton').length).toEqual(1)
		})
    
    fireEvent.click(getAllById('selectDatabaseButton')[0]);

    await waitFor(() => {
      expect(spyOn).toHaveBeenCalledTimes(1)
		})
	});

  it('fires createNewDatabase(), after button click', async() => {

    const spyOn = jest.spyOn(console, 'log')

    const {getAllById} = render(<DatabaseRoute />)

    await waitFor(() => {
      expect(getAllById('createNewDatabaseButton').length).toEqual(1)
		})
    
    fireEvent.click(getAllById('createNewDatabaseButton')[0]);

    await waitFor(() => {
      expect(spyOn).toHaveBeenCalledWith('createNewDatabaseButton clicked')
		})
	});

})