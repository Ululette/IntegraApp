import React from 'react';
import RoutesAffiliate from './Routes/RoutesAffiliate.jsx';
import RoutesGuest from './Routes/RoutesGuest.jsx';
import RoutesAdmin from './Routes/RoutesAdmin.jsx';
import RoutesLogin from './Routes/RoutesLogin.jsx';

function App() {
    return (
        <>
            <RoutesGuest />
            <RoutesAffiliate />
            <RoutesAdmin />
            <RoutesLogin />
        </>
    );
}

export default App;
