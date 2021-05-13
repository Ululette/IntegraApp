import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import NavBar from './NavBar/navBar.jsx';
import Footer from './Footer/Footer.jsx';
import { useFirebaseApp } from 'reactfire';
import Login from './Login/Login.jsx';
import AdminHome from './AdminHome/AdminHome.jsx';
import FaqsPage from './Faqs/FaqsPage.jsx';
import ContactForm from './ContactForm/ContactForm.jsx';
import NewPlanP from './NewPlanP/NewPlanP.jsx';
import AdminNav from './AdminNav/AdminNav';
import UserNav from './UserNav/UserNav.jsx';
import AdminMedic from './AdminMedics/AdminMedics';

function App() {
    const firebase = useFirebaseApp();
    return (
        <>
            <Route exact path='/' component={NavBar} />
            <Route exact path='/' component={LandingPage} />
            <Route path='/faqs' component={FaqsPage} />
            <Route path='/login' render={() => <Login firebase={firebase} />} />
            <Route
                path='/:id/admin'
                render={() => <AdminHome firebase={firebase} />}
            />
            <Route path='/admin' component={AdminNav} />
            <Route exact path='/admin/listmedic' component={AdminMedic} />
            <Route exact path='/asociate' component={ContactForm} />
            <Route exact path='/NewPlanP' component={NewPlanP} />
            <Route exact path='/' component={Footer} />
        </>
    );
}

export default App;
