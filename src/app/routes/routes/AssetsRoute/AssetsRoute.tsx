import { useAppSelector, useAppDispatch } from './../../../hooks'

import AssetCreation from './components/AssetCreation';
import AssetListItem from './components/AssetListItem';

export default function AnalysisRoute() {

	const assets = useAppSelector(state => state.assets.assets)
	const theme = useAppSelector(state => state.appState.theme)

	var sum_in_out = 0

	assets.forEach(asset => {
		sum_in_out += asset.current_sum_in_out
	});
	
	var sum_in_out_formatted = (Math.round(sum_in_out * 100) / 100).toFixed(2)
	
	return (
		<div
			id="AssetsRoute"
			className={'absolute top-[0px] bottom-0 flex flex-col w-full ' + theme}>
			<div id="Main" className="flex justify-center p-3 overflow-auto">
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Symbol</th>
							<th>KGV</th>
							<th>Shares</th>
							<th>Current Price per Share</th>
							<th>Current Value</th>
							<th>In-/Outcome</th>
						</tr>
					</thead>
					<tbody>
						<AssetCreation sum_in_out={sum_in_out_formatted}/>
						<AssetList assets={assets}/>
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