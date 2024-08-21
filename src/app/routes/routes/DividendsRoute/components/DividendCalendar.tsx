import TableCell from '../../../../components/TableCell';
import { useAppSelector, useAppDispatch } from './../../../../hooks'

import {
	Colors,
} from '@blueprintjs/core';

export default function DividendList() {

	const assets = useAppSelector(state => state.assets.assets)
  const filtered_assets = assets.filter((asset) => asset.current_shares > 0 && asset.next_estimated_dividend_per_share > 0 && new Date(asset.exDividendDate) >= new Date())
  const sorted_assets = filtered_assets.slice().sort((a:Asset, b:Asset) => { return a.exDividendDate - b.exDividendDate })
	const theme = useAppSelector(state => state.appState.theme)

	return (
		<div id="DividendCalendar">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Ex Day</th>
            <th>Asset</th>
            <th>Dividend</th>
          </tr>
        </thead>
        <tbody>
          {sorted_assets.map((asset, i) => {
            return(
              <tr key={i}>
                <TableCell>{i}</TableCell>
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