import React from 'react';
import ReactDOM from 'react-dom';
import './index.global.css';
import App from './components/App.jsx';
import { BrowserRouter } from 'react-router-dom';
//import { Provider } from 'react-redux';
//import store from "./store/index";

ReactDOM.render(
    <React.StrictMode>
    	{/* <Provider store={store}>*/}
    	 <BrowserRouter> 
    	    <App />
    	 </BrowserRouter>
    	{/*</Provider> */}
    </React.StrictMode>,
    document.getElementById('root')
);