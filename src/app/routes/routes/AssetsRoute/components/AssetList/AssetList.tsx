import { useAppSelector } from './../../../../../hooks'

import AssetListSumRow from './AssetListSumRow';
import AssetListItem from './AssetListItem';
import Table from '../../../../../components/Table/Table';
import TableHeaderCell from '../../../../../components/Table/TableHeaderCell/TableHeaderCell';
import * as assetsSelector from '../../../../../store/assets/assets.selectors';
import RefreshButton from './../../components/RefreshButton';

export default function AnalysisRoute() {

	const assets = useAppSelector(state => state.assets)

	var sum_profit_lost = 0
	var sum_dividends = 0
	var sum_in_out = 0

	assets.forEach(asset => {
		const current_profit_loss = (asset.current_shares * asset.price) + asset.current_invest
		sum_profit_lost += current_profit_loss
		sum_dividends += asset.dividends_earned
		sum_in_out += asset.current_sum_in_out
	});
	
	var sum_profit_loss_formatted = (Math.round(sum_profit_lost * 100) / 100).toFixed(2)
	var sum_dividends_formatted = (Math.round(sum_dividends * 100) / 100).toFixed(2)
	var sum_in_out_formatted = (Math.round(sum_in_out * 100) / 100).toFixed(2)

	const sorted_Assets = assetsSelector.selectAssetsSortedByProfitLoss(assets, 'desc')

	return (
    <Table>
      <thead>
        <tr>
          <TableHeaderCell><RefreshButton /></TableHeaderCell>
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
        <AssetListRows assets={sorted_Assets}/>
      </tbody>
    </Table>
	);
}

function AssetListRows(props:{assets:Asset[]}):JSX.Element {
	return <>{
		props.assets.map((asset, i) => (<AssetListItem key={"asset-" + asset.ID} i={i+1} asset={asset} />))
	}</>
}