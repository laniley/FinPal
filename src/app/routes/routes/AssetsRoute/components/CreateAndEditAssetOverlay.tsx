import { Button, Dialog, DialogBody, DialogFooter, Intent, Overlay2, OverlaysProvider } from '@blueprintjs/core';
import { useAppSelector, useAppDispatch } from './../../../../hooks'

import * as appStateReducer from '../../../../store/appState/appState.reducer';
import * as assetCreationReducer from '../../../../store/assetCreation/assetCreation.reducer';

export default function AnalysisRoute() {

	const dispatch = useAppDispatch();
	const appState = useAppSelector(state => state.appState)
	const theme = useAppSelector(state => state.appState.theme)

	const isOpen = useAppSelector(state => state.appState.showAssetOverlay)

	const nameInput = useAppSelector(state => state.assetCreation.nameInput)
  const symbolInput = useAppSelector(state => state.assetCreation.symbolInput)
  const isinInput = useAppSelector(state => state.assetCreation.isinInput)
	const kgvInput = useAppSelector(state => state.assetCreation.kgvInput)

	return (
    <OverlaysProvider>
      <Dialog 
        
        className={theme} 
        isOpen={isOpen} 
        title={appState.assetOverlayType == appStateReducer.AssetOverlayType.NEW ? "New Asset" : "Edit Asset"}
        icon={appState.assetOverlayType == appStateReducer.AssetOverlayType.NEW ? "plus" : "edit"}
        canOutsideClickClose={false}
        onClose={(e) => dispatch(appStateReducer.setShowAssetOverlay(false))}>
        <DialogBody>
          <table data-testid="AssetOverlay">
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
	);
}