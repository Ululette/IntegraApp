import React from 'react';
import { Route } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';
import LandingP from './LandingP/LandingP.jsx';
import Login from './Login/Login.jsx';
import AdminLogged from './AdminLogged/AdminLogged.jsx';
import FaqsPage from './Faqs/FaqsPage.jsx';

function App() {
    const firebase = useFirebaseApp();
    return (
        <React.Fragment>
            <Route exact path='/' component={LandingP} />
            <Route path='/login' render={() => <Login firebase={firebase} />} />
            <Route
                path='/:id/admin'
                render={() => <AdminLogged firebase={firebase} />}
            />
            <Route path='/faqs' component={FaqsPage} />
        </React.Fragment>
    );
}

export default App;
