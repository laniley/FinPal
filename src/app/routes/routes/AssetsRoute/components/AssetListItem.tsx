import { useAppSelector, useAppDispatch } from '../../../../hooks'
import { useState } from 'react';
import * as assetsReducer from '../../../../store/assets/assets.reducer';
import TableCell from '../../../../components/TableCell/TableCell'

export default function AssetListItem(props: {i: number, asset:Asset}) {

  const dispatch = useAppDispatch();
  const [nameInput, setNameInput] = useState(props.asset.name || '');
	const [symbolInput, setSymbolInput] = useState(props.asset.symbol || '');
	const [isinInput, setISINInput] = useState(props.asset.isin || '');
	const [kgvInput, setKGVInput] = useState(props.asset.kgv || '');

	const shares_formatted = (Math.round(props.asset.current_shares * 1000) / 1000).toFixed(3)
	const current_price = (Math.round(props.asset.price * 100) / 100).toFixed(2)
	const avg_price_paid_formatted = (Math.round(props.asset.avg_price_paid * 100) / 100).toFixed(2)
	const current_invest = (Math.round(props.asset.current_invest * 100) / 100).toFixed(2)
	const current_value = (Math.round(props.asset.current_shares * props.asset.price * 100) / 100).toFixed(2)
	const current_profit_loss_formatted = (Math.round(props.asset.current_profit_loss * 100) / 100).toFixed(2)
	const dividends_formatted = (Math.round(props.asset.dividends * 100) / 100).toFixed(2)
	const current_sum_in_out = (Math.round((props.asset.current_sum_in_out + props.asset.dividends) * 100) / 100).toFixed(2)

  function validateAndSave() {
		
		if(nameInput && symbolInput && isinInput) {
			let sql  = 'INSERT OR REPLACE INTO assets (ID, name, symbol, ISIN, KGV) '
					sql += 'VALUES (\'' + props.asset.ID 
					sql += '\',\'' + nameInput.replace('\'', '\'\'') 
					sql += '\',\'' + symbolInput 
					sql += '\',\'' + isinInput 
					sql += '\',\'' + kgvInput 
					sql += '\')'
					console.log(sql)
					window.API.sendToDB(sql).then((result:any) => {
				console.log(result)
				window.API.sendToDB('SELECT * FROM assets_v').then((result:Asset[]) => {
					console.log(result)
					dispatch(assetsReducer.setAssets(result))
				});
			});
		}	
	}

	function deleteAsset(ID:number) {
		window.API.sendToDB('DELETE FROM assets WHERE ID = ' + ID).then((result:string) => {
			console.log(result)
			window.API.sendToDB('SELECT * FROM assets_v').then((result:Asset[]) => {
				console.log(result)
				dispatch(assetsReducer.setAssets(result))
			});
		});
	}

	const bgColor_ProfitLoss = props.asset.current_profit_loss > 0 ? "bg-emerald-600" : (props.asset.current_profit_loss == 0 ? "bg-slate-500" : "bg-pink-700")
	const bgColor_InOut = props.asset.current_sum_in_out > 0 ? "bg-emerald-600" : "bg-pink-700"

  return (
    <tr>
			<TableCell additionalClassNames="text-right">{props.i}</TableCell>
      <TableCell><input id={"nameInput_" + props.asset.ID} type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} onBlur={(e) => validateAndSave()} /></TableCell>
			<TableCell><input id={"symbolInput_" + props.asset.ID} type="text" value={symbolInput} onChange={(e) => setSymbolInput(e.target.value)} onBlur={(e) => validateAndSave()} /></TableCell>
      <TableCell><input id={"isinInput_" + props.asset.ID} type="text" className="text-center" minLength={12} maxLength={12} size={12} value={isinInput} onChange={(e) => setISINInput(e.target.value)} onBlur={(e) => validateAndSave()} /></TableCell>
			{/* <TableCell><input id={"kgvInput" + props.asset.ID} type="text" value={kgvInput} onChange={(e) => setKGVInput(e.target.value)} onBlur={(e) => validateAndSave()} /></TableCell> */}
			<TableCell additionalClassNames="text-right">{shares_formatted}</TableCell>
			<TableCell additionalClassNames="text-right">{current_price} {props.asset.currencySymbol}</TableCell>
			<TableCell additionalClassNames="text-right">{avg_price_paid_formatted} {props.asset.currencySymbol}</TableCell>
			<TableCell additionalClassNames="text-right">{current_invest} {props.asset.currencySymbol}</TableCell>
			<TableCell additionalClassNames="text-right">{current_value} {props.asset.currencySymbol}</TableCell>
			<TableCell additionalClassNames="text-right" bgColor={bgColor_ProfitLoss}>{current_profit_loss_formatted} {props.asset.currencySymbol} / {props.asset.current_profit_loss_percentage_formatted} %</TableCell>
			<TableCell additionalClassNames="text-right">{dividends_formatted} {props.asset.currencySymbol}</TableCell>
			<TableCell additionalClassNames="text-right" bgColor={bgColor_InOut}>{current_sum_in_out} €</TableCell>
    </tr>
  );
}