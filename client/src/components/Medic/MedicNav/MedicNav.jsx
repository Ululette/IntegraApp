import React, { useState } from 'react';
import { useUser } from 'reactfire';
import { NavLink } from 'react-router-dom';
//Styles
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './MedicNav.module.css';

// Material-UI components
import {
    Button,
    Menu,
    MenuItem,
    Badge,
    CircularProgress,
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
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const drawerWidth = 260;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        position: 'relative',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        zIndex: 0,
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
    },
}));

function MedicNav({ firebase, window: windowMui }) {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    const medicData = JSON.parse(localStorage.getItem('medicData'));
    const userDataFirebase = useUser();

    if (!userDataFirebase.data && !medicData && !userData) {
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
                <NavLink to={`/${userData.dni}/medic/`} className={styles.link}>
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
                    to={`/${userData.dni}/medic/patiens`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <ListItem button>
                    <GroupAddIcon />
                        <ListItemText primary='Pacientes' />
                    </ListItem>
                </NavLink>
                <NavLink
                    to={`/${userData.dni}/medic/consult`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                <ListItem button>
                        <AssignmentIcon />
                        <ListItemText primary='Mis onsultas' />
                </ListItem>
                </NavLink>
                <NavLink
                    to={`/${userData.dni}/medic/prescriptions&orders`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <ListItem button>
                        <GroupIcon />
                        <ListItemText primary='Mis Recetas y Ordenes' />
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );

    if (
        (!userDataFirebase || !userDataFirebase.data) &&
        !medicData &&
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
                localStorage.removeItem('medicData');
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
                <a href={`/${userDataFirebase.uid}/medic/`}>
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
                        {/* <p>{`${medicData.name} ${medicData.lastname}`}</p> */}
                        <p>
                            Médico Ramon
                            {/* {medicData.root ? 'root' : 'moderador'} */}
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
        </div>
    );
}

export default MedicNav;