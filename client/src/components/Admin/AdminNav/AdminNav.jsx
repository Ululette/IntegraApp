import React from 'react';
import { useUser } from 'reactfire';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { CircularProgress, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

//Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import GroupIcon from '@material-ui/icons/Group';
import NoteIcon from '@material-ui/icons/Note';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HealingIcon from '@material-ui/icons/Healing';

// OUR COMPONENTS
import AdminHome from '../AdminHome/AdminHome.jsx';
import AdminPlans from '../AdminPlans/AdminPlans.jsx';
// import NewPlanP from '../NewPlanP/NewPlanP.jsx';
import AdminMedicTabs from '../MedicsTable/AdminTabs.jsx';
import AdminAffiliate from '../AdminAffiliate/AdminAffiliate.jsx';
import FormSpecialities from '../Speciality/FormSpecialities.jsx';
import AdminRegistration from '../AdminRegistration/AdminRegistration.jsx';
import AplicationsTabs from '../Aplications/AplicationsTabs';
import NotFound from '../../Status/NotFound.jsx';
import FormUsers from '../AdminsUsers/FormUsers.jsx';

import styles from './AdminNav.module.css';
import AdminOrders from '../AdminOrders/AdminOrders.jsx';

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
            marginLeft: drawerWidth,
        },
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: '10rem',
        height: '75px',
        backgroundColor: '#00897b',
        zIndex:'2000'
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
        padding: '12px 0px 0px 0px',
    },
}));

function AdminNav({ firebase, window: windowMui }) {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const userData = JSON.parse(localStorage.getItem('userdata'));
    const adminData = JSON.parse(localStorage.getItem('admindata'));
    const userDataFirebase = useUser();

    if (!userDataFirebase.data && !adminData && !userData) {
        window.location = '/login';
    }

    const MySwal = withReactContent(Swal);

    const [anchorEl, setAnchorEl] = React.useState(null);

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

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List>
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
                <NavLink
                    to={`/${userData.dni}/admin/aplications`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <ListItem button>
                        <GroupAddIcon />
                        <ListItemText primary='Solicitudes' />
                    </ListItem>
                </NavLink>
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
                <NavLink
                    to={`/${userData.dni}/admin/orders`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <ListItem button>
                        <Badge
                            color='secondary'
                            badgeContent={2}
                            className={styles.notifications}
                        >
                            <DoneAllIcon />
                            <ListItemText primary='Autorizaciones' />
                        </Badge>
                    </ListItem>
                </NavLink>

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
                    to={`/${userData.dni}/admin/users`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <ListItem button>
                        <GroupIcon />
                        <ListItemText primary='Usuarios' />
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

    const container =
        windowMui !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position='fixed' className={classes.appBar}>
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
            </AppBar>
            <nav className={classes.drawer} aria-label='mailbox folders'>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {window.location.pathname === `/${userData.dni}/admin` ? (
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
                ) : window.location.pathname ===
                    `/${userData.dni}/admin/orders` ? (
                    <AdminOrders />
                ) : window.location.pathname ===
                    `/${userData.dni}/admin/users` ? (
                    <FormUsers />
                ) : window.location.pathname ===
                    `/${userData.dni}/admin/aplications` ? (
                    <AplicationsTabs />
                ) :
                    (
                        <NotFound />
                    )}
            </main>
        </div>
    );
}

AdminNav.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default AdminNav;
