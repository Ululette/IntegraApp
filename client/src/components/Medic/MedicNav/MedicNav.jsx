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
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

//Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// OUR COMPONENTS
import MedicHome from '../MedicHome/MedicHome.jsx';
import MedicPatients from '../MedicPatients/MedicPatients.jsx';
import PrescriptionsAndOrders from '../PrescriptionsAndOrders/PrescriptionsAndOrders.jsx';

import styles from './MedicNav.module.css';
import NotFound from '../../Status/NotFound.jsx';

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
    },
}));

function AdminNav({ firebase, window: windowMui }) {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const userData = JSON.parse(localStorage.getItem('userdata'));
    const medicData = JSON.parse(localStorage.getItem('medicdata'));
    const userDataFirebase = useUser();

    if (!userDataFirebase.data && !medicData && !userData) {
        window.location = '/login';
    }

    const MySwal = withReactContent(Swal);

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
                localStorage.removeItem('medicdata');
                window.location = '/login';
            }
        });
    };

    if (!userDataFirebase.data) return <CircularProgress />;

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List>
                <NavLink to={`/${userData.dni}/medic`} className={styles.link}>
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
                    to={`/${userData.dni}/medic/patients`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <ListItem button>
                        <GroupAddIcon />
                        <ListItemText primary='Mis pacientes' />
                    </ListItem>
                </NavLink>
                <NavLink
                    to={`/${userData.dni}/medic/consults`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <ListItem button>
                        <AssignmentIcon />
                        <ListItemText primary='Mis consultas' />
                    </ListItem>
                </NavLink>

                <NavLink
                    to={`/${userData.dni}/medic/prescriptions&orders`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <ListItem button>
                        <GroupIcon />
                        <ListItemText primary='Mis recetas y ordenes' />
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
                    <article className={styles.namesContainer}>
                        <p>{`${medicData.name} ${medicData.lastname}`}</p>
                        <p>
                            {`Mi especialidad: ${medicData.medical_specialities[0].name[0].toUpperCase()}${medicData.medical_specialities[0].name.substring(
                                1
                            )}`}
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
                {window.location.pathname === `/${userData.dni}/medic` ? (
                    <MedicHome medicData={medicData} />
                ) : window.location.pathname ===
                  `/${userData.dni}/medic/patients` ? (
                    <MedicPatients />
                ) : window.location.pathname ===
                  `/${userData.dni}/medic/prescriptions&orders` ? (
                    <PrescriptionsAndOrders />
                ) : (
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
