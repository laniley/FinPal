import { useAppSelector, useAppDispatch } from '../../../../hooks'
import { useState } from 'react';
import * as dividendsReducer from '../../../../store/dividends/dividends.reducer';
import TableCell from '../../../../components/TableCell';

export default function DividendListItem(props: {i: number, dividend:Dividend}) {

  const dispatch = useAppDispatch();
  const [dateInput, setDateInput] = useState(props.dividend.date || '');
	const [assetInput, setAssetInput] = useState(props.dividend.asset || '');
	const [incomeInput, setIncomeInput] = useState(props.dividend.income || '');

  function validateAndSave() {
		
		if(dateInput && assetInput && incomeInput) {
			let sql  = 'INSERT OR REPLACE INTO dividends (ID, date, asset, income) '
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
      <TableCell><input id={"assetInput" + props.dividend.ID} type="text" value={assetInput} onChange={(e) => setAssetInput(e.target.value)} onBlur={(e) => validateAndSave()} /></TableCell>
      <TableCell><input id={"amountInput" + props.dividend.ID} type="text" value={incomeInput} onChange={(e) => setIncomeInput(e.target.value)} onBlur={(e) => validateAndSave()} /></TableCell>
    </tr>
  );
}