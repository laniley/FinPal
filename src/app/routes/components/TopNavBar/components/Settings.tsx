import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks'
import { appStateAPI } from '../../../../../api/appStateAPI'
import * as appState from "../../../../store/appState/appState.reducer";

import {
	Menu,
	MenuItem,
} from '@blueprintjs/core';

export default function Settings () {

	const dispatch = useAppDispatch();

	return (
		<Menu className={useAppSelector(state => state.appState.theme)}>
			<MenuItem text="Theme" icon="style" className={useAppSelector(state => state.appState.theme)}>
				<MenuItem 
					text="Light Mode" 
					active={useAppSelector(state => state.appState.theme) == 'bp5-body'}
					onClick={() => { 
						dispatch(appState.setTheme('bp5-body')) 
						appStateAPI.saveTheme('bp5-body')
					}} />
				<MenuItem 
					text="Dark Mode" 
					active={useAppSelector(state => state.appState.theme) == 'bp5-dark'} 
					onClick={() => {
						dispatch(appState.setTheme('bp5-dark'))
						appStateAPI.saveTheme('bp5-dark')
					}} />
			</MenuItem>
		</Menu>
	);
}