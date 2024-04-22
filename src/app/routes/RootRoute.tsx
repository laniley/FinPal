import { useAppSelector, useAppDispatch } from './../hooks'

import * as appStateReducer from "./../store/appState/appState.reducer";

import ProjectRoute from './routes/ProjectRoute/ProjectRoute';

import { dataPath, filePath, appStateAPI } from '../../api/appStateAPI'
import { TopNavBar } from '../components';
import AnalysisRoute from './routes/AnalysisRoute/AnalysisRoute';
import DatabaseRoute from './routes/DatabaseRoute/DatabaseRoute';

console.log("dataPath: " + dataPath)
console.log("filePath: " + filePath)

export default function RootRoute() {

	const dispatch = useAppDispatch();

	const result = appStateAPI.get()
	console.log("appState loaded: ", result)

	if (result.theme) {
		console.log("theme: " + result.theme);
		dispatch(appStateReducer.setTheme(result.theme))
	}
	else {
		console.log("theme: not set");
	}

	if (result.selectedTab) {
		console.log("selectedTab: " + result.selectedTab);
		dispatch(appStateReducer.changeSelectedTab(result.selectedTab))
	}
	else {
		console.log("selectedTab: not set");
	}

	return (
		<div id="RootRoute" className="h-screen">
			<TopNavBar />
			<div id="Title" className={`typewriter font-semibold flex items-center p-3 bg-gradient-to-l from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-2xl`}></div>
			<div id="rootContent" className="absolute flex flex-col w-full top-[100px] bottom-0">
				<Content />
			</div>
		</div>
	);
}

export function Content() {
	const route = useAppSelector(state => state.appState.selectedTab)
	if(route == 'databaseTab')
		return(<DatabaseRoute/>)
	else if(route == 'dividendsTab')
		return(<DatabaseRoute/>)
	else return (<AnalysisRoute/>)
}