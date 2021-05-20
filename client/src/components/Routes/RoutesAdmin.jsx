import React from 'react';
import { Route } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import AdminHome from '../Admin/AdminHome/AdminHome.jsx';
import AdminPlans from '../Admin/AdminPlans/AdminPlans.jsx';
import NewPlanP from '../Admin/NewPlanP/NewPlanP.jsx';
import AdminNav from '../Admin/AdminNav/AdminNav';
import AdminMedicTabs from '../Admin/AdminMedics/AdminMedics.jsx';
import AdminAffiliate from '../Admin/AdminAffiliate/AdminAffiliate.jsx';
import FormSpecialities from '../Admin/Speciality/FormSpecialities.jsx';
import AdminRegistration from '../Admin/AdminRegistration/AdminRegistration.jsx';
import FormUsers from '../Admin/AdminsUsers/FormUsers.jsx';
function RoutesAdmin() {
    const firebase = useFirebaseApp();
    return (
        <>
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
                path='/:id/admin/users'
                component={FormUsers}
            />
            <Route
                exact
                path='/:id/admin/plans'
                render={() => <AdminPlans firebase={firebase} />}
            />
            <Route exact path='/:id/admin/plans/addplan' component={NewPlanP} />
            <Route
                exact
                path='/:id/admin/newadmin'
                render={() => <AdminRegistration firebase={firebase} />}
            />
        </>
    );
}

export default RoutesAdmin;
