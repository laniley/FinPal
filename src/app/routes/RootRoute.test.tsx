import { waitFor } from '@testing-library/react'
import { render } from '../../utils/test-utils'
import RootRoute, { Content } from './RootRoute';
import * as appStateReducer from "./../store/appState/appState.reducer";

describe('RootRoute component', () => {

	it('renders', async() => {
    const {getAllById} = render(<RootRoute />) 
		await waitFor(() => {
			expect(getAllById('RootRoute').length).toEqual(1);
		})
	});

})
