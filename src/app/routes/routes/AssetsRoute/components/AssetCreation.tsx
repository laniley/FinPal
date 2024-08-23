import { useAppSelector, useAppDispatch } from './../../../../hooks'

import * as assetCreationReducer from '../../../../store/assetCreation/assetCreation.reducer';
import TableCell from '../../../../components/TableCell/TableCell';

export default function AnalysisRoute(props: {sum_profit_loss:string, sum_dividends:string, sum_in_out:string, }) {

	const dispatch = useAppDispatch();
	const nameInput = useAppSelector(state => state.assetCreation.nameInput)
  const symbolInput = useAppSelector(state => state.assetCreation.symbolInput)
  const isinInput = useAppSelector(state => state.assetCreation.isinInput)
	const kgvInput = useAppSelector(state => state.assetCreation.kgvInput)

	return (
    <tr>
      <TableCell>*</TableCell>
      <TableCell><input id="nameInput" type="text" value={nameInput} onChange={(e) => dispatch(assetCreationReducer.setNameInput(e.target.value))} onBlur={() => { dispatch(assetCreationReducer.handleNameInputGotTouched()) }} /></TableCell>
      <TableCell><input id="symbolInput" type="text" value={symbolInput} onChange={(e) => dispatch(assetCreationReducer.setSymbolInput(e.target.value))} onBlur={() => { dispatch(assetCreationReducer.handleSymbolInputGotTouched()) }} /></TableCell>
      <TableCell><input id="isinInput" type="text" className="text-center" minLength={12} maxLength={12} size={12} value={isinInput} onChange={(e) => dispatch(assetCreationReducer.setISINInput(e.target.value))} onBlur={() => { dispatch(assetCreationReducer.handleISINInputGotTouched()) }} /></TableCell>
      {/* <TableCell><input id="kgvInput" type="text" value={kgvInput} onChange={(e) => dispatch(assetCreationReducer.setKGVInput(e.target.value))} onBlur={() => { dispatch(assetCreationReducer.handleKGVInputGotTouched()) }} /></TableCell> */}
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>{props.sum_profit_loss} €</TableCell>
      <TableCell>{props.sum_dividends} €</TableCell>
      <TableCell>{props.sum_in_out} €</TableCell>
    </tr>
	);
}