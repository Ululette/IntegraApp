import React, { useState } from 'react';
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

//Styles
import styles from './AdminNav.module.css';

//Icons
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import NoteIcon from '@material-ui/icons/Note';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PaymentIcon from '@material-ui/icons/Payment';
import ForumIcon from '@material-ui/icons/Forum';

import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

function AdminNav() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = React.useState(false);

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
                <section>
                    <img
                        src='../../assets/images/logo.png'
                        alt='Integra icon.'
                        className={styles.ppLogo}
                    />
                </section>
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
                    <article>
                        <HomeIcon />
                        <li>Inicio</li>
                    </article>
                    <article>
                        <FaceIcon />
                        <li>Mi cuenta</li>
                    </article>
                    <article>
                        <FavoriteBorderIcon />
                        <li>Mi carpeta medica</li>
                    </article>
                    <article>
                        <NoteIcon />
                        <li>Mi plan</li>
                    </article>
                    <article>
                        <DoneAllIcon />
                        <li>Mis autorizaciones</li>
                    </article>
                    <article>
                        <PhoneAndroidIcon />
                        <li>Mi credencial</li>
                    </article>
                    <article>
                        <AssignmentIcon />
                        <li>Cartilla medica</li>
                    </article>
                    <article>
                        <PaymentIcon />
                        <li>Pago online</li>
                    </article>
                    <article>
                        <ForumIcon />
                        <li>Contactanos</li>
                    </article>
                </ul>
            </aside>
        </div>
    );
}

export default AdminNav;
