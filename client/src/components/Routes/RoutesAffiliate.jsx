import React from 'react';
import { Route } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import UserNav from '../Affiliate/UserNav/UserNav.jsx';

function RoutesAffiliate() {
    const firebase = useFirebaseApp();
    return (
        <>
            <Route
                path='/:id/affiliate'
                render={() => <UserNav firebase={firebase} />}
            />
        </>
    );
}

export default RoutesAffiliate;
