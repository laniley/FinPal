import { Button, Dialog, DialogBody, DialogFooter, Intent, Overlay2, OverlaysProvider } from '@blueprintjs/core';
import * as assetsReducer from '../../../../store/assets/assets.reducer';
import { useAppDispatch } from '../../../../hooks';

export default function AnalysisRoute() {

	const dispatch = useAppDispatch();

	return (
		<Button data-testid="refreshButton" intent={Intent.PRIMARY} icon="refresh" onClick={(e) => dispatch(assetsReducer.loadAssets())} />
	);
}