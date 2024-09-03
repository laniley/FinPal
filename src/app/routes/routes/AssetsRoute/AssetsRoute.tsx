import { Button, Intent } from '@blueprintjs/core';
import { useAppSelector, useAppDispatch } from './../../../hooks'

import AssetCreation from './components/AssetCreation';
import AssetListItem from './components/AssetListItem';
import * as assetsReducer from './../../..//store/assets/assets.reducer';
import TableHeaderCell from '../../../components/TableHeaderCell/TableHeaderCell';

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
							<TableHeaderCell><Button intent={Intent.PRIMARY} icon="refresh" onClick={(e) => dispatch(assetsReducer.loadAssets())} /></TableHeaderCell>
							<TableHeaderCell>Name</TableHeaderCell>
							<TableHeaderCell>Symbol</TableHeaderCell>
							<TableHeaderCell>ISIN</TableHeaderCell>
							{/* <TableHeaderCell>KGV</TableHeaderCell> */}
							<TableHeaderCell>Shares</TableHeaderCell>
							<TableHeaderCell>Current Price per Share</TableHeaderCell>
							<TableHeaderCell></TableHeaderCell>
							<TableHeaderCell>Avg Price Paid</TableHeaderCell>
							<TableHeaderCell>Current Invest</TableHeaderCell>
							<TableHeaderCell>Current Value</TableHeaderCell>
							<TableHeaderCell>Current Profit/Loss</TableHeaderCell>
							<TableHeaderCell>Dividends</TableHeaderCell>
							<TableHeaderCell>In-/Outcome</TableHeaderCell>
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