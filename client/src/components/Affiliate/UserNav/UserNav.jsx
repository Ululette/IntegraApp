import React from 'react';
import { useUser } from 'reactfire';
import { NavLink } from 'react-router-dom';
import 'firebase/auth';
import supabase from '../../../supabase.config.js';
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
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { CircularProgress, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Slide,
    Divider,
} from '@material-ui/core';

//Icons
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
import NotificationsIcon from '@material-ui/icons/Notifications';
import GroupIcon from '@material-ui/icons/Group';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// OUR COMPONENTS
import styles from './UserNav.module.css';
import FamilyMembers from '../UserFamilyMembers/FamilyMembers.jsx';
import UserHome from '../UserHome/UserHome.jsx';
import UserMedRec from '../UserMedRec/UserMedRec.jsx';
import RenderPDF from '../UserMedRec/RenderPDF';
import MedicalDirectory from '../AffiliateDoctors/AffiliateDoctors';
import UserProfile from '../UserProfile/UserProfile.jsx';
import NotFound from '../../Status/NotFound.jsx';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='down' ref={ref} {...props} />;
});

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
    const MySwal = withReactContent(Swal);

    const userData = JSON.parse(localStorage.getItem('userdata'));
    const affiliateData = JSON.parse(localStorage.getItem('affiliatedata'));
    const userDataFirebase = useUser();

    if (!userDataFirebase.data && !affiliateData && !userData) {
        window.location = '/login';
    }

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [familyGroup, setFamilyGroup] = React.useState([]);
    const [open, setOpen] = React.useState(false);

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

    React.useEffect(() => {
        getFamilyGroup();
        //eslint-disable-next-line
    }, []);

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
                localStorage.removeItem('affiliatedata');
                window.location = '/login';
            }
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    if (!userDataFirebase.data) return <CircularProgress />;
    if (familyGroup.length === 0) return <CircularProgress />;

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List className={styles.listitems}>
                <NavLink
                    to={`/${userData.dni}/affiliate`}
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
                        <NotificationsIcon />
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
                        >{`Mi plan: ${affiliateData.plan_name}`}</p>
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
                                className={styles.myProfile}
                            >
                                <MenuItem className={styles.myProfile}>
                                    Mi perfil
                                </MenuItem>
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
                {window.location.pathname === `/${userData.dni}/affiliate` ? (
                    <UserHome firebase={firebase} />
                ) : window.location.pathname ===
                  `/${userData.dni}/affiliate/familymembers` ? (
                    <FamilyMembers />
                ) : window.location.pathname ===
                  `/${userData.dni}/affiliate/mymedicalrecords` ? (
                    <UserMedRec />
                ) : window.location.pathname ===
                  `/${userData.dni}/mymedicalrecords/pdf` ? (
                    <RenderPDF firebase={firebase} />
                ) : window.location.pathname ===
                  `/${userData.dni}/affiliate/profile` ? (
                    <UserProfile firebase={firebase} />
                ) : window.location.pathname ===
                  `/${userData.dni}/affiliate/doctor` ? (
                    <MedicalDirectory />
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
