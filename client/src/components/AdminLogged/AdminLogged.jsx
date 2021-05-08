import React from 'react';
import 'firebase/auth';
import { useUser } from 'reactfire';

function AdminLogged({ firebase }) {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    const userFire = useUser();
    console.log(userFire.data);
    if (!userData || userData.role !== 'admin') window.location = '/login';

    const handleClick = () => {
        if (window.confirm('¿Quiere cerrar sesión?')) {
            firebase.auth().signOut();
            localStorage.removeItem('userdata');
            window.location = '/login';
        }
    };

    return (
        <div>
            <h1>Bienvenido {userData.name} </h1>
            <button onClick={handleClick}>Cerrar Sesion</button>
        </div>
    );
}

export default AdminLogged;
