import TableCell from '../../../../components/TableCell/TableCell';
import TableHeaderCell from '../../../../components/TableHeaderCell/TableHeaderCell';
import { selectAssetsSortedByDividendPayDate } from '../../../../store/assets/assets.selectors';
import { useAppSelector, useAppDispatch } from './../../../../hooks'

export default function DividendList() {

	const assets = useAppSelector(state => state.assets.assets)
  const filtered_assets = assets.filter((asset) => asset.current_shares > 0 && asset.next_estimated_dividend_per_share > 0 && new Date(asset.payDividendDate) >= new Date())
  const sorted_assets = selectAssetsSortedByDividendPayDate(filtered_assets, 'asc')

	return (
		<div id="DividendCalendar">
      <table>
        <thead>
          <tr>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>Pay Date</TableHeaderCell>
            <TableHeaderCell>Ex Date</TableHeaderCell>
            <TableHeaderCell>Asset</TableHeaderCell>
            <TableHeaderCell>Dividend</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {sorted_assets.map((asset, i) => {
            return(
              <tr key={i}>
                <TableCell>{i+1}</TableCell>
                <TableCell>{new Date(asset.payDividendDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(asset.exDividendDate).toLocaleDateString()}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.next_estimated_dividend_per_share ? asset.next_estimated_dividend_per_share * asset.current_shares : 0}</TableCell>
              </tr>
            )
          })} 
        </tbody>
      </table>
    </div>
	);
}