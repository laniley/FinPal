import { useAppSelector, useAppDispatch } from './../../../hooks'

import {
	Colors,
} from '@blueprintjs/core';

import DividendList from './components/DividendList';
import DividendCalendar from './components/DividendCalendar';

export default function DividendsRoute() {

	const theme = useAppSelector(state => state.appState.theme)

  const initialState = {
  }

	const border = `1px solid ${theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1}`

	return (
		<div
			id="DividendsRoute"
			className={'absolute top-[0px] bottom-0 flex flex-col w-full ' + theme}>
			<div id="Main" className="flex p-3 overflow-auto">
				<div className="flex grow justify-center align-center">
					<DividendList />
					<DividendCalendar />
				</div>
			</div>
		</div>
	);
}