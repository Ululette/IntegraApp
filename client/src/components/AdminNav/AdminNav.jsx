import React, { useState } from 'react';
import { useUser } from 'reactfire';
import AdminAside from './AdminAside';
import { NavLink } from 'react-router-dom';
//Styles
import styles from './AdminNav.module.css';

// Material-UI components
import {
    Button,
    Menu,
    MenuItem,
    Badge,
    CircularProgress,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

//Icons
import MailIcon from '@material-ui/icons/Mail';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function AdminNav({ firebase }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const userDataFirebase = useUser();
    let adminData = localStorage.getItem('admindata');
    adminData = JSON.parse(adminData);
    let userData = localStorage.getItem('userdata');
    userData = JSON.parse(userData);

    if (
        (!userDataFirebase || !userDataFirebase.data) &&
        !adminData &&
        !userData
    ) {
        window.location = '/login';
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = async () => {
        if (window.confirm('¿Quiere cerrar sesión?')) {
            await firebase.auth().signOut();
            localStorage.removeItem('userdata');
            localStorage.removeItem('admindata');
            window.location = '/login';
        }
    };

    if (!userDataFirebase.data) return <CircularProgress />;

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <a href={`/${userDataFirebase.uid}/admin/`}>
                    <img
                        src='../../assets/images/logo.png'
                        alt='Integra icon.'
                        className={styles.ppLogo}
                    />
                </a>
                <section className={styles.userData}>
                    <Badge
                        badgeContent={2}
                        color='secondary'
                        className={styles.navIcon}
                    >
                        <MailIcon />
                    </Badge>
                    <article className={styles.namesContainer}>
                        <p>{`${adminData.name} ${adminData.lastname}`}</p>
                        <p>
                            Administrador{' '}
                            {adminData.root ? 'root' : 'moderador'}
                        </p>
                    </article>
                    <div>
                        <Button onClick={handleClick}>
                            {userData.avatar_url ? (
                                <img
                                    src={userData.avatar_url}
                                    alt='User profile pic.'
                                    width='45px'
                                    height='45px'
                                    className={styles.profilePic}
                                />
                            ) : (
                                <AccountCircleIcon
                                    className={styles.profilePic}
                                    width='45px'
                                    height='45px'
                                />
                            )}
                            <ExpandMoreIcon className={styles.expandMore} />
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Mi perfil</MenuItem>
                            <NavLink to={`/${userData.dni}/admin/newadmin`}>
                                {' '}
                                <MenuItem onClick={handleClose}>
                                    Agregar Administrador
                                </MenuItem>
                            </NavLink>

                            <MenuItem onClick={logout}>Cerrar Sesion</MenuItem>
                        </Menu>
                    </div>
                </section>
            </nav>
            <AdminAside />
        </div>
    );
}

export default AdminNav;
