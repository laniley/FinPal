import { useAppSelector, useAppDispatch } from '../../../../hooks'
import { useState } from 'react';
import sendAsync from '../../../../../renderer';
import * as appStateReducer from '../../../../store/appState/appState.reducer';

export default function TransactionListItem(props: {i: number, transaction:Transaction}) {

  const dispatch = useAppDispatch();
  const [dateInput, setDateInput] = useState(props.transaction.date || '');
	const [typeInput, setTypeInput] = useState(props.transaction.type || '');
	const [assetInput, setAssetInput] = useState(props.transaction.asset || '');
	const [amountInput, setAmountInput] = useState(props.transaction.amount || '');
	const [priceInput, setPriceInput] = useState(props.transaction.price_per_share || '');
	const [feeInput, setFeeInput] = useState(props.transaction.fee || '');
	const [solidaritySurchargeInput, setSolidaritySurchargeInput] = useState(props.transaction.solidarity_surcharge || '');

  function validateAndSave() {
		
		if(dateInput && typeInput && assetInput && amountInput && priceInput) {
			let sql  = 'INSERT OR REPLACE INTO transactions (ID, date, type, asset, amount, price_per_share, fee, solidarity_surcharge) '
					sql += 'VALUES (\'' + props.transaction.ID 
					sql += '\',\'' + dateInput 
					sql += '\',\'' + typeInput 
					sql += '\',\'' + assetInput 
					sql += '\',\'' + amountInput 
					sql += '\',\'' + priceInput
					sql += '\',\'' + feeInput
					sql += '\',\'' + solidaritySurchargeInput
					sql += '\')'
					console.log(sql)
			sendAsync(sql).then((result) => {
				console.log(result)
				sendAsync('SELECT * FROM transactions').then((result:Transaction[]) => {
					console.log(result)
					dispatch(appStateReducer.setTransactions(result))
				});
			});
		}	
	}

	function deleteTransaction(ID:number) {
		sendAsync('DELETE FROM transactions WHERE ID = ' + ID).then((result:string) => {
			console.log(result)
			sendAsync('SELECT * FROM transactions').then((result:Transaction[]) => {
				console.log(result)
				dispatch(appStateReducer.setTransactions(result))
			});
		});
	}

  return (
    <tr>
			<th>{props.i}</th>
      <td><input id={"dateInput_" + props.transaction.ID} type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
      <td><input id={"typeInput" + props.transaction.ID} type="text" value={typeInput} onChange={(e) => setTypeInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
      <td><input id={"assetInput" + props.transaction.ID} type="text" value={assetInput} onChange={(e) => setAssetInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
      <td><input id={"amountInput" + props.transaction.ID} type="text" value={amountInput} onChange={(e) => setAmountInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
      <td><input id={"priceInput" + props.transaction.ID} type="text" value={priceInput} onChange={(e) => setPriceInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
			<td><input id={"feeInput" + props.transaction.ID} type="text" value={feeInput} onChange={(e) => setFeeInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
			<td><input id={"solidaritySurchargeInput" + props.transaction.ID} type="text" value={solidaritySurchargeInput} onChange={(e) => setSolidaritySurchargeInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
			<td><input id={"delete" + props.transaction.ID} type="button" value="Delete" onClick={(e) => deleteTransaction(props.transaction.ID)} /></td>
    </tr>
  );
}