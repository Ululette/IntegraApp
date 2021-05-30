import React from 'react';
import { useUser } from 'reactfire';
import { NavLink, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import supabase from '../../../supabase.config';

import Popover from '@material-ui/core/Popover';
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
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { CircularProgress, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';

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
import ClearIcon from '@material-ui/icons/Clear';

// OUR COMPONENTS
import AdminHome from '../AdminHome/AdminHome.jsx';
import AdminPlans from '../AdminPlans/AdminPlans.jsx';
// import NewPlanP from '../NewPlanP/NewPlanP.jsx';
import AdminMedicTabs from '../MedicsTable/AdminTabs.jsx';
import AdminAffiliate from '../AdminAffiliate/AdminAffiliate.jsx';
import FormSpecialities from '../Speciality/FormSpecialities.jsx';
import AdminRegistration from '../AdminRegistration/AdminRegistration.jsx';
import NotFound from '../../Status/NotFound.jsx';
import FormUsers from '../AdminsUsers/FormUsers.jsx';

import styles from './AdminNav.module.css';
import AdminOrders from '../AdminOrders/AdminOrders.jsx';
import { ContactSupport, Send, ThumbDown } from '@material-ui/icons';
import NotificationsIcon from '@material-ui/icons/Notifications';

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
    const [notifications, setNotifications] = React.useState('');

    const userData = JSON.parse(localStorage.getItem('userdata'));
    const adminData = JSON.parse(localStorage.getItem('admindata'));
    const userDataFirebase = useUser();

    if (!userDataFirebase.data && !adminData && !userData) {
        window.location = '/login';
    }

    const MySwal = withReactContent(Swal);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorPop, setAnchorPop] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickPop = (event) => {
        setAnchorPop(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClosePop = () => {
        setAnchorPop(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const openPop = Boolean(anchorPop);
    const id = openPop ? 'simple-popover' : undefined;

    const fetchNotifications = async () => {
        let { data: notificationsGuest } = await supabase
            .from('guest_contacts')
            .select('*')
            .eq('seen', false);
        let { data: notificationsDowns } = await supabase
            .from('familiar_downs_request')
            .select('*')
            .match({ status: 'pendiente', seen: false });
        let { data: notificationsForms } = await supabase
            .from('medical_records')
            .select('*, partners(name, lastname)')
            .eq('seen', false);

        setNotifications(
            []
                .concat(
                    notificationsGuest,
                    notificationsDowns,
                    notificationsForms
                )
                .filter((el) => el !== null)
        );
    };

    React.useEffect(() => {
        fetchNotifications();
    }, []);

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

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List>
                <NavLink
                    to={`/${userData.dni}/admin/dashboard`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
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
                        color='secondary'
                        badgeContent={2}
                        className={styles.notifications}
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

    const handleSeenNotification = async (el) => {
        const table = el.hasOwnProperty('phone_number')
            ? 'guest_contacts'
            : el.hasOwnProperty('familiar_name')
            ? 'familiar_downs_request'
            : 'medical_records';
        await supabase.from(table).update({ seen: true }).eq('id', el.id);
        await fetchNotifications();
    };

    if (!userDataFirebase.data && notifications === '')
        return <CircularProgress />;

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
                <a href={`/${userData.dni}/admin`}>
                    <img
                        src='../../assets/images/logo.png'
                        alt='Integra icon.'
                        className={styles.ppLogo}
                    />
                </a>
                <section className={styles.userData}>
                    <Badge
                        badgeContent={notifications.length}
                        color='secondary'
                        className={styles.navIcon}
                    >
                        <NotificationsIcon
                            aria-describedby={id}
                            variant='contained'
                            color='white'
                            onClick={handleClickPop}
                        />
                        <Popover
                            id={id}
                            open={openPop}
                            anchorEl={anchorPop}
                            onClose={handleClosePop}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <List>
                                {notifications.map((el, idx) => (
                                    <a
                                        href={`/${userData.dni}/admin/aplications`}
                                        className={styles.link}
                                    >
                                        <ListItem
                                            button
                                            key={`notification-${idx}`}
                                        >
                                            <ListItemIcon>
                                                {el.hasOwnProperty(
                                                    'phone_number'
                                                ) ? (
                                                    <ContactSupport />
                                                ) : el.hasOwnProperty(
                                                      'familiar_name'
                                                  ) ? (
                                                    <ThumbDown />
                                                ) : (
                                                    <Send />
                                                )}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    el.hasOwnProperty(
                                                        'phone_number'
                                                    )
                                                        ? `Un interesado ${el.name} se ha comunicado con la prepaga.`
                                                        : el.hasOwnProperty(
                                                              'familiar_name'
                                                          )
                                                        ? `El socio titular con ${el.titular_dni} ha solicitado la baja de un familiar.`
                                                        : `El interesado ${el.partner_dni} ha enviado el formulario y queda pendiente de revision.`
                                                }
                                            />
                                            <ListItemIcon
                                                button
                                                onClick={() =>
                                                    handleSeenNotification(el)
                                                }
                                            >
                                                <ClearIcon />
                                            </ListItemIcon>
                                        </ListItem>
                                    </a>
                                ))}
                            </List>
                        </Popover>
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
                    <Redirect to={`/${userData.dni}/admin/dashboard`} />
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
                  `/${userData.dni}/admin/dashboard` ? (
                    <AdminHome />
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
