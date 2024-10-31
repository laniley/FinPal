import { useAppSelector, useAppDispatch } from '../../../../hooks'
import { useState } from 'react';
import * as transactionsReducer from '../../../../store/transactions/transactions.reducer';
import TableCell from '../../../../components/TableCell/TableCell';
import * as assetsReducer from '../../../../store/assets/assets.reducer';

export default function TransactionListItem(props: {i: number, transaction:Transaction}) {

	const price_per_share = (Math.round(props.transaction.price_per_share * 100) / 100).toFixed(2)
	const fee = (Math.round(props.transaction.fee * 100) / 100).toFixed(2)
	const solidarity_surcharge = (Math.round(props.transaction.solidarity_surcharge * 100) / 100).toFixed(2)
	const invest_cumulated = (Math.round(props.transaction.invest_cumulated * 100) / 100).toFixed(2)
	const in_out = (Math.round(props.transaction.in_out * 100) / 100).toFixed(2)

	const assets = useAppSelector(state => state.assets.assets)
	const transaction_asset = assets.filter(asset => { return asset.ID === props.transaction.asset_ID })[0]

  const dispatch = useAppDispatch();
  const [dateInput, setDateInput] = useState(props.transaction.date || '');
	const [typeInput, setTypeInput] = useState(props.transaction.type || '');
	const [assetInput, setAssetInput] = useState(transaction_asset ? transaction_asset.ID.toString() : '');
	const [amountInput, setAmountInput] = useState(props.transaction.amount || '');
	const [priceInput, setPriceInput] = useState(price_per_share);
	const [feeInput, setFeeInput] = useState(fee);
	const [solidaritySurchargeInput, setSolidaritySurchargeInput] = useState(solidarity_surcharge);

  function validateAndSave() {
		
		if(dateInput && typeInput && assetInput && amountInput && priceInput) {
			let sql  = 'INSERT OR REPLACE INTO transactions (ID, date, type, asset, amount, price_per_share, fee, solidarity_surcharge) '
					sql += 'VALUES (\'' + props.transaction.ID 
					sql += '\',\'' + dateInput 
					sql += '\',\'' + typeInput 
					sql += '\',\'' + assetInput 
					sql += '\',\'' + amountInput 
					sql += '\',\'' + priceInput.replace(',', '.')
					sql += '\',\'' + feeInput.replace(',', '.')
					sql += '\',\'' + solidaritySurchargeInput.replace(',', '.')
					sql += '\')'
					console.log(sql)
				window.API.sendToDB(sql).then((result:any) => {
				console.log(result)
				window.API.sendToDB('SELECT * FROM transactions_v').then(async (result:Transaction[]) => {
					console.log(result)
					await dispatch(transactionsReducer.setTransactions(result))
					await dispatch(assetsReducer.loadAssets())
				});
			});
		}	
	}

	function deleteTransaction(ID:number) {
		window.API.sendToDB('DELETE FROM transactions WHERE ID = ' + ID).then((result:string) => {
			console.log(result)
			window.API.sendToDB('SELECT * FROM transactions_v').then((result:Transaction[]) => {
				console.log(result)
				dispatch(transactionsReducer.setTransactions(result))
			});
		});
	}

	const shares_cumulated_formatted = (Math.round(props.transaction.shares_cumulated * 100) / 100).toFixed(2)

	const bgColorType = props.transaction.type == "Buy" ? "bg-emerald-600" : "bg-pink-700"
	const bgColorInOut = props.transaction.in_out > 0 ? "bg-emerald-600" : "bg-pink-700"

  return (
    <tr>
			<TableCell>{props.i}</TableCell>
      <TableCell><input id={"dateInput_" + props.transaction.ID} type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} onBlur={(e) => validateAndSave()} /></TableCell>
      <TableCell>
				<select className={bgColorType} id={"typeInput" + props.transaction.ID} name={"typeInput" + props.transaction.ID} value={typeInput} 
				onChange={(e) => setTypeInput(e.target.value)} 
				onBlur={(e) => validateAndSave()}>
					<option value="Buy">Buy</option>
					<option value="Sell">Sell</option>
				</select>
			</TableCell>
      <TableCell>
				<select 
					id={"assetInput_" + props.transaction.ID} 
					name={"assetInput_" +  + props.transaction.ID} 
					value={assetInput} 
					onChange={(e) => setAssetInput(e.target.value)} 
					onBlur={(e) => validateAndSave()}>
          {assets.map((asset, i) => {
							return (<option key={asset.ID} value={asset.ID}>{asset.name}</option>)
					})}
        </select>
			</TableCell>
      <TableCell><input id={"amountInput" + props.transaction.ID} type="text" value={amountInput} onChange={(e) => setAmountInput(e.target.value)} onBlur={(e) => validateAndSave()} /></TableCell>
      <TableCell additionalClassNames={"text-right"}>{shares_cumulated_formatted}</TableCell>
			<TableCell><input className="text-right" id={"priceInput" + props.transaction.ID} type="text" value={priceInput} onChange={(e) => setPriceInput(e.target.value)} onBlur={(e) => validateAndSave()} /></TableCell>
			<TableCell><input className="text-right" id={"feeInput" + props.transaction.ID} type="text" value={feeInput} onChange={(e) => setFeeInput(e.target.value)} onBlur={(e) => validateAndSave()} /></TableCell>
			<TableCell><input className="text-right" id={"solidaritySurchargeInput" + props.transaction.ID} type="text" value={solidaritySurchargeInput} onChange={(e) => setSolidaritySurchargeInput(e.target.value)} onBlur={(e) => validateAndSave()} /></TableCell>
			<TableCell additionalClassNames={"text-right"}>{invest_cumulated}</TableCell>
			<TableCell additionalClassNames={"text-right"} bgColor={bgColorInOut}>{in_out}</TableCell>
			<TableCell><input id={"delete" + props.transaction.ID} type="button" value="Delete" onClick={(e) => deleteTransaction(props.transaction.ID)} /></TableCell>
    </tr>
  );
}