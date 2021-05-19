import React from 'react';

function AdminHome({ firebase }) {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    if (!userData || userData.role !== 'admin') window.location = '/login';

    return <h1>Hola admin</h1>;
}

export default AdminHome;
