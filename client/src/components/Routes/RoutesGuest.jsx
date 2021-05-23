import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from '../Guest/LandingPage/LandingPage.jsx';
import NavBar from '../Guest/NavBar/navBar.jsx';
import Footer from '../Guest/Footer/Footer.jsx';
import FaqsPage from '../Guest/Faqs/FaqsPage.jsx';
import ComparativaP from '../Guest/ComparativaP/ComparativaP.jsx';
import RegStepper from '../Guest/RegStepForm/RegStepper';

function RoutesGuest() {
    return (
        <>
            <Route exact path='/' component={NavBar} />
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/step' component={RegStepper} />
            <Route exact path='/faqs' component={FaqsPage} />
            <Route exact path='/plandetails' component={ComparativaP} />
            <Route exact path='/' component={Footer} />
        </>
    );
}

export default RoutesGuest;
