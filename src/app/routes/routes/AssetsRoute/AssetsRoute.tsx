import { useAppSelector, useAppDispatch } from './../../../hooks'

import AssetCreation from './components/AssetCreation';
import AssetListItem from './components/AssetListItem';

export default function AnalysisRoute() {

	const theme = useAppSelector(state => state.appState.theme)
	
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
							<th>KGV</th>
						</tr>
					</thead>
					<tbody>
						<AssetCreation/>
						<AssetList/>
					</tbody>
				</table>
			</div>
		</div>
	);
}

function AssetList():JSX.Element {
	const assets = useAppSelector(state => state.assets.assets)
	return <>{
		assets.map((asset, i) => (<AssetListItem key={"asset-" + asset.ID} i={i+1} asset={asset} />))
	}</>
}