import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import NavBar from './NavBar/navBar.jsx';
import InfoPlanes from './InfoPlans/InfoPlanes.jsx';
import Footer from './Footer/Footer.jsx';

function App() {
    return (
        <React.Fragment>
            <Route path='/' component={NavBar} />
            <Route exact path='/' component={LandingPage} />
            <Route path='/info' component={InfoPlanes} />
            <Route path='/' component={Footer} />
        </React.Fragment>
    );
}

export default App;
