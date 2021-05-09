import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./store/root.store";
import './index.global.css';

ReactDOM.render(
		<Provider store={store}>
			<Suspense fallback={'Conectando...'}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Suspense>
		</Provider>,
	document.getElementById('root')
);