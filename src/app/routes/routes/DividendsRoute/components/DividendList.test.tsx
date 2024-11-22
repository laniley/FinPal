import { screen, waitFor, within } from '@testing-library/react'
import { render } from '../../../../../testing/test-utils'
import DividendList from './DividendList';

describe('DividendList component', () => {

	it('renders', async() => {
    const {getAllById} = render(<DividendList />) 
		await waitFor(() => {
			expect(getAllById('DividendList').length).toEqual(1);
		})
	});

  it('renders dividends', async() => {

    const dividends = [
      {ID: 1, date: "2024-11-01", asset_ID: 14, income: 0.39}
    ] as Dividend[]

    const {getAllById} = render(<DividendList />, { preloadedState: { dividends: dividends } })

    await waitFor(() => {
      expect(getAllById('DividendListItem_1').length).toEqual(1)
    })
  });

})