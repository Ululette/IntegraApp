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
import UserHome from './UserHome/UserHome.jsx';
import AdminAffiliate from './AdminAffiliate/AdminAffiliate.jsx';
import FormSpecialities from './Speciality/FormSpecialities.jsx';
import UserMedRec from './UserMedRec/UserMedRec.jsx';
import RenderPDF from './UserMedRec/RenderPDF';

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
                render={() => <AdminNav firebase={firebase} />}
            />
            <Route exact path='/:id/admin/medics' component={AdminMedic} />
            <Route
                exact
                path='/:id/admin/specialities'
                component={FormSpecialities}
            />
            <Route
                exact
                path='/:id/admin/affiliates'
                component={AdminAffiliate}
            />
            <Route exact path='/NewPlanP' component={NewPlanP} />
            <Route
                path='/:id/affiliate'
                render={() => <UserNav firebase={firebase} />}
            />
            <Route
                exact
                path='/:id/affiliate'
                render={() => <UserHome firebase={firebase} />}
            />
            <Route
                exact
                path='/:id/affiliate/medicalrecords'
                component={UserMedRec}
            />

            <Route
                exact
                path='/:id/affiliate/mymedicalrecords'
                component={UserMedRec}
            />
            <Route
                exact
                path='/:id/mymedicalrecords/pdf'
                component={RenderPDF}
            />
            <Route exact path='/asociate' component={ContactForm} />
            <Route exact path='/' component={Footer} />
        </>
    );
}

export default App;
