import React from 'react';
import styles from './AdminHome.module.css';

function AdminHome() {
    const adminData = JSON.parse(localStorage.getItem('admindata'));

    return (
        <div className={styles.container}>
            <h1>Hola {adminData.name}</h1>
        </div>
    );
}

export default AdminHome;
