import { useAppSelector, useAppDispatch } from '../../../../hooks'
import { useState } from 'react';
import * as assetsReducer from '../../../../store/assets/assets.reducer';

export default function AssetListItem(props: {i: number, asset:Asset}) {

  const dispatch = useAppDispatch();
  const [nameInput, setNameInput] = useState(props.asset.name || '');
	const [symbolInput, setSymbolInput] = useState(props.asset.symbol || '');
	const [kgvInput, setKGVInput] = useState(props.asset.kgv || '');

	const current_price = (Math.round(props.asset.price * 100) / 100).toFixed(2)
	const current_sum_in_out = (Math.round(props.asset.current_sum_in_out * 100) / 100).toFixed(2)

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

	const bgColor = props.asset.current_sum_in_out > 0 ? "bg-emerald-600" : "bg-pink-700"

  return (
    <tr>
			<td className="border-2 border-slate-600">{props.i}</td>
      <td className="border-2 border-slate-600"><input id={"nameInput_" + props.asset.ID} type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
			<td className="border-2 border-slate-600"><input id={"symbolInput_" + props.asset.ID} type="text" value={symbolInput} onChange={(e) => setSymbolInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
      <td className="border-2 border-slate-600"><input id={"kgvInput" + props.asset.ID} type="text" value={kgvInput} onChange={(e) => setKGVInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
			<td className="border-2 border-slate-600 px-2 ">{props.asset.current_shares}</td>
			<td className="border-2 border-slate-600 px-2 text-right">{current_price} €</td>
			<td className={"border-2 border-slate-600 px-2 text-right " + bgColor}>{current_sum_in_out} €</td>
    </tr>
  );
}