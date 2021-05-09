import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../NavBar/navBar.module.css';

const Logb = () => {
    return (
        <div className={styles.buttonContainer}>
            <button className={styles.logB}>
                <a href='#contact'>Asociate</a>
            </button>
            <NavLink to='/login' className={styles.navL}>
                <button className={styles.logB}>Entrar</button>
            </NavLink>
        </div>
    );
};
export default Logb;
