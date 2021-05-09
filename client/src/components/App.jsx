import React from 'react';
import { Route } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import LandingP from './LandingP/LandingP.jsx';
import Login from './Login/Login.jsx';
import AdminHome from './AdminLogged/AdminHome.jsx';
import FaqsPage from './Faqs/FaqsPage.jsx';

function App() {
    const firebase = useFirebaseApp();
    return (
        <>
            <Route exact path='/' component={LandingP} />
            <Route path='/login' render={() => <Login firebase={firebase} />} />
            <Route
                path='/:id/admin'
                render={() => <AdminHome firebase={firebase} />}
            />
            <Route path='/faqs' component={FaqsPage} />
        </>
    );
}

export default App;
