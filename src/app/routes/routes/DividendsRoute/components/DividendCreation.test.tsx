import { screen, waitFor, within } from '@testing-library/react'
import { render } from '../../../../../testing/test-utils'
import DividendCreation from './DividendCreation';

describe('DividendCreation component', () => {

	it('renders', async() => {
    const {getAllById} = render(<table><tbody><DividendCreation /></tbody></table>) 
		await waitFor(() => {
			expect(getAllById('DividendCreation').length).toEqual(1);
		})
	});

})