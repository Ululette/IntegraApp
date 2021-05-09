import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPlans } from '../../actions/getter.action.js';
import {
    CircularProgress,
    Fab,
    Tooltip,
    Button,
    Menu,
    MenuItem,
    IconButton,
} from '@material-ui/core';

import 'firebase/auth';
import styles from './AdminHome.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';

function AdminHome({ firebase }) {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    if (!userData || userData.role !== 'admin') window.location = '/login';

    const allPlans = useSelector((state) => state.allPlans);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const logout = () => {
        if (window.confirm('¿Quiere cerrar sesión?')) {
            firebase.auth().signOut();
            localStorage.removeItem('userdata');
            window.location = '/login';
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        dispatch(getPlans());
    }, []);

    if (allPlans.length === 0) return <CircularProgress />;

    return (
        <div className={styles.container}>
            <nav className={styles.semiNav}>
                <IconButton className={styles.menuButton}>
                    <MenuIcon className={styles.menuIcon} />
                </IconButton>
                <h1>Bienvenido {userData.name}</h1>
                <div>
                    <Button
                        aria-controls='simple-menu'
                        aria-haspopup='true'
                        onClick={handleClick}
                    >
                        <img
                            src='../../assets/images/logo-simple.png'
                            alt='User icon.'
                            width='45px'
                            height='45px'
                        />
                    </Button>
                    <Menu
                        id='simple-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Mi perfil</MenuItem>
                        <MenuItem onClick={handleClose}>Agregar plan</MenuItem>
                        <MenuItem onClick={logout}>Cerrar sesion</MenuItem>
                    </Menu>
                </div>
            </nav>

            <section className={styles.plansContainer}>
                {allPlans.map((plan, index) => (
                    <div
                        key={`plan-${index}`}
                        className={styles.detailContainer}
                    >
                        <h4>{plan.description}</h4>
                        <h5>{`$${plan.price}`}</h5>
                        <ul className={styles.benefitContainer}>
                            {plan.benefits.map((el, i) => (
                                <li key={`benefit-${index}-${i}`}>
                                    {el.benefit_description}
                                </li>
                            ))}
                        </ul>
                        <div className={styles.deleteButton}>
                            <Tooltip title='Eliminar plan' aria-label='delete'>
                                <DeleteIcon />
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </section>
            <section className={styles.addButton}>
                <Tooltip title='Agregar plan' aria-label='add'>
                    <Fab color='primary'>
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </section>
        </div>
    );
}

export default AdminHome;
