import { useAppSelector, useAppDispatch } from '../../../../hooks'
import { useState } from 'react';
import * as dividendsReducer from '../../../../store/dividends/dividends.reducer';
import TableCell from '../../../../components/TableCell/TableCell';

export default function DividendListItem(props: {i: number, dividend:Dividend}) {

	const assets = useAppSelector(state => state.assets.assets)

  const dispatch = useAppDispatch();
  const [dateInput, setDateInput] = useState(props.dividend.date || '');
	const [assetInput, setAssetInput] = useState(props.dividend.asset_ID);
	const [incomeInput, setIncomeInput] = useState(props.dividend.income || '');

	//console.log(assetInput)

  function validateAndSave() {
		
		if(dateInput && assetInput && incomeInput) {
			let sql  = 'INSERT OR REPLACE INTO dividends (ID, date, asset_ID, income) '
					sql += 'VALUES (\'' + props.dividend.ID 
					sql += '\',\'' + dateInput 
					sql += '\',\'' + assetInput 
					sql += '\',\'' + incomeInput 
					sql += '\')'
					console.log(sql)
				window.API.sendToDB(sql).then((result:any) => {
				console.log(result)
				window.API.sendToDB('SELECT * FROM dividends').then((result:Dividend[]) => {
					console.log(result)
					dispatch(dividendsReducer.setDividends(result))
				});
			});
		}	
	}

  return (
    <tr>
			<TableCell>{props.i}</TableCell>
      <TableCell><input id={"dateInput_" + props.dividend.ID} type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} onBlur={(e) => validateAndSave()} /></TableCell>
      <TableCell>
				<select 
					id={"assetInput_" + props.dividend.ID} 
					name={"assetInput_" +  + props.dividend.ID} 
					value={assetInput} 
					onChange={(e) => setAssetInput(Number.parseInt(e.target.value))} 
					onBlur={(e) => validateAndSave()}>
          {assets.map((asset, i) => {
							return (<option key={asset.ID} value={asset.ID}>{asset.name}</option>)
					})}
        </select>
			</TableCell>
      <TableCell><input id={"amountInput" + props.dividend.ID} type="text" value={incomeInput} onChange={(e) => setIncomeInput(e.target.value)} onBlur={(e) => validateAndSave()} /></TableCell>
    </tr>
  );
}