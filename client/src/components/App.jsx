import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import NavBar from './NavBar/navBar.jsx';
import InfoPlanes from './InfoPlans/InfoPlanes.jsx';
import Footer from './Footer/Footer.jsx';
import { useFirebaseApp } from 'reactfire';
import Login from './Login/Login.jsx';
import AdminHome from './AdminLogged/AdminHome.jsx';
import FaqsPage from './Faqs/FaqsPage.jsx';

function App() {
    const firebase = useFirebaseApp();
    return (
        <>
            <Route path='/' component={NavBar} />
            <Route exact path='/' component={LandingPage} />
            <Route path='/info' component={InfoPlanes} />
            <Route path='/faqs' component={FaqsPage} />
            <Route path='/login' render={() => <Login firebase={firebase} />} />
            <Route
                path='/:id/admin'
                render={() => <AdminHome firebase={firebase} />}
            />
            <Route path='/' component={Footer} />
        </>
    );
}

export default App;
