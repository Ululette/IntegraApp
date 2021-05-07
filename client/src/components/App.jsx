import React from 'react';
import { Route } from 'react-router-dom';
import LandingP from './LandingP/LandingP.jsx';
import NavBar from './NavBar/navBar.jsx';

function App() {
    return (
        <React.Fragment>
            <Route path= "/" component={NavBar}/>
            <Route exact path='/' component={LandingP} />
        </React.Fragment>
    );
}

export default App;
