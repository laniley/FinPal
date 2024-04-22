import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

import { setupStore } from './store';
const store = setupStore()

import RootRoute from './routes/RootRoute';

function App() {
	return (
		<Provider store={store}>
			<RootRoute />
		</Provider>
	)
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App/>);