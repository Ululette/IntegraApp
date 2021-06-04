import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from '../Guest/LandingPage/LandingPage.jsx';
import NavBar from '../Guest/NavBar/navBar.jsx';
import Footer from '../Guest/Footer/Footer.jsx';
import About from '../Guest/About/About';
import FaqsPage from '../Guest/Faqs/FaqsPage.jsx';
import ComparativaP from '../Guest/ComparativaP/ComparativaP.jsx';
import RegStepper from '../Guest/RegStepForm/RegStepper';
function RoutesGuest() {
    return (
        <>
            <Route
                exact
                path={['/', '/faqs', '/plandetails',"/step"]}
                component={NavBar}
            />
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/step' component={RegStepper} />
            <Route exact path='/faqs' component={FaqsPage} />
            <Route exact path='/plandetails' component={ComparativaP} />
            <Route exact path='/about' component={About} />
            <Route
                exact
                path={['/', '/faqs', '/plandetails']}
                component={Footer}
            />
        </>
    );
}

export default RoutesGuest;
