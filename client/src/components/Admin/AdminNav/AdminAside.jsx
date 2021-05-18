import React from 'react';
import { NavLink } from 'react-router-dom';
import { Badge } from '@material-ui/core';

//Styles
import styles from './AdminNav.module.css';

//Icons
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import GroupIcon from '@material-ui/icons/Group';
import NoteIcon from '@material-ui/icons/Note';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import HealingIcon from '@material-ui/icons/Healing';

function AdminAside() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    return (
        <aside className={styles.aside}>
            <ul className={styles.buttonsContainer}>
                <NavLink to={`/${userData.dni}/admin/`} className={styles.link}>
                    <HomeIcon />
                    <li>Inicio</li>
                </NavLink>
                <article>
                    <FaceIcon />
                    <li>Mi cuenta</li>
                </article>
                <article>
                    <Badge
                        className={styles.notifications}
                        color='secondary'
                        badgeContent={2}
                    >
                        <GroupAddIcon />
                        <li>Solicitudes de asociacion</li>
                    </Badge>
                </article>
                <NavLink
                    to={`/${userData.dni}/admin/plans`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <NoteIcon />
                    <li>Planes</li>
                </NavLink>
                <article>
                    <Badge
                        className={styles.notifications}
                        color='secondary'
                        badgeContent={2}
                    >
                        <DoneAllIcon />
                        {/* Autorizacion de ordenes y recetas */}
                        <li>Autorizaciones</li>
                    </Badge>
                </article>
                <NavLink
                    to={`/${userData.dni}/admin/affiliates`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <GroupIcon />
                    <li>Socios</li>
                </NavLink>
                <NavLink
                    to={`/${userData.dni}/admin/medics`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <HealingIcon />
                    <li>Medicos</li>
                </NavLink>
                <article>
                    <Badge
                        className={styles.notifications}
                        color='secondary'
                        badgeContent={2}
                    >
                        <PhoneAndroidIcon className={styles.iconAside} />
                        <li>Consultas de socios</li>
                    </Badge>
                </article>
                <article>
                    <Badge
                        className={styles.notifications}
                        color='secondary'
                        badgeContent={2}
                    >
                        <AssignmentIcon />
                        <li>Tickets</li>
                    </Badge>
                </article>
            </ul>
        </aside>
    );
}

export default AdminAside;
