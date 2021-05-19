import React, { useState } from 'react';
import { Badge } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

//Icons
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import GroupIcon from '@material-ui/icons/Group';
import NoteIcon from '@material-ui/icons/Note';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import HealingIcon from '@material-ui/icons/Healing';

import styles from './AdminNav.module.css';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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

function AdminAside({ userData, window }) {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className={styles.asidebar}>
            <div className={classes.toolbar} />
            <List>
                <NavLink to={`/${userData.dni}/admin/`} className={styles.link}>
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
                <Badge
                    className={styles.notifications}
                    color='secondary'
                    badgeContent={2}
                >
                    <ListItem button>
                        <DoneAllIcon />
                        <ListItemText primary='Autorizaciones' />
                    </ListItem>
                </Badge>
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
                <Badge
                    className={styles.notifications}
                    color='secondary'
                    badgeContent={2}
                >
                    <ListItem button>
                        <PhoneAndroidIcon />
                        <ListItemText primary='Consultas de socios' />
                    </ListItem>
                </Badge>
                <Badge
                    className={styles.notifications}
                    color='secondary'
                    badgeContent={2}
                >
                    <ListItem button>
                        <AssignmentIcon />
                        <ListItemText primary='Tickets' />
                    </ListItem>
                </Badge>
            </List>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <div>
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

export default AdminAside;
