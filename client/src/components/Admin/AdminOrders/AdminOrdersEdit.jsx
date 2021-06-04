/*eslint-disable */
import React, { useState } from 'react';
import { InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';
import { makeStyles, lighten } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { statesMedic } from '../../../functions/states.js';
/* import styles from './AdminOrdersEdit.css';
 */ import supabase from '../../../supabase.config.js';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    popup: {
        color: '#fafafa',
        backgroundColor: '#2c7f7b',
        fontWeight: 'bold',
        fontSize: '30px',
    },
    popupBtn: {
        color: '#fafafa',
        padding: theme.spacing(0.5),
        border: '3px solid #2c7f7b',
        backgroundColor: '#2c7f7b',
        fontWeight: 'bold',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: lighten('#fafafa', 0.2),
            color: '#2c7f7b',
            padding: theme.spacing(0.5),
        },
    },
}));

function AdminMedicEdit({ status, data, setEditActive, editActive }) {
    const classes = useStyles();
    const MySwal = withReactContent(Swal);
    let [input, setInput] = React.useState({
        id: '',
        status: '',
    });

    const handleClose = () => {
        setEditActive(false);
    };

    const handleChange = (e) => {
        const value = e.target.value; //autorizada
        setInput({ id: value.id, status: value.name });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEditActive(false);
        MySwal.fire({
            title: `Esta seguro que desea actualizar el estado de la orden del paciente: ${data.partners.name} ${data.partners.lastname} con DNI: ${data.partners.dni}?`,
            icon: 'question',
            showCloseButton: true,
            showCancelButton: true,
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    await supabase
                        .from('orders')
                        .update({ status: input.id })
                        .eq('id', data.id);
                    MySwal.fire({
                        title: 'Se edito el estado con exito!',
                        icon: 'success',
                        timer: 2000,
                    }).then(() => window.location.reload());
                } catch (error) {
                    console.log(error);
                    MySwal.fire({
                        title: 'Hubo un error al editar el.',
                        text: `Error: ${error}`,
                        icon: 'error',
                    });
                }
            }
        });
    };

    if (!data) return <CircularProgress />;
    return (
        <Dialog open={editActive} onClose={handleClose} onSubmit={handleSubmit}>
            <DialogTitle className={classes.popup}>EDITAR ESTADO</DialogTitle>
            <DialogContent>
                {/*    <DialogContentText>
                    Formulario para editar medico.
                </DialogContentText> */}
                <InputLabel id='demo-simple-select'>Estado</InputLabel>

                <FormControl>
                    <Select
                        name='status'
                        onChange={handleChange}
                        value={input.status}
                        /* id="demo-simple-select"
                    labelId="demo-simple-select-label" */
                        inputProps={{
                            style: { width: '177px' },
                        }}
                        variant='outlined'
                        size='small'
                        native
                    >
                        {status.map((el, index) => (
                            <option key={`state-${index}`} value={el}>
                                {el.name}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} className={classes.popupBtn}>
                    Cancelar
                </Button>
                <Button
                    onClick={handleSubmit}
                    type='submit'
                    className={classes.popupBtn}
                >
                    Editar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AdminMedicEdit;
