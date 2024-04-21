import { useAppSelector, useAppDispatch } from './../hooks'

import * as appStateReducer from "./../store/appState/appState.reducer";

import WelcomeRoute from './routes/WelcomeRoute/WelcomeRoute';
import WorkspaceRoute from './routes/WorkspaceRoute/WorkspaceRoute';
import ProjectRoute from './routes/ProjectRoute/ProjectRoute';

import { dataPath, filePath, appStateAPI } from '../../api/appStateAPI'
import { TopNavBar } from '../components';

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

	if (result.route) {
		console.log("route: " + result.route);
		dispatch(appStateReducer.setRoute(result.route))
	}
	else {
		console.log("route: not set");
	}

	return (
		<Content />
	);
}

export function Content() {
	const theme = useAppSelector(state => state.appState.theme)
	return(
		<div id="RootRoute" className="h-screen">
			<TopNavBar />
			<div id="Title" className={`typewriter font-semibold flex items-center p-3 bg-gradient-to-l from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-2xl`}></div>
			<div id="rootContent" className="absolute flex flex-col w-full top-[100px] bottom-0">
				<div><SubRoute /></div>
			</div>
		</div>
	)
}

export function SubRoute() {

	const root_route = useAppSelector(state => state.appState.route)
	
	return <ProjectRoute />
/*
	if(root_route == 'project' && current_project) {
		return <ProjectRoute />
	}
	else if (workspace_path) {
		return <WorkspaceRoute />
	}
	else {
		return <WelcomeRoute />
	}*/
}