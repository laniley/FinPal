import { useAppSelector, useAppDispatch } from './../../../../hooks'

import * as dividendCreationReducer from './../../../../../../src/app/store/dividendCreation/dividendCreation.reducer';
import TableCell from '../../../../components/TableCell/TableCell';

export default function TransactionsRoute() {

	const dispatch = useAppDispatch();
	const dateInput = useAppSelector(state => state.dividendCreation.dateInput)
	const assetInput = useAppSelector(state => state.dividendCreation.assetInput)
	const incomeInput = useAppSelector(state => state.dividendCreation.incomeInput)

	return (
    <tr>
      <TableCell>*</TableCell>
      <TableCell><input id="dateInput" type="date" value={dateInput} onChange={(e) => dispatch(dividendCreationReducer.setDateInput(e.target.value))} onBlur={() => { dispatch(dividendCreationReducer.handleDateInputGotTouched()) }} /></TableCell>
      <TableCell><input id="assetInput" type="text" value={assetInput} onChange={(e) => dispatch(dividendCreationReducer.setAssetInput(e.target.value))} onBlur={() => { dispatch(dividendCreationReducer.handleAssetInputGotTouched()) }} /></TableCell>
      <TableCell><input id="incomeInput" type="text" value={incomeInput} onChange={(e) => dispatch(dividendCreationReducer.setIncomeInput(e.target.value))} onBlur={() => { dispatch(dividendCreationReducer.handleIncomeInputGotTouched()) }} /></TableCell>
    </tr>
	);
}