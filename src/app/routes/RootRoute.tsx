import { useAppSelector, useAppDispatch } from './../hooks'

import * as appStateReducer from "./../store/appState/appState.reducer";

import { dataPath, filePath, appStateAPI } from '../../api/appStateAPI'
import TopNavBar from './components/TopNavBar/TopNavBar';
import AnalysisRoute from './routes/AnalysisRoute/AnalysisRoute';
import DatabaseRoute from './routes/DatabaseRoute/DatabaseRoute';
import DividendsRoute from './routes/DividendsRoute/DividendsRoute';

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

	if (result.database) {
		console.log("database: " + result.database);
		dispatch(appStateReducer.setDatabase(result.database))
	}
	else {
		console.log("database: not set");
	}

	return (
		<div id="RootRoute" className="h-screen">
			<TopNavBar />
			<div id="Title" className={`flex items-center p-2 bg-gradient-to-l from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%`}></div>
			
			<div id="rootContent" className="absolute flex flex-col w-full top-[65px] bottom-0">
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
		return(<DividendsRoute/>)
	else return (<AnalysisRoute/>)
}