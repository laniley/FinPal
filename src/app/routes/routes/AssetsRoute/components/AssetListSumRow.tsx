import { useAppSelector, useAppDispatch } from '../../../../hooks'

import * as assetCreationReducer from '../../../../store/assetCreation/assetCreation.reducer';
import TableCell from '../../../../components/TableCell/TableCell';
import { Button, Intent } from '@blueprintjs/core';
import * as appStateReducer from '../../../../store/appState/appState.reducer';

export default function AssetListSumRow(props: {sum_profit_loss:string, sum_dividends:string, sum_in_out:string, }) {

	const dispatch = useAppDispatch();

	return (
    <tr>
      <TableCell additionalClassNames="text-right">*</TableCell>
      <TableCell></TableCell>
      <TableCell additionalClassNames="text-center">
        <div><Button intent={Intent.PRIMARY} icon="plus" text="New Asset" fill onClick={(e) => openAssetOverlay()} /></div>
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell additionalClassNames="text-right">{props.sum_profit_loss} €</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell additionalClassNames="text-right">{props.sum_dividends} €</TableCell>
      <TableCell additionalClassNames="text-right">{props.sum_in_out} €</TableCell>
    </tr>
	);

  function openAssetOverlay() {
    dispatch(assetCreationReducer.reset())
    dispatch(appStateReducer.setAssetOverlayType(appStateReducer.AssetOverlayType.NEW))
    dispatch(appStateReducer.setShowAssetOverlay(true))
  }
}