import React from 'react';
import { Route } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import AdminNav from '../Admin/AdminNav/AdminNav';
import AplicationsTabs from '../Admin/Aplications/AplicationsTabs';
function RoutesAdmin() {
    const firebase = useFirebaseApp();
    return (
        <>
            <Route
                path='/:id/admin'
                render={() => <AdminNav firebase={firebase} />}
            />
            <Route
                path='/:id/admin/aplications'
                render={() => <AplicationsTabs firebase={firebase} />}
            />
        </>
    );
}

export default RoutesAdmin;
