import React from 'react';
import styles from './navBar.module.css';
import logoNav from '../../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const myRef = useSelector((state) => state.plans.refContact);

    const scrollToBottom = () => {
        myRef.current.scrollIntoView();
    };

    return (
        <nav className={styles.bar}>
            <NavLink className={styles.logo} to='/'>
                <img className={styles.img} src={logoNav} alt='Logo.' />
            </NavLink>
            <div className={styles.buttonContainer}>
                <NavLink to='/faqs'>
                    <button className={styles.logB}>FAQS</button>
                </NavLink>
                <button className={styles.logB} onClick={scrollToBottom}>
                    Asociate
                </button>
                <NavLink to='/login' className={styles.navL}>
                    <button className={styles.login}>Entrar</button>
                </NavLink>
            </div>
        </nav>
    );
};
export default NavBar;
