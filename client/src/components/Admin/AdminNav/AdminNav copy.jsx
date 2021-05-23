import React, { useState } from 'react';
import { useUser } from 'reactfire';
import { NavLink } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import AdminHome from '../AdminHome/AdminHome.jsx';
import AdminPlans from '../AdminPlans/AdminPlans.jsx';
// import NewPlanP from '../NewPlanP/NewPlanP.jsx';
import AdminMedicTabs from '../MedicsTable/AdminTabs.jsx';
import AdminAffiliate from '../AdminAffiliate/AdminAffiliate.jsx';
import FormSpecialities from '../Speciality/FormSpecialities.jsx';
import AdminRegistration from '../AdminRegistration/AdminRegistration.jsx';

//Styles
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './AdminNav.module.css';

// Material-UI components
import {
    Button,
    Menu,
    MenuItem,
    Badge,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

//Icons
import MailIcon from '@material-ui/icons/Mail';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import GroupIcon from '@material-ui/icons/Group';
import NoteIcon from '@material-ui/icons/Note';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HealingIcon from '@material-ui/icons/Healing';
import MenuIcon from '@material-ui/icons/Menu';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const drawerWidth = 260;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        zIndex: 0,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        zIndex: 3,
    },
}));

function AdminNav({ firebase, window: windowMui }) {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    const adminData = JSON.parse(localStorage.getItem('admindata'));
    const userDataFirebase = useUser();

    if (!userDataFirebase.data && !adminData && !userData) {
        this.window.location = '/login';
    }

    const MySwal = withReactContent(Swal);
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const container =
        windowMui !== undefined ? () => windowMui().document.body : undefined;

    const drawer = (
        <div className={styles.asidebar}>
            <div className={classes.toolbar} />
            <List className={styles.listitems}>
                <NavLink to={`/${userData.dni}/admin`} className={styles.link}>
                    <ListItem button>
                        <HomeIcon />
                        <ListItemText primary='Inicio' />
                    </ListItem>
                </NavLink>
                <ListItem button>
                    <FaceIcon />
                    <ListItemText primary='Mi cuenta' />
                </ListItem>
                <ListItem button>
                    <Badge
                        className={styles.notifications}
                        color='secondary'
                        badgeContent={2}
                    >
                        <GroupAddIcon />
                        <ListItemText primary='Solicitudes de asociacion' />
                    </Badge>
                </ListItem>
                <NavLink
                    to={`/${userData.dni}/admin/plans`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <ListItem button>
                        <NoteIcon />
                        <ListItemText primary='Planes' />
                    </ListItem>
                </NavLink>

                <ListItem button>
                    <Badge
                        className={styles.notifications}
                        color='secondary'
                        badgeContent={2}
                    >
                        <DoneAllIcon />
                        <ListItemText primary='Autorizaciones' />
                    </Badge>
                </ListItem>
                <NavLink
                    to={`/${userData.dni}/admin/affiliates`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <ListItem button>
                        <GroupIcon />
                        <ListItemText primary='Socios' />
                    </ListItem>
                </NavLink>
                <NavLink
                    to={`/${userData.dni}/admin/medics`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <ListItem button>
                        <HealingIcon />
                        <ListItemText primary='Medicos' />
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );

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

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logout = async () => {
        setAnchorEl(null);
        MySwal.fire({
            title: '¿Quiere cerrar sesión?',
            icon: 'question',
            showConfirmButton: true,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            reverseButtons: true,
            confirmButtonText: 'Cerrar sesion',
            cancelButtonText: 'Cancelar',
        }).then(async (res) => {
            if (res.isConfirmed) {
                await firebase.auth().signOut();
                localStorage.removeItem('userdata');
                localStorage.removeItem('admindata');
                window.location = '/login';
            }
        });
    };

    if (!userDataFirebase.data) return <CircularProgress />;

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
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
                            Administrador
                            {adminData.root ? ' root' : ' moderador'}
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
                            <NavLink
                                to={`/${userData.dni}/admin/newadmin`}
                                className={styles.newAdmin}
                            >
                                <MenuItem onClick={handleClose}>
                                    Agregar Administrador
                                </MenuItem>
                            </NavLink>

                            <MenuItem onClick={logout}>Cerrar Sesion</MenuItem>
                        </Menu>
                    </div>
                </section>
            </nav>
            <Hidden smUp implementation='css'>
                <Drawer
                    container={container}
                    variant='temporary'
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation='css'>
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant='permanent'
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
            {/* ACA VAN LOS COMPONENTES DEL ADMIN */}
            <main className={classes.content}>
                <div className={classes.toolbar}></div>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet.
                    Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed
                    adipiscing. Amet nisl suscipit adipiscing bibendum est
                    ultricies integer quis. Cursus euismod quis viverra nibh
                    cras. Metus vulputate eu scelerisque felis imperdiet proin
                    fermentum leo. Mauris commodo quis imperdiet massa
                    tincidunt. Cras tincidunt lobortis feugiat vivamus at augue.
                    At augue eget arcu dictum varius duis at consectetur lorem.
                    Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                {/* {window.location.pathname === `/${userData.dni}/admin` ? (
                    <AdminHome firebase={firebase} />
                ) : window.location.pathname ===
                  `/${userData.dni}/admin/medics` ? (
                    <AdminMedicTabs />
                ) : window.location.pathname ===
                  `/${userData.dni}/admin/specialities` ? (
                    <FormSpecialities />
                ) : window.location.pathname ===
                  `/${userData.dni}/admin/affiliates` ? (
                    <AdminAffiliate firebase={firebase} />
                ) : window.location.pathname ===
                  `/${userData.dni}/admin/plans` ? (
                    <AdminPlans firebase={firebase} />
                ) : window.location.pathname ===
                  `/${userData.dni}/admin/newadmin` ? (
                    <AdminRegistration firebase={firebase} />
                ) : null} */}
            </main>
        </div>
    );
}

export default AdminNav;
