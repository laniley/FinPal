import { useAppSelector } from './../../../hooks'

import CreateAndEditAssetOverlay from './components/CreateAndEditAssetOverlay';
import AssetList from './components/AssetList/AssetList';

export default function AnalysisRoute() {

	const theme = useAppSelector(state => state.appState.theme)

	return (
		<div
			id="AssetsRoute"
			data-testid="AssetsRoute"
			className={'absolute top-[0px] bottom-0 flex flex-col w-full p-3 ' + theme}>
			<div className="flex justify-center p-3 overflow-auto">
				<AssetList/>
			</div>
			<CreateAndEditAssetOverlay />
		</div>
	);
}