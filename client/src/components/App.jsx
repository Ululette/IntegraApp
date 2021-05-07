import React from 'react';
import { Route } from 'react-router-dom';
import LandingP from './LandingP/LandingP.jsx';
import Login from './Login/Login.jsx';
import FaqsPage from './Faqs/FaqsPage.jsx';

function App() {
    return (
        <React.Fragment>
            <Route exact path='/' component={LandingP} />
            <Route path='/login' component={Login} />
            <Route path='/faqs' component={FaqsPage} />
        </React.Fragment>
    );
}

export default App;
