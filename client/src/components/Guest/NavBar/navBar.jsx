import React from 'react';
import styles from './navBar.module.css';
import logoNav from '../../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

const NavBar = ({ history }) => {
    const location = history.location.pathname;

    return location === '/login' || location.includes('admin') ? null : (
        <nav className={styles.bar}>
            <NavLink className={styles.logo} to='/'>
                <img className={styles.img} src={logoNav} alt='Logo.' />
            </NavLink>
            <div className={styles.buttonContainer}>
                <NavLink to='/faqs'>
                    <button className={styles.logB}>FAQS</button>
                </NavLink>
                <button className={styles.logB}>
                    <a href='#contact'>Asociate</a>
                </button>
                <NavLink to='/login' className={styles.navL}>
                    <button className={styles.login}>Entrar</button>
                </NavLink>
            </div>
        </nav>
    );
};
export default NavBar;
