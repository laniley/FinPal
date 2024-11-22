import { useAppSelector } from './../../../hooks'

import DividendList from './components/DividendList';
import DividendCalendar from './components/DividendCalendar';

export default function DividendsRoute() {

	return (
		<div id="DividendsRoute">
			<div id="Main" className="flex p-3 overflow-auto">
				<div className="flex grow justify-center align-center">
					<DividendList />
					<DividendCalendar />
				</div>
			</div>
		</div>
	);
}