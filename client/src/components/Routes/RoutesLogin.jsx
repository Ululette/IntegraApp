import React from 'react';
import { Route } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import Login from '../Login-Ref/Login/Login.jsx';

function RoutesLogin() {
    const firebase = useFirebaseApp();
    return (
        <>
            <Route
                exact
                path='/login'
                render={() => <Login firebase={firebase} />}
            />
        </>
    );
}

export default RoutesLogin;
