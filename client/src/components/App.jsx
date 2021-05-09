import React from 'react';
import { Route } from 'react-router-dom';
import LandingP from './LandingP/LandingP.jsx';
import ContactForm from './ContactForm/ContactForm.jsx';

function App() {
    return (
        <React.Fragment>
            <Route exact path='/' component={ContactForm} />
        </React.Fragment>
    );
}

export default App;
