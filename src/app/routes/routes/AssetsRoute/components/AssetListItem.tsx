import { useAppSelector, useAppDispatch } from '../../../../hooks'
import { useState } from 'react';
import * as assetsReducer from '../../../../store/assets/assets.reducer';

export default function AssetListItem(props: {i: number, asset:Asset}) {

  const dispatch = useAppDispatch();
  const [nameInput, setNameInput] = useState(props.asset.name || '');
	const [symbolInput, setSymbolInput] = useState(props.asset.symbol || '');
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
		
		if(nameInput && symbolInput) {
			let sql  = 'INSERT OR REPLACE INTO assets (ID, name, symbol, KGV) '
					sql += 'VALUES (\'' + props.asset.ID 
					sql += '\',\'' + nameInput 
					sql += '\',\'' + symbolInput 
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
			<td className="border-2 border-slate-600">{props.i}</td>
      <td className="border-2 border-slate-600"><input id={"nameInput_" + props.asset.ID} type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
			<td className="border-2 border-slate-600"><input id={"symbolInput_" + props.asset.ID} type="text" value={symbolInput} onChange={(e) => setSymbolInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
      <td className="border-2 border-slate-600"><input id={"kgvInput" + props.asset.ID} type="text" value={kgvInput} onChange={(e) => setKGVInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
			<td className="border-2 border-slate-600 px-2 text-right">{shares_formatted}</td>
			<td className="border-2 border-slate-600 px-2 text-right">{current_price} {props.asset.currencySymbol}</td>
			<td className="border-2 border-slate-600 px-2 text-right">{avg_price_paid_formatted} {props.asset.currencySymbol}</td>
			<td className="border-2 border-slate-600 px-2 text-right">{current_invest} {props.asset.currencySymbol}</td>
			<td className="border-2 border-slate-600 px-2 text-right">{current_value} {props.asset.currencySymbol}</td>
			<td className={"border-2 border-slate-600 px-2 text-right " + bgColor_ProfitLoss}>{current_profit_loss_formatted} {props.asset.currencySymbol} / {props.asset.current_profit_loss_percentage_formatted} %</td>
			<td className="border-2 border-slate-600 px-2 text-right">{dividends_formatted} {props.asset.currencySymbol}</td>
			<td className={"border-2 border-slate-600 px-2 text-right " + bgColor_InOut}>{current_sum_in_out} €</td>
    </tr>
  );
}