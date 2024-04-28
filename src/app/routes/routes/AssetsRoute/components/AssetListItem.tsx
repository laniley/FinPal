import { useAppSelector, useAppDispatch } from '../../../../hooks'
import { useState } from 'react';
import * as appStateReducer from '../../../../store/appState/appState.reducer';
import * as assetsReducer from '../../../../store/assets/assets.reducer';

export default function AssetListItem(props: {i: number, asset:Asset}) {

  const dispatch = useAppDispatch();
  const [nameInput, setNameInput] = useState(props.asset.name || '');
	const [kgvInput, setKGVInput] = useState(props.asset.KGV || '');

  function validateAndSave() {
		
		if(nameInput) {
			let sql  = 'INSERT OR REPLACE INTO assets (ID, name, KGV) '
					sql += 'VALUES (\'' + props.asset.ID 
					sql += '\',\'' + nameInput 
					sql += '\',\'' + kgvInput 
					sql += '\')'
					console.log(sql)
					window.API.send(sql).then((result:any) => {
				console.log(result)
				window.API.send('SELECT * FROM assets').then((result:Asset[]) => {
					console.log(result)
					dispatch(assetsReducer.setAssets(result))
				});
			});
		}	
	}

	function deleteAsset(ID:number) {
		window.API.send('DELETE FROM assets WHERE ID = ' + ID).then((result:string) => {
			console.log(result)
			window.API.send('SELECT * FROM assets').then((result:Asset[]) => {
				console.log(result)
				dispatch(assetsReducer.setAssets(result))
			});
		});
	}

  return (
    <tr>
			<th>{props.i}</th>
      <td><input id={"dateInput_" + props.asset.ID} type="rext" value={nameInput} onChange={(e) => setNameInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
      <td><input id={"kgvInput" + props.asset.ID} type="text" value={kgvInput} onChange={(e) => setKGVInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
    </tr>
  );
}