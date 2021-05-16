import React, { useState, useEffect } from 'react';
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
    CircularProgress,
} from '@material-ui/core';
import 'firebase/auth';
import supabase from '../../supabase.config.js';
import { useUser } from 'reactfire';
import { NavLink } from 'react-router-dom';

//Styles
import styles from './UserNav.module.css';

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

function UserNav({ firebase }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [familyGroup, setFamilyGroup] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userdata'));
    const affiliateData = JSON.parse(localStorage.getItem('affiliatedata'));
    const userFirebase = useUser();

    if (!userFirebase.data && !affiliateData && !userData) {
        window.location = '/login';
    }

    useEffect(() => {
        getFamilyGroup();
    }, []);

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

    const logout = async () => {
        if (window.confirm('¿Quiere cerrar sesión?')) {
            await firebase.auth().signOut();
            localStorage.removeItem('userdata');
            localStorage.removeItem('affiliatedata');
            window.location = '/login';
        }
    };

    const getFamilyGroup = async () => {
        let { data: familyGroup, error: fetchFamilyGroup } = await supabase
            .from('partners')
            .select('name, lastname')
            .eq('family_group', affiliateData.family_group);
        if (fetchFamilyGroup) {
            console.log(fetchFamilyGroup);
            alert(fetchFamilyGroup.message);
            return 'Error en fetchFamilyGroup';
        }
        setFamilyGroup(familyGroup);
    };

    if (familyGroup.length === 0) return <CircularProgress />;

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
                    <PhoneIcon
                        className={styles.navIcon}
                        onClick={handleClickOpen}
                    />
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClickClose}
                        className={styles.numberPhones}
                    >
                        <DialogContent className={styles.dialogContent}>
                            <LocalHospitalIcon />
                            <DialogContentText>
                                <p>URGENCIAS</p>
                                <p>Llama ya al 911</p>
                            </DialogContentText>
                            <PhoneInTalkIcon />
                            <DialogContentText>
                                <p>INFORMACION 24/7</p>
                                <p>0800-111-2333</p>
                                <p>0800-222-5555</p>
                            </DialogContentText>
                            <DateRangeIcon />
                            <DialogContentText>
                                <p>CENTRAL DE TURNOS</p>
                                <p>0800-123-2333</p>
                                <p>0800-555-5555</p>
                            </DialogContentText>
                            <ShoppingCartIcon />
                            <DialogContentText>
                                <p>VENTAS</p>
                                <p>0800-123-1234</p>
                                <p>0800-555-7877</p>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClickClose} color='primary'>
                                Cerrar
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <article className={styles.namesContainer}>
                        <p>{`${affiliateData.name} ${affiliateData.lastname}`}</p>
                        <p
                            className={styles.planName}
                        >{`${affiliateData.plan_name}`}</p>
                    </article>
                    <div>
                        <Button
                            aria-controls='simple-menu'
                            aria-haspopup='true'
                            onClick={handleClick}
                        >
                            {userData.avatar_url ? (
                                <img
                                    src={userData.avatar_url}
                                    alt='User profile pic.'
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
                            id='simple-menu'
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Mi perfil</MenuItem>
                            <MenuItem onClick={logout}>Cerrar Sesion</MenuItem>
                            <p onClick={handleClose}>Grupo Familiar</p>
                            {familyGroup.map((familiar, index) => (
                                <p key={`familiar-${index}`}>
                                    <strong>{`${familiar.name} ${familiar.lastname}`}</strong>
                                </p>
                            ))}
                        </Menu>
                    </div>
                </section>
            </nav>
            <aside className={styles.aside}>
                <ul className={styles.buttonsContainer}>
                    <NavLink to={`/${userData.dni}/affiliate`}>
                        <HomeIcon />
                        <li>Inicio</li>
                    </NavLink>
                    <article>
                        <FaceIcon />
                        <li>Mi cuenta</li>
                    </article>
                    <NavLink to={`/${userData.dni}/affiliate/mymedicalrecords`}>
                        <FavoriteBorderIcon />
                        <li>Mi carpeta medica</li>
                    </NavLink>
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
                    <NavLink to={`/${userData.dni}/affiliate/doctor`}>
                        <AssignmentIcon />
                        <li>Cartilla medica</li>
                    </NavLink>
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

export default UserNav;
