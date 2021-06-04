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

import styles from './Medicines.module.css';
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

export default function Medicines({ handleEvent }) {
    let classes = useStyles();

    // Estado de apertura del diálogo
    let [open, setOpen] = React.useState(false);

    // Función que al hacer click abre el diálogo
    let handleClickOpen = (e) => {
        setOpen(true);
    };

    let [newmed, setNewmed] = useState('');

    // Cuando abre el diálogo de mostrar medicamentos se fija si hay
    // algo cargado en el localstorage (por si anteriormente
    // lo había cargado y vuelto a cerrar)
    let [medicines, setMedicines] = useState(
        JSON.parse(localStorage.getItem('medicines')) || []
    );
    let [ok, setOk] = useState(false);
    // let [mederror, setMederror] = useState('');

    let handleChange = (e) => {
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
        setNewmed(med);
    };

    // Si hago click sobre el medicamento lo quita
    let handleItemRemove = (value) => {
        let newmeds = medicines.filter((e) => e !== value);
        setMedicines(newmeds);
        return;
    };

    let handlePlus = (e) => {
        setMedicines([...medicines, newmed]);
        setNewmed('');
        setOk(false);
        //limpie el imput
    };

    let handleClose = () => {
        setNewmed('');
        setOk(false);
        setOpen(false);
    };

    let handleSave = () => {
        handleEvent(medicines);
        localStorage.setItem('medicines', JSON.stringify(medicines));
        setNewmed('');
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
                <DialogTitle id='form-dialog-title'>Medicamentos</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Agregue a continuación los medicamentos indicados al
                        paciente.
                    </DialogContentText>
                    <List>
                        {medicines &&
                            medicines.map((med, index) => (
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
                                label='nueva medicación'
                                type='text'
                                fullWidth
                                onChange={handleChange}
                                value={newmed}
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
                    <Button 
                        onClick={handleClose} 
                        size='small'
                        variant='outlined'
                        color='primary'
                    >
                        Cancelar
                    </Button>
                    {!!medicines.length && (
                        <Button
                            onClick={handleSave}
                            key={'savemed'}
                            size='small'
                            variant='outlined'
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
