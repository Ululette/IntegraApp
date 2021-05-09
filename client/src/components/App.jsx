import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import NavBar from './NavBar/navBar.jsx';

function App() {
    return (
        <React.Fragment>
            <Route path='/' component={NavBar} />
            <Route exact path='/' component={LandingPage} />
        </React.Fragment>
    );
}

export default App;
