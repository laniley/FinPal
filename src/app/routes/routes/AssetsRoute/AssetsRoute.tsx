import { useAppSelector, useAppDispatch } from './../../../hooks'

import * as assetCreationReducer from '../../../store/assetCreation/assetCreation.reducer';
import AssetListItem from './components/AssetListItem';

export default function AnalysisRoute() {

	const dispatch = useAppDispatch();
	const theme = useAppSelector(state => state.appState.theme)
	const nameInput = useAppSelector(state => state.assetCreation.nameInput)
	const kgvInput = useAppSelector(state => state.assetCreation.kgvInput)
	const assets = useAppSelector(state => state.assets.assets)

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
						<tr>
							<td></td>
							<td><input id="nameInput" type="text" value={nameInput} onChange={(e) => dispatch(assetCreationReducer.setNameInput(e.target.value))} onBlur={() => { dispatch(assetCreationReducer.handleNameInputGotTouched()) }} /></td>
							<td><input id="kgvInput" type="text" value={kgvInput} onChange={(e) => dispatch(assetCreationReducer.setKGVInput(e.target.value))} onBlur={() => { dispatch(assetCreationReducer.handleKGVInputGotTouched()) }} /></td>
						</tr>
						{
							assets.map((asset, i) => {
								return (<AssetListItem key={"asset-" + i} i={i+1} asset={asset} />)
							})
						}
					</tbody>
				</table>
			</div>
		</div>
	);
}