import { Button, Dialog, DialogBody, DialogFooter, Intent, Overlay2, OverlaysProvider } from '@blueprintjs/core';
import { useAppSelector, useAppDispatch } from './../../../hooks'

import AssetListSumRow from './components/AssetListSumRow';
import AssetListItem from './components/AssetListItem';
import TableHeaderCell from '../../../components/TableHeaderCell/TableHeaderCell';
import * as assetsReducer from './../../..//store/assets/assets.reducer';
import * as assetsSelector from '../../../store/assets/assets.selectors';
import * as appStateReducer from '../../../store/appState/appState.reducer';
import * as assetCreationReducer from '../../../store/assetCreation/assetCreation.reducer';

export default function AnalysisRoute() {

	const dispatch = useAppDispatch();
	const appState = useAppSelector(state => state.appState)
	const assets = useAppSelector(state => state.assets.assets)
	const theme = useAppSelector(state => state.appState.theme)

	const isOpen = useAppSelector(state => state.appState.showAssetOverlay)

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

	const nameInput = useAppSelector(state => state.assetCreation.nameInput)
  const symbolInput = useAppSelector(state => state.assetCreation.symbolInput)
  const isinInput = useAppSelector(state => state.assetCreation.isinInput)
	const kgvInput = useAppSelector(state => state.assetCreation.kgvInput)

	return (
		<div
			id="AssetsRoute"
			className={'absolute top-[0px] bottom-0 flex flex-col w-full p-3 ' + theme}>
			<div id="Table" className="flex justify-center p-3 overflow-auto">
				<table>
					<thead>
						<tr>
							<TableHeaderCell><Button intent={Intent.PRIMARY} icon="refresh" onClick={(e) => dispatch(assetsReducer.loadAssets())} /></TableHeaderCell>
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
			<OverlaysProvider>
				<Dialog 
					className={theme} 
					isOpen={isOpen} 
					title={ appState.assetOverlayType == appStateReducer.AssetOverlayType.NEW ? "New Asset" : "Edit Asset"}
					icon={ appState.assetOverlayType == appStateReducer.AssetOverlayType.NEW ? "plus" : "edit"}
					canOutsideClickClose={false}
					onClose={(e) => dispatch(appStateReducer.setShowAssetOverlay(false))}>
					<DialogBody>
						<table>
							<tbody>
								<tr><td>ID</td><td>{useAppSelector(state => state.assetCreation.ID)}</td></tr>
								<tr><td>Name</td><td><input id="nameInput" type="text" value={nameInput} onChange={(e) => dispatch(assetCreationReducer.setNameInput(e.target.value))} /> *</td></tr>
								<tr><td>Symbol</td><td><input id="symbolInput" type="text" value={symbolInput} onChange={(e) => dispatch(assetCreationReducer.setSymbolInput(e.target.value))} /> *</td></tr>
								<tr><td>ISIN</td><td><input id="isinInput" type="text" minLength={12} maxLength={12} value={isinInput} onChange={(e) => dispatch(assetCreationReducer.setISINInput(e.target.value))} /> *</td></tr> 
								<tr><td>KGV</td><td><input id="kgvInput" type="text" value={kgvInput} onChange={(e) => dispatch(assetCreationReducer.setKGVInput(e.target.value))} /></td></tr>
							</tbody>
						</table>
					</DialogBody>
					<DialogFooter actions={
						<div>
							<Button intent="success" text="Save" onClick={(e) => dispatch(assetCreationReducer.validate())} />
							<Button intent="primary" text="Close" onClick={(e) => dispatch(appStateReducer.setShowAssetOverlay(false))} />
						</div>} />
				</Dialog>
			</OverlaysProvider>
		</div>
	);
}

function AssetList(props:{assets:Asset[]}):JSX.Element {
	return <>{
		props.assets.map((asset, i) => (<AssetListItem key={"asset-" + asset.ID} i={i+1} asset={asset} />))
	}</>
}