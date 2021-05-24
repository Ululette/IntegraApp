import React from 'react';
import { Route } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import Consult from '../Medic/Consults/Consult';
import MedicNav from '../Medic/MedicNav/MedicNav';

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
                path='/:id/medic/patients/:dnipatient/newconsultation'
                render={() => <Consult firebase={firebase} />}
            />
        </>
    );
}

export default RoutesMedic;
