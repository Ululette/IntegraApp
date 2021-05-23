import React from 'react';
import { Route } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import MedicNav from '../Medic/MedicNav/MedicNav';

function RoutesMedic() {
    const firebase = useFirebaseApp();
    return (
        <>
            <Route
                path='/:id/medic'
                render={() => <MedicNav firebase={firebase} />}
            />
        </>
    );
}

export default RoutesMedic;
