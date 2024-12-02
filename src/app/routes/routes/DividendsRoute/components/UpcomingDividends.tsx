import Table from '../../../../components/Table/Table';
import TableCell from '../../../../components/Table/TableCell/TableCell';
import TableHeaderCell from '../../../../components/Table/TableHeaderCell/TableHeaderCell';
import TableHeaderRow from '../../../../components/Table/TableHeaderRow/TableHeaderRow';
import { selectAssetsSortedByDividendPayDate } from '../../../../store/assets/assets.selectors';
import { useAppSelector } from './../../../../hooks'

export default function UpcomingDividends() {

	const assets = useAppSelector(state => state.assets)
  const assets_with_current_shares_before_ex_date = assets.filter((asset) => asset.current_shares_before_ex_date > 0)
  const assets_with_upcoming_dividends = assets_with_current_shares_before_ex_date.filter((asset) => asset.next_estimated_dividend_per_share > 0 && new Date(asset.payDividendDate) >= new Date())
  const filtered_assets = assets_with_upcoming_dividends.filter((asset) => asset.next_estimated_dividend_per_share > 0 && new Date(asset.payDividendDate) >= new Date())
  const sorted_assets = selectAssetsSortedByDividendPayDate(filtered_assets, 'asc')

  const options = { day: '2-digit', month: '2-digit', year: 'numeric' } as Intl.DateTimeFormatOptions;

  const columns = [
		{
			header: {
				content: '#'
			}
		},
    {
			header: {
				content: 'Pay Date'
			}
		},
    {
			header: {
				content: 'Ex Date'
			}
		},
    {
			header: {
				content: 'Asset'
			}
		},
    {
			header: {
				content: 'Dividend'
			}
		},
  ]

	return (
		<div id="UpcomingDividends">
      <h1>Upcoming</h1>
      <Table>
        <TableHeaderRow columns={columns}/>
        <tbody>
          {sorted_assets.map((asset, i) => {
            const next_estimated_dividend_per_share = asset.next_estimated_dividend_per_share ? asset.next_estimated_dividend_per_share * asset.current_shares : 0
            return(
              <tr key={i}>
                <TableCell>{i+1}</TableCell>
                <TableCell>{new Date(asset.payDividendDate).toLocaleDateString("de-DE", options)}</TableCell>
                <TableCell>{new Date(asset.exDividendDate).toLocaleDateString("de-DE", options)}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{(Math.round((next_estimated_dividend_per_share) * 1000) / 1000).toFixed(3)} €</TableCell>
              </tr>
            )
          })} 
        </tbody>
      </Table>
    </div>
	);
}
