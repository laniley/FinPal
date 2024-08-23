import { Button, Intent } from '@blueprintjs/core';
import { useAppSelector, useAppDispatch } from './../../../hooks'

import AssetCreation from './components/AssetCreation';
import AssetListItem from './components/AssetListItem';
import * as assetsReducer from './../../..//store/assets/assets.reducer';

export default function AnalysisRoute() {

	const dispatch = useAppDispatch();
	const assets = useAppSelector(state => state.assets.assets)
	const theme = useAppSelector(state => state.appState.theme)

	var sum_profit_lost = 0
	var sum_dividends = 0
	var sum_in_out = 0

	assets.forEach(asset => {
		sum_profit_lost += asset.current_profit_loss
		sum_dividends += asset.dividends
		sum_in_out += asset.current_sum_in_out
	});
	
	var sum_profit_loss_formatted = (Math.round(sum_profit_lost * 100) / 100).toFixed(2)
	var sum_dividends_formatted = (Math.round(sum_dividends * 100) / 100).toFixed(2)
	var sum_in_out_formatted = (Math.round(sum_in_out * 100) / 100).toFixed(2)

	const active = assets.filter((asset:Asset) => asset.current_profit_loss_percentage != 0)
	const inactive = assets.filter((asset:Asset) => asset.current_profit_loss_percentage == 0)
	const sorted = active.slice().sort((a:Asset, b:Asset) => assetsReducer.sortBy(a, b, 'current_profit_loss_percentage', 'desc'))
	const all = sorted.concat(inactive)

	return (
		<div
			id="AssetsRoute"
			className={'absolute top-[0px] bottom-0 flex flex-col w-full ' + theme}>
			<div id="Main" className="flex justify-center p-3 overflow-auto">
				<table>
					<thead>
						<tr>
							<th><Button intent={Intent.PRIMARY} icon="refresh" onClick={(e) => dispatch(assetsReducer.loadAssets())} /></th>
							<th>Name</th>
							<th>Symbol</th>
							<th>ISIN</th>
							{/* <th>KGV</th> */}
							<th>Shares</th>
							<th className="px-2">Current Price per Share</th>
							<th className="px-2">Avg Price Paid</th>
							<th className="px-2">Current Invest</th>
							<th className="px-2">Current Value</th>
							<th className="px-2">Current Profit/Loss</th>
							<th className="px-2">Dividends</th>
							<th className="px-2">In-/Outcome</th>
						</tr>
					</thead>
					<tbody>
						<AssetCreation sum_profit_loss={sum_profit_loss_formatted} sum_dividends={sum_dividends_formatted} sum_in_out={sum_in_out_formatted} />
						<AssetList assets={all}/>
					</tbody>
				</table>
			</div>
		</div>
	);
}

function AssetList(props:{assets:Asset[]}):JSX.Element {
	return <>{
		props.assets.map((asset, i) => (<AssetListItem key={"asset-" + asset.ID} i={i+1} asset={asset} />))
	}</>
}