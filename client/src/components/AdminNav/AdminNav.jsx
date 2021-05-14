import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Button,
    Menu,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Badge,
    Slide,
} from '@material-ui/core';
import { useUser } from 'reactfire';

//Styles
import styles from './AdminNav.module.css';

//Icons
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import GroupIcon from '@material-ui/icons/Group';
import NoteIcon from '@material-ui/icons/Note';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import HealingIcon from '@material-ui/icons/Healing';

function AdminNav() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = React.useState(false);
    const userDataFirebase = useUser();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <NavLink to={`/${userDataFirebase}/admin/`}>
                    <img
                        src='../../assets/images/logo.png'
                        alt='Integra icon.'
                        className={styles.ppLogo}
                    />
                </NavLink>
                <section className={styles.userData}>
                    <Badge
                        badgeContent={2}
                        color='secondary'
                        className={styles.navIcon}
                    >
                        <MailIcon />
                    </Badge>
                    <article className={styles.namesContainer}>
                        <p>Nombre admin</p>
                        <p>Administrador</p>
                    </article>
                    <div>
                        <Button onClick={handleClick}>
                            <AccountCircleIcon
                                className={styles.profilePic}
                                width='45px'
                                height='45px'
                            />
                            <ExpandMoreIcon className={styles.expandMore} />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Mi perfil</MenuItem>
                            <MenuItem onClick={handleClose}>
                                Cerrar Sesion
                            </MenuItem>
                        </Menu>
                    </div>
                </section>
            </nav>
            <aside className={styles.aside}>
                <ul className={styles.buttonsContainer}>
                    <NavLink
                        to={`/${userDataFirebase}/admin/`}
                        className={styles.link}
                    >
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
                    <article>
                        <NoteIcon />
                        <li>Planes</li>
                    </article>
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
                        to={`/${userDataFirebase}/admin/affiliates`}
                        className={styles.link}
                    >
                        <GroupIcon />
                        <li>Socios</li>
                    </NavLink>
                    <NavLink
                        to={`/${userDataFirebase}/admin/medics`}
                        className={styles.link}
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
        </div>
    );
}

export default AdminNav;
