import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks'

import * as appStateReducer from "../../../store/appState/appState.reducer";
import * as projectReducer from "../../../store/project/project.reducer";

import './TopNavBar.css';

import Settings from './components/Settings';

import {
  Alignment,
  Button,
	Icon,
  Navbar,
  NavbarGroup,
  NavbarDivider,
	Position,
	Popover,
  Tab,
  Tabs,
  Tooltip,
} from '@blueprintjs/core';

const remote = require('@electron/remote')
const app = remote.app

export default function TopNavBar () {

	const appState = useAppSelector(state => state.appState)
	const project = useAppSelector(state => state.project)
	const dispatch = useAppDispatch();

	function selectedTabId() {
		if(appState.route == 'project')
			return project.route.current
		else
			return 'workspace'
	}

	return (
		
		<Navbar 
			id="TopNavBar" 
			className={'sticky top-0 px-2 py-0 ' + appState.theme + ' shadow[0_5px_5px_0_rgba(0, 0, 0, 0.13)]'}>
			<NavbarGroup id="TopNavBarGroupLeft" align={Alignment.LEFT}>
				{/* SETTINGS DROPDOWN */}
				<Popover content={<Settings />} position={Position.BOTTOM_RIGHT}>
					<Button id="TopNavBarSettings" minimal={true} icon="settings" />
				</Popover>

				<NavbarDivider />

				{/* SECTION TABS */}
				<Tabs
					id="TopNavTabs"
					onChange={ (navbarTabId) => handleTabChange(navbarTabId) }
					selectedTabId={selectedTabId()}
					animate={true}
					fill={true}>
						<Tab id="databaseTab" className="mr-0" >
							<Icon icon="database" className="mr-2 ml-2" /> Database
						</Tab>
						
						<NavbarDivider className="ml-0 mb-[15px]" />

						<Tab id="analysisTab">
							<Icon icon="timeline-line-chart" className="mr-2" /> Analysis
						</Tab>

						<NavbarDivider className="ml-0 mb-[15px]" />

						<Tab id="dividendTab">
							<Icon icon="calendar" className="mr-2" /> Dividends
						</Tab>
						
				</Tabs>
      </NavbarGroup>

			<NavbarGroup id="TopNavBarGroupRight" align={Alignment.RIGHT}>

				<NavbarDivider className="margin-0" />

				<Tooltip content="Quit FinPal" position={Position.BOTTOM}>
					<Button
						id="quit"
						minimal={true}
						icon="small-cross"
						onClick={() => remote.app.quit()}
					/>
				</Tooltip>
      </NavbarGroup>
    </Navbar>
  );

	function handleTabChange(navbarTabId:any) {
		console.log("Tab '" + navbarTabId + "' got clicked.")
		if( navbarTabId != project.route.current) {
			dispatch(projectReducer.changeCurrentProjectRoute(navbarTabId));
		}
		else {
			console.log("Current route is already \\" + project.route.current)
		}
	}
}