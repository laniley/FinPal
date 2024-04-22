import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import sendAsync from './../renderer'

import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

import { setupStore } from './store';
const store = setupStore()

import RootRoute from './routes/RootRoute';

function App() {

	const [message, setMessage] = useState('ping');
  const [responses, setResponses] = useState([]);

	function send(data:any) {
		sendAsync(data).then((result) => setResponses([...responses, result]));
	}
		{/* <Provider store={store}>
			<RootRoute />
		</Provider> */}
	return (

		<div className="App">
            <header className="App-header">
                <h1>
                    Standalone application with Electron, React, and
                    SQLite stack.
                </h1>
            </header>
            <article>
                <p>
                    Say <i>ping</i> to the main process.
                </p>
                <input
                    type="text"
                    value={message}
                    onChange={({ target: { value } }) => setMessage(value)}
                />
                <button type="button" onClick={() => send(message)}>
                    Send
                </button>
                <br />
                <p>Main process responses:</p>
                <br />
                <pre>
                    {(responses && responses.join('\n')) ||
                        'the main process seems quiet!'}
                </pre>
            </article>
        </div>
	)
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App/>);