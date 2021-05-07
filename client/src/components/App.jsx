import React from 'react';
import { Route } from 'react-router-dom';
import LandingP from './LandingP/LandingP.jsx';
import ContactFormGuest from './contact_form_guest/contact_form_guest.jsx';

function App() {
    return (
        <React.Fragment>
            <Route exact path='/' component={ContactFormGuest} />
        </React.Fragment>
    );
}

export default App;
