import { useAppSelector, useAppDispatch } from './../../../../hooks'

import * as assetCreationReducer from '../../../../store/assetCreation/assetCreation.reducer';

export default function AnalysisRoute() {

	const dispatch = useAppDispatch();
	const nameInput = useAppSelector(state => state.assetCreation.nameInput)
	const kgvInput = useAppSelector(state => state.assetCreation.kgvInput)

	return (
    <tr>
      <td>*</td>
      <td><input id="nameInput" type="text" value={nameInput} onChange={(e) => dispatch(assetCreationReducer.setNameInput(e.target.value))} onBlur={() => { dispatch(assetCreationReducer.handleNameInputGotTouched()) }} /></td>
      <td><input id="kgvInput" type="text" value={kgvInput} onChange={(e) => dispatch(assetCreationReducer.setKGVInput(e.target.value))} onBlur={() => { dispatch(assetCreationReducer.handleKGVInputGotTouched()) }} /></td>
    </tr>
	);
}