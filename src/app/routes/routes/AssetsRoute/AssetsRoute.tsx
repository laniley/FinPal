import { useAppSelector } from './../../../hooks'

import AssetListSumRow from './components/AssetListSumRow';
import AssetListItem from './components/AssetListItem';
import TableHeaderCell from '../../../components/TableHeaderCell/TableHeaderCell';
import * as assetsSelector from '../../../store/assets/assets.selectors';
import RefreshButton from './components/RefreshButton';
import CreateAndEditAssetOverlay from './components/CreateAndEditAssetOverlay';

export default function AnalysisRoute() {

	const assets = useAppSelector(state => state.assets.assets)
	const theme = useAppSelector(state => state.appState.theme)

	var sum_profit_lost = 0
	var sum_dividends = 0
	var sum_in_out = 0

	assets.forEach(asset => {
		const current_profit_loss = (asset.current_shares * asset.price) + asset.current_invest
		sum_profit_lost += current_profit_loss
		sum_dividends += asset.dividends
		sum_in_out += asset.current_sum_in_out
	});
	
	var sum_profit_loss_formatted = (Math.round(sum_profit_lost * 100) / 100).toFixed(2)
	var sum_dividends_formatted = (Math.round(sum_dividends * 100) / 100).toFixed(2)
	var sum_in_out_formatted = (Math.round(sum_in_out * 100) / 100).toFixed(2)

	const sorted_Assets = assetsSelector.selectAssetsSortedByProfitLoss(assets, 'desc')

	return (
		<div
			id="AssetsRoute"
			data-testid="AssetsRoute"
			className={'absolute top-[0px] bottom-0 flex flex-col w-full p-3 ' + theme}>
			<div id="Table" className="flex justify-center p-3 overflow-auto">
				<table>
					<thead>
						<tr>
							<TableHeaderCell><RefreshButton /></TableHeaderCell>
							<TableHeaderCell>ID</TableHeaderCell>
							<TableHeaderCell>Name</TableHeaderCell>
							<TableHeaderCell>Shares</TableHeaderCell>
							<TableHeaderCell>Current Price per Share</TableHeaderCell>
							<TableHeaderCell></TableHeaderCell>
							<TableHeaderCell>Avg Price Paid</TableHeaderCell>
							<TableHeaderCell>Current Invest</TableHeaderCell>
							<TableHeaderCell>Current Value</TableHeaderCell>
							<TableHeaderCell>Current Profit/Loss</TableHeaderCell>
							<TableHeaderCell>Ex Date</TableHeaderCell>
							<TableHeaderCell>Pay Date</TableHeaderCell>
							<TableHeaderCell>Dividends</TableHeaderCell>
							<TableHeaderCell>In-/Outcome</TableHeaderCell>
						</tr>
					</thead>
					<tbody>
						<AssetListSumRow sum_profit_loss={sum_profit_loss_formatted} sum_dividends={sum_dividends_formatted} sum_in_out={sum_in_out_formatted} />
						<AssetList assets={sorted_Assets}/>
					</tbody>
				</table>
			</div>
			<CreateAndEditAssetOverlay />
		</div>
	);
}

function AssetList(props:{assets:Asset[]}):JSX.Element {
	return <>{
		props.assets.map((asset, i) => (<AssetListItem key={"asset-" + asset.ID} i={i+1} asset={asset} />))
	}</>
}