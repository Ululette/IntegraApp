import React from 'react';
import { Route } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import MedicNav from '../Medic/MedicNav/MedicNav';
import MedicPatients from '../Medic/MedicPatients/MedicPatients';
import PrescriptionsAndOrders from '../Medic/PrescriptionsAndOrders/PrescriptionsAndOrders';

function RoutesMedic() {
    const firebase = useFirebaseApp();
    return (
        <>
            <Route
                path='/:id/medic'
                render={() => <MedicNav firebase={firebase} />}
            />
            {/* <Route exact path='/:id/medic/patients' component={MedicPatients} /> */}
            <Route
                exact
                path='/:id/medic/prescriptions&orders'
                component={PrescriptionsAndOrders}
            />
        </>
    );
}

export default RoutesMedic;
