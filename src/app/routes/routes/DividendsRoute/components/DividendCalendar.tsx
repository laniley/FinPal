import { useAppSelector, useAppDispatch } from './../../../../hooks'

import {
	Colors,
} from '@blueprintjs/core';

export default function DividendList() {

	const assets = useAppSelector(state => state.assets.assets)
  const filtered_assets = assets.filter((asset) => asset.current_shares > 0 && asset.next_estimated_dividend_per_share > 0)
	const theme = useAppSelector(state => state.appState.theme)

	return (
		<div id="DividendCalendar">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Payday</th>
            <th>Asset</th>
            <th>Dividend</th>
          </tr>
        </thead>
        <tbody>
          {filtered_assets.map((asset, i) => {
            const dividendPayDay = asset.exDividendDate ? new Date(new Date(asset.exDividendDate).setDate(new Date(asset.exDividendDate).getDate() + 2)) : null;
            return(
              <tr key={i}>
                <th>{i}</th>
                <td className="border-2 border-slate-600">{new Date(asset.exDividendDate).toLocaleDateString()} - {dividendPayDay ? dividendPayDay.toLocaleDateString() : ""}</td>
                <td className="border-2 border-slate-600">{asset.name}</td>
                <td className="border-2 border-slate-600">{asset.next_estimated_dividend_per_share ? asset.next_estimated_dividend_per_share * asset.current_shares : 0}</td>
              </tr>
            )
          })} 
        </tbody>
      </table>
    </div>
	);
}