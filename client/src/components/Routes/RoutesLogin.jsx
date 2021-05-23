import React from 'react';
import { Route } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import Login from '../Login-Ref/Login/Login.jsx';
// import AnimateJs from '../Login-Ref/TestFolder/AnimeJs.jsx';

function RoutesLogin() {
    const firebase = useFirebaseApp();
    return (
        <>
            <Route
                exact
                path='/login'
                render={() => <Login firebase={firebase} />}
            />
            {/* <Route exact path='/animatejs' component={AnimateJs} /> */}
        </>
    );
}

export default RoutesLogin;
