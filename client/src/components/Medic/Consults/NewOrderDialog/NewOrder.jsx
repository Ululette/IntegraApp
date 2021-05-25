import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

export default function NewOrder() {
    const classes = useStyles();

    // Estado de apertura del diálogo
    const [open, setOpen] = React.useState(false);

    // Función que al hacer click abre el diálogo
    let handleClickOpen = (e) => {
        setOpen(true);
    };

    let [newOrder, setNewOrder] = useState('');
    let [orders, setOrders] = useState([]);
    let [ok, setOk] = useState(false);
    // let [mederror, setMederror] = useState('');

    let handleChange = (e) => {
        console.log(e.target.value);
        //no puede quedar vacío ni ser solo espacios
        let med = e.target.value;
        let medregex =
            /[0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+[ ]?[0-9a-z A-ZÀ-ÿ\u00f1\u00d1]*$/;
        if (medregex.test(med)) {
            // si no está vacío
            setOk(true); // deja agregarlo
            // setMederror('');
        } else {
            // setMederror('No puede quedar incompleto o en blanco.');
            setOk(false);
        }
        setNewOrder(med);
    };

    useEffect(() => {
        if (newOrder) {
            console.log(newOrder);
        }
    }, [newOrder]);

    let handleItemRemove = (value) => {
        // console.log('clickeaste ',value);
        let newOrders = orders.filter((e) => e !== value);
        setOrders(newOrders);
        return;
    };

    let handlePlus = (e) => {
        setOrders([...orders, newOrder]);
        console.log(orders);
        setNewOrder('');
        setOk(false);
        //limpie el imput
    };
    useEffect(() => {
        if (orders.length) {
            console.log(orders);
        }
    }, [orders]);

    const handleClose = () => {
        setNewOrder('');
        setOrders([]);
        setOk(false);
        setOpen(false);
    };

    const handleSave = () => {
        console.log('acá:', orders);
        localStorage.setItem('orders', JSON.stringify(orders));
        setNewOrder('');
        setOrders([]);
        setOk(false);
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant='outlined'
                size='large'
                color='primary'
                onClick={handleClickOpen}
            >
                Ordenes
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogTitle id='form-dialog-title'>Ordenes</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Agregue a continuación los estudios indicados al
                        paciente.
                    </DialogContentText>
                    <List>
                        {orders.map((med, index) => (
                            <ListItem
                                button
                                onClick={() => handleItemRemove(med)}
                                key={index}
                                name={med}
                            >
                                {med}
                            </ListItem>
                        ))}
                        <ListItem autoFocus button>
                            <TextField
                                autoFocus
                                margin='dense'
                                id='name'
                                label='Orden'
                                type='text'
                                fullWidth
                                onChange={handleChange}
                                value={newOrder}
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
                        <Button onClick={handleSave} color='primary'>
                            Guardar
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
