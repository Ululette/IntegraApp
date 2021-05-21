import React from 'react';
import { Route } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import MedicNav from '../Medic/MedicNav/MedicNav';
import PrescriptionsAndOrders from '../Medic/PrescriptionsAndOrders/PrescriptionsAndOrders';



function RoutesMedic() {
    const firebase = useFirebaseApp();
    return (
        <>
            <Route
                path='/:id/medic'
                render={() => <MedicNav firebase={firebase} />}
            />
            <Route
                exact
                path='/:id/medic/prescriptions&orders'
                render={() => <PrescriptionsAndOrders firebase={firebase} />}
            />
            {/*<Route exact path='/:id/admin/medics' component={AdminMedicTabs} />
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
            /> */}
        </>
    );
}

export default RoutesMedic;