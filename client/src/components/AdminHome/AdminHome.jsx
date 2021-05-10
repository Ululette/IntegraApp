import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPlans, getBenefits } from '../../actions/getter.action.js';
import {
    CircularProgress,
    Fab,
    Tooltip,
    Button,
    Menu,
    MenuItem,
    IconButton,
    Box,
} from '@material-ui/core';
import 'firebase/auth';
import styles from './AdminHome.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import MenuIcon from '@material-ui/icons/Menu';

// MATERIAL UI PRUEBA
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';

import supabase from '../../supabase.config';

function AdminHome({ firebase }) {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    if (!userData || userData.role !== 'admin') window.location = '/login';

    const allPlans = useSelector((state) => state.allPlans);
    const allBenefits = useSelector((state) => state.allBenefits);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const logout = async () => {
        if (window.confirm('¿Quiere cerrar sesión?')) {
            await firebase.auth().signOut();
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
        dispatch(getBenefits());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // MODAL
    const [open, setOpen] = React.useState(false);
    const [modalPlan, setModalPlan] = useState({
        id_plan: '',
        description: '',
        price: '',
        benefits: '',
    });

    // PARA VER LOS CAMBIOS EN LA SELECCIÓN DE BENEFICIOS

    //   useEffect(() => {
    //     console.log(modalPlan);
    //   }, [modalPlan]);

    const handleOpenModal = (plan) => {
        setModalPlan({
            id_plan: plan.id_plan,
            description: plan.description,
            price: plan.price,
            benefits: plan.benefits.map(
                (benefit) => benefit.benefit_description
            ),
        });
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleChangeModal = (e) => {
        setModalPlan({ ...modalPlan, [e.target.name]: e.target.value });
    };

    const handleAutoComplete = (arrayOfStringBenefits) => {
        setModalPlan({ ...modalPlan, benefits: arrayOfStringBenefits });
    };

    // FALTA CONTROLAR LA INFO INGRESADA

    const handleSubmit = async (e) => {
        const { data, error } = await supabase
            .from('plans')
            .update({
                description: e.target[0].value,
                price: e.target[1].value,
            })
            .eq('id_plan', modalPlan.id_plan);
        console.log(error);
        console.log(data);
        handleCloseModal();
        // FALTA HACER EL UPDATE DE LOS BENEFICIOS SELECCIONADOS
    };

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
                            <Tooltip
                                title='Editar plan'
                                onClick={() => handleOpenModal(plan)}
                            >
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
                            <Tooltip title='Eliminar plan' aria-label='delete'>
                                <DeleteIcon />
                            </Tooltip>
                        </div>
                    </div>
                ))}
                <Dialog
                    open={open}
                    onClose={handleCloseModal}
                    aria-labelledby='form-dialog-title'
                >
                    <DialogTitle id='form-dialog-title'>
                        Modify Plan
                    </DialogTitle>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <DialogContent>
                            <DialogContentText>
                                Edit selected plan details.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin='dense'
                                id='plan-description'
                                label='Name'
                                type='string'
                                name='description'
                                value={modalPlan.description}
                                onChange={(e) => handleChangeModal(e)}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin='dense'
                                id='plan-price'
                                label='Price'
                                type='string'
                                name='price'
                                value={modalPlan.price}
                                onChange={(e) => handleChangeModal(e)}
                                fullWidth
                            />
                            {/* m={2} https://material-ui.com/es/system/spacing/ */}
                            <Box m={2}>
                                <Autocomplete
                                    multiple
                                    limitTags={2}
                                    id='multiple-limit-tags'
                                    options={allBenefits}
                                    getOptionLabel={(option) =>
                                        option.benefit_description
                                    }
                                    // Tuve que trabajar con el mismo array que tengo en options porque de otra forma no funciona correctamente. Al parecer la posición de las opciones es relevante.
                                    defaultValue={allBenefits.filter(
                                        (benefit) =>
                                            modalPlan.benefits.includes(
                                                benefit.benefit_description
                                            )
                                    )}
                                    onChange={(event, value) =>
                                        handleAutoComplete(value)
                                    } // es la forma de mostrar los valores https://stackoverflow.com/questions/58666189/getting-the-value-in-the-react-material-ui-autocomplete
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant='outlined'
                                            label='Benefits'
                                            placeholder='Select'
                                        />
                                    )}
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseModal} color='primary'>
                                Cancel
                            </Button>
                            <Button
                                onClick={() => console.log('modify button')}
                                type='submit'
                                color='primary'
                            >
                                Modify
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
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
