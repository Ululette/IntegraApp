import React from 'react';
import { Route } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import Consult from '../Medic/Consult';

function RoutesMedic() {
    const firebase = useFirebaseApp();
    return (
        <>
            <Route
                path='/:id/medic'
                render={() => <Consult firebase={firebase} />}
            />
        </>
    );
}

export default RoutesMedic;