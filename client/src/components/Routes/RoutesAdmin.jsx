import React from 'react';
import { Route } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import AdminHome from '../Admin/AdminHome/AdminHome.jsx';
import AdminPlans from '../Admin/AdminPlans/AdminPlans.jsx';
import NewPlanP from '../Admin/NewPlanP/NewPlanP.jsx';
import AdminNav from '../Admin/AdminNav/AdminNav';
import AdminMedicTabs from '../Admin/MedicsTable/AdminTabs.jsx';
import AdminAffiliate from '../Admin/AdminAffiliate/AdminAffiliate.jsx';
import FormSpecialities from '../Admin/Speciality/FormSpecialities.jsx';
import AdminRegistration from '../Admin/AdminRegistration/AdminRegistration.jsx';
import AdminOrders from '../Admin/AdminOrders/AdminOrders.jsx'
function RoutesAdmin() {
    const firebase = useFirebaseApp();
    return (
        <>
            <Route
                path='/:id/admin'
                render={() => <AdminNav firebase={firebase} />}
            />
            <Route
                exact
                path='/:id/admin'
                render={() => <AdminHome firebase={firebase} />}
            />
            <Route exact path='/:id/admin/medics' component={AdminMedicTabs} />
            <Route
                exact
                path='/:id/admin/specialities'
                component={FormSpecialities}
            />
            <Route
                exact
                path='/:id/admin/affiliates'
                render={() => <AdminAffiliate firebase={firebase} />}
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
               <Route exact path='/:id/admin/orders' component={AdminOrders} />
        </>
    );
}

export default RoutesAdmin;
