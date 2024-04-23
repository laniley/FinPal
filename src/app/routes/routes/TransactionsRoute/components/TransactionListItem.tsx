import { useAppSelector, useAppDispatch } from '../../../../hooks'
import { useState } from 'react';
import sendAsync from '../../../../../renderer';
import * as appStateReducer from '../../../../store/appState/appState.reducer';

export default function TransactionListItem(props: {transaction:Transaction}) {

  const dispatch = useAppDispatch();
  const [dateInput, setDateInput] = useState(props.transaction.date);
	const [typeInput, setTypeInput] = useState(props.transaction.type);
	const [assetInput, setAssetInput] = useState(props.transaction.asset);
	const [amountInput, setAmountInput] = useState(props.transaction.amount);
	const [priceInput, setPriceInput] = useState(props.transaction.price_per_share);

  function validate() {
		console.log('validate')
		if(dateInput && typeInput && assetInput) {
			let sql  = 'INSERT OR REPLACE INTO transactions (ID, date, type, asset, amount, price_per_share) '
					sql += 'VALUES (\'' + props.transaction.ID + '\',\'' + dateInput + '\',\'' + typeInput + '\',\'' + assetInput + '\',\'' + amountInput + '\',\'' + priceInput + '\')'
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

  return (
    <tr>
      <td><input id={"dateInput_" + props.transaction.ID} type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} onBlur={(e) => validate()} /></td>
      <td><input id={"typeInput" + props.transaction.ID} type="text" value={typeInput} onChange={(e) => setTypeInput(e.target.value)} onBlur={(e) => validate()} /></td>
      <td><input id={"assetInput" + props.transaction.ID} type="text" value={assetInput} onChange={(e) => setAssetInput(e.target.value)} onBlur={(e) => validate()} /></td>
      <td><input id={"amountInput" + props.transaction.ID} type="text" value={amountInput} onChange={(e) => setAmountInput(e.target.value)} onBlur={(e) => validate()} /></td>
      <td><input id={"priceInput" + props.transaction.ID} type="text" value={priceInput} onChange={(e) => setPriceInput(e.target.value)} onBlur={(e) => validate()} /></td>
    </tr>
  );
}