import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';

function App() {
    return (
        <React.Fragment>
            <Route exact path='/' component={LandingPage} />
        </React.Fragment>
    );
}

export default App;


