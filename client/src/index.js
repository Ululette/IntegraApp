import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import store from './store/root.store.js';
import firebaseConfig from './firebaseConfig.js';
import './index.global.css';

ReactDOM.render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <Provider store={store}>
            <Suspense fallback={'Conectando...'}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Suspense>
        </Provider>
    </FirebaseAppProvider>,
    document.getElementById('root')
);
