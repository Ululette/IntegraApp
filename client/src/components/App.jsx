import React from 'react';
import { Route } from 'react-router-dom';
import InfoPlanes from './InfoPlans/InfoPlanes.jsx';
import LandingP from './LandingP/LandingP.jsx';

function App() {
    return (
        <React.Fragment>
            <Route exact path='/' component={LandingP} />
            <Route path='/' component={InfoPlanes} />
        </React.Fragment>
    );
}

export default App;
