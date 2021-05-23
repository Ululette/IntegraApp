import React, { useState, useEffect } from 'react';
import {
    Button,
    Menu,
    MenuItem,
    Dialog,
    List,
    DialogActions,
    DialogContent,
    DialogContentText,
    Badge,
    Slide,
    ListItem,
    ListItemText,
    CircularProgress,
    Divider,
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import 'firebase/auth';
import supabase from '../../../supabase.config.js';
import { useUser } from 'reactfire';
import { NavLink } from 'react-router-dom';

//Styles
import styles from './UserNav.module.css';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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
import MenuIcon from '@material-ui/icons/Menu';
import GroupIcon from '@material-ui/icons/Group';

import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

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

function UserNav({ firebase, window: windowMui }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [familyGroup, setFamilyGroup] = useState([]);
    const userData = JSON.parse(localStorage.getItem('userdata'));
    const affiliateData = JSON.parse(localStorage.getItem('affiliatedata'));
    const userFirebase = useUser();
    const MySwal = withReactContent(Swal);
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    if (!userFirebase.data && !affiliateData && !userData) {
        window.location = '/login';
    }

    const container =
        windowMui !== undefined ? () => windowMui().document.body : undefined;

    useEffect(() => {
        getFamilyGroup();
        //eslint-disable-next-line
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
                localStorage.removeItem('affiliatedata');
                window.location = '/login';
            }
        });
    };

    const drawer = (
        <div className={styles.asidebar}>
            <div className={classes.toolbar} />
            <List className={styles.listitems}>
                <NavLink
                    to={`/${userData.dni}/affiliate/`}
                    className={styles.link}
                >
                    <ListItem button>
                        <HomeIcon />
                        <ListItemText primary='Inicio' />
                    </ListItem>
                </NavLink>
                <NavLink
                    to={`/${userData.dni}/affiliate/profile`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <ListItem button>
                        <FaceIcon />
                        <ListItemText primary='Mi cuenta' />
                    </ListItem>
                </NavLink>
                <NavLink
                    to={`/${userData.dni}/affiliate/familymembers`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <ListItem button>
                        <GroupIcon />
                        <ListItemText primary='Mi grupo familiar' />
                    </ListItem>
                </NavLink>
                <NavLink
                    to={`/${userData.dni}/affiliate/mymedicalrecords`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <ListItem button>
                        <FavoriteBorderIcon />
                        <ListItemText primary='Mi carpeta medica' />
                    </ListItem>
                </NavLink>

                <ListItem button>
                    <NoteIcon />
                    <ListItemText primary='Mi plan' />
                </ListItem>

                <ListItem button>
                    <DoneAllIcon />
                    <ListItemText primary='Mis autorizaciones' />
                </ListItem>

                <ListItem button>
                    <PhoneAndroidIcon />
                    <ListItemText primary='Mi credencial' />
                </ListItem>
                <NavLink
                    to={`/${userData.dni}/affiliate/doctor`}
                    className={styles.link}
                    activeClassName={styles.activeLink}
                >
                    <ListItem button>
                        <AssignmentIcon />
                        <ListItemText primary='Cartilla medica' />
                    </ListItem>
                </NavLink>
                <ListItem button>
                    <PaymentIcon />
                    <ListItemText primary='Pago online' />
                </ListItem>
                <ListItem button>
                    <ForumIcon />
                    <ListItemText primary='Contactanos' />
                </ListItem>
            </List>
        </div>
    );

    const getFamilyGroup = async () => {
        let { data: familyGroup, error: fetchFamilyGroup } = await supabase
            .from('partners')
            .select('name, lastname')
            .eq('family_group', affiliateData.family_group);
        if (fetchFamilyGroup) {
            MySwal.fire({
                title: 'Error con la base de datos!!',
                text: `${fetchFamilyGroup.message}`,
                icon: 'error',
            });
            return 'Error en fetchFamilyGroup';
        }
        setFamilyGroup(familyGroup);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    if (familyGroup.length === 0) return <CircularProgress />;

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
                            className={styles.myOptions}
                        >
                            <NavLink
                                to={`/${userData.dni}/affiliate/profile`}
                                className={styles.navLink}
                            >
                                <MenuItem>Mi perfil</MenuItem>
                            </NavLink>
                            <MenuItem onClick={logout}>Cerrar Sesion</MenuItem>
                            <Divider />
                            <List>
                                <p className={styles.divider}>
                                    <strong>Grupo Familiar</strong>
                                </p>
                                {familyGroup.map((familiar, index) => (
                                    <ListItem key={`familiar-${index}`}>
                                        <ListItemText
                                            primary={`${familiar.name} ${familiar.lastname}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
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

export default UserNav;
