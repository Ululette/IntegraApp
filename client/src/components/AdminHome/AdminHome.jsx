/* eslint-disable */
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
import CreateIcon from '@material-ui/icons/Create';
import MenuIcon from '@material-ui/icons/Menu';
import supabase from '../../supabase.config';

function AdminHome({ firebase }) {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    if (!userData || userData.role !== 'admin') window.location = '/login';

    const allPlans = useSelector((state) => state.allPlans);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const logout = async () => {
        if (window.confirm('¿Quiere cerrar sesión?')) {
            await firebase.auth().signOut();
            localStorage.removeItem('userdata');
            window.location = '/login';
        }
    };

    const handleDelete = async (planDescription) => {
        const res = window.confirm(
            `¿Desea eliminar el plan ${planDescription}?`
        );
        if (res) {
            const { data: idPlan } = await supabase
                .from('plans')
                .select('id_plan')
                .eq('description', planDescription);
            const { data: deleteRelation, error } = await supabase
                .from('plans_benefits')
                .delete()
                .match({ plans_id_plan: idPlan[0].id_plan });
            const { data: deletePlan, error: errorDeletePlan } = await supabase
                .from('plans')
                .delete()
                .eq('id_plan', idPlan[0].id_plan);

            if (!error && !errorDeletePlan)
                return alert(`${planDescription} eliminado con exito.`);
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
    }, [allPlans]);

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
                        <div className={styles.editIcon}>
                            <h4>{plan.description}</h4>
                            <Tooltip title='Editar plan'>
                                <CreateIcon />
                            </Tooltip>
                        </div>
                        <h5>{`$${plan.price}`}</h5>
                        <ul className={styles.benefitContainer}>
                            {plan.benefits.map((el, i) => (
                                <li key={`benefit-${index}-${i}`}>
                                    {el.benefit_description}
                                </li>
                            ))}
                        </ul>
                        <div className={styles.deleteButton}>
                            <Tooltip
                                title='Eliminar plan'
                                aria-label='delete'
                                onClick={() => handleDelete(plan.description)}
                            >
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
