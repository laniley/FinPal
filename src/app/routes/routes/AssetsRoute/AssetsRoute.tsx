import { useAppSelector } from './../../../hooks'

import CreateAndEditAssetOverlay from './components/CreateAndEditAssetOverlay';
import AssetList from './components/AssetList/AssetList';

export default function AnalysisRoute() {

	return (
		<div
			id="AssetsRoute"
			data-testid="AssetsRoute">
			<div className="flex justify-center p-3 overflow-auto">
				<AssetList/>
			</div>
			<CreateAndEditAssetOverlay />
		</div>
	);
}