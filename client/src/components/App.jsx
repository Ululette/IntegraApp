import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import NavBar from './NavBar/navBar.jsx';
import Footer from './Footer/Footer.jsx';
import { useFirebaseApp } from 'reactfire';
import Login from './Login/Login.jsx';
import AdminHome from './AdminHome/AdminHome.jsx';
import AdminPlans from './AdminPlans/AdminPlans.jsx';
import FamilyMembers from './UserFamilyMembers/FamilyMembers.jsx';
import FaqsPage from './Faqs/FaqsPage.jsx';
import ContactForm from './ContactForm/ContactForm.jsx';
import NewPlanP from './NewPlanP/NewPlanP.jsx';
import AdminNav from './AdminNav/AdminNav';
import UserNav from './UserNav/UserNav.jsx';
import AdminMedicTabs from './MedicsTable/AdminTabs';
import UserHome from './UserHome/UserHome.jsx';
import AdminAffiliate from './AdminAffiliate/AdminAffiliate.jsx';
import FormSpecialities from './Speciality/FormSpecialities.jsx';
import UserMedRec from './UserMedRec/UserMedRec.jsx';
import RenderPDF from './UserMedRec/RenderPDF';
import AdminRegistration from './AdminRegistration/AdminRegistration.jsx';
import MedicalDirectory from './AffiliateDoctors/AffiliateDoctors';
import ComparativaP from './ComparativaP/ComparativaP.jsx';

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
            <Route exact path='/:id/admin' component={AdminHome} />
            <Route exact path='/:id/admin/medics' component={AdminMedicTabs} />
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
            <Route
                exact
                path='/:id/admin/plans'
                render={() => <AdminPlans firebase={firebase} />}
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
                path='/:id/affiliate/familymembers'
                component={FamilyMembers}
            />
            <Route
                exact
                path='/:id/affiliate/mymedicalrecords'
                component={UserMedRec}
            />
            <Route
                exact
                path='/:id/mymedicalrecords/pdf'
                render={() => <RenderPDF firebase={firebase} />}
            />
            <Route exact path='/asociate' component={ContactForm} />
            <Route
                exact
                path='/:id/affiliate/doctor'
                component={MedicalDirectory}
            />
            <Route
                exact
                path='/:id/admin/newadmin'
                render={() => <AdminRegistration firebase={firebase} />}
            />
            <Route exact path='/' component={Footer} />
            <Route exact path='/ComparativaP' component={ComparativaP} />
            <Route path='/' component={Footer} />
        </>
    );
}

export default App;
