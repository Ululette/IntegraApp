import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import {
    Button,
    List,
    ListItem,
    Avatar,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

import styles from './Orders.module.css';
// import { setMedicines } from '../../../../actions/consult.action';

import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[300],
        color: blue[100],
        '&:hover': {
            backgroundColor: blue[800],
        },
    },
});

export default function Orders({ handleEvent }) {
    let classes = useStyles();

    // Estado de apertura del diálogo
    let [open, setOpen] = React.useState(false);

    // Función que al hacer click abre el diálogo
    let handleClickOpen = (e) => {
        setOpen(true);
    };

    let [neworder, setNeworder] = useState('');

    // Cuando abre el diálogo de mostrar medicamentos se fija si hay
    // algo cargado en el localstorage (por si anteriormente
    // lo había cargado y vuelto a cerrar)
    let [orders, setOrders] = useState(
        JSON.parse(localStorage.getItem('orders')) || []
    );
    let [ok, setOk] = useState(false);

    let handleChange = (e) => {
        //no puede quedar vacío ni ser solo espacios
        let ord = e.target.value;
        let ordregex =
            /[0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+[ ]?[0-9a-z A-ZÀ-ÿ\u00f1\u00d1]*$/;
        if (ordregex.test(ord)) {
            // si no está vacío
            setOk(true); // deja agregarlo
        } else {
            setOk(false);
        }
        setNeworder(ord);
    };

    // Si hago click sobre el medicamento lo quita
    let handleItemRemove = (value) => {
        let newords = orders.filter((e) => e !== value);
        setOrders(newords);
        return;
    };

    let handlePlus = (e) => {
        setOrders([...orders, neworder]);
        setNeworder('');
        setOk(false);
        //limpie el imput
    };

    let handleClose = () => {
        setNeworder('');
        setOk(false);
        setOpen(false);
    };

    let handleSave = () => {
        handleEvent(orders);
        localStorage.setItem('orders', JSON.stringify(orders));
        setNeworder('');
        setOk(false);
        setOpen(false);
    };

    return (
        <div>
            <Button
                className={styles.addmed}
                size='small'
                variant='outlined'
                color='primary'
                onClick={handleClickOpen}
            >
                Agregar
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogTitle id='form-dialog-title'>
                    Estudios complementarios
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Agregue a continuación los estudios indicados al
                        paciente.
                    </DialogContentText>
                    <List>
                        {orders &&
                            orders.map((ord, index) => (
                                <ListItem
                                    button
                                    onClick={() => handleItemRemove(ord)}
                                    key={index}
                                    name={ord}
                                >
                                    {ord}
                                </ListItem>
                            ))}
                        <ListItem autoFocus button>
                            <TextField
                                autoFocus
                                margin='dense'
                                id='name'
                                label='nuevo estudio'
                                type='text'
                                fullWidth
                                onChange={handleChange}
                                value={neworder}
                            />
                            {ok && (
                                <Avatar className={classes.avatar}>
                                    <CheckIcon onClick={() => handlePlus()} />
                                </Avatar>
                            )}
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancelar
                    </Button>
                    {!!orders.length && (
                        <Button
                            onClick={handleSave}
                            key={'savemed'}
                            color='primary'
                        >
                            Guardar
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
