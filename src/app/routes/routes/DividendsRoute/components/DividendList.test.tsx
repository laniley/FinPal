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

  it('renders filtered dividends', async() => {

    const assets = [14]

    const dividends = [
      {ID: 1, date: "2024-01-01", asset_ID: 14, income: 0.39},
      {ID: 2, date: "2024-02-01", asset_ID: 15, income: 0.79}
    ] as Dividend[]

    const {getAllById} = render(<DividendList />, { preloadedState: { dividends: dividends, dividendsFilter: { assets: assets } } })

    await waitFor(() => {
      expect(getAllById('dateInput_1')[0].getAttribute("value")).toEqual('2024-01-01')
      expect(getAllById).not.toContain("2024-02-01")
    })
  });

})