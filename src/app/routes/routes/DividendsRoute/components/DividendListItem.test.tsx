import { screen, waitFor, within } from '@testing-library/react'
import { render } from '../../../../../testing/test-utils'
import DividendListItem from './DividendListItem';

describe('DividendListItem component', () => {

	it('renders', async() => {
    const dividend = {ID: 1, date: "2024-11-01", asset_ID: 14, asset_name: "AssetName", income: 0.39}
    const {getAllById} = render(<DividendListItem i={1} dividend={dividend} />) 
		await waitFor(() => {
			expect(getAllById('DividendListItem_1').length).toEqual(1);
		})
	});

})