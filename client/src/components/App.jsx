import React from 'react';
import { Route } from 'react-router-dom';
import LandingP from './LandingP/LandingP.jsx';

function App() {
    return (
        <React.Fragment>
            <Route exact path='/' component={LandingP} />
        </React.Fragment>
    );
}

export default App;
