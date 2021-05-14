import React, { useState } from 'react';
import {
    Fab,
    IconButton,
    Tooltip,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AddIcon from '@material-ui/icons/Add';
import DialogTitle from '@material-ui/core/DialogTitle';
import states from '../../functions/states.js';
import supabase from '../../supabase.config.js';

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}));

function AdminMedicAdd({ medicSpecialities }) {
    const classes = useStyles();

    const [input, setInput] = useState({
        name: '',
        lastname: '',
        dni: '',
        license: '',
        email: '',
        phoneNumber: '',
        state: '',
        address: '',
        birthdate: '',
        specialityA: '',
        specialityB: '',
    });
    const [open, setOpen] = useState(false);

    console.log(input);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        setInput({ ...input, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await supabase.from('medics').insert([
                {
                    dni: input.dni,
                    name: input.name,
                    lastname: input.lastname,
                    medic_license: input.license,
                    email: input.email,
                    phone_number: input.phoneNumber,
                    state: input.state,
                    birthdate: input.birthdate,
                },
            ]);
            await supabase.from('medics_medical_specialities').insert([
                {
                    medic_dni: input.dni,
                    speciality_id: input.specialityA,
                },
            ]);
            if (input.specialityB) {
                await supabase.from('medics_medical_specialities').insert([
                    {
                        medic_dni: input.dni,
                        speciality_id: input.specialityB,
                    },
                ]);
            }
            alert('Medico agregado con exito');
        } catch (error) {
            console.log(error);
            alert('Error. (ver en consola)');
        }
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title='Agregar medico' onClick={handleClickOpen}>
                <Fab color='primary' className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
                <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email
                        address here. We will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='dni'
                        label='DNI'
                        type='number'
                        value={input.dni}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        id='lastname'
                        label='Apellido/s'
                        value={input.lastname}
                        type='text'
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        value={input.name}
                        id='name'
                        label='Nombre/s'
                        type='text'
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        value={input.license}
                        margin='dense'
                        id='license'
                        label='Matricula'
                        type='text'
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        value={input.phoneNumber}
                        id='phoneNumber'
                        label='Numero de telefono'
                        type='text'
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        value={input.email}
                        margin='dense'
                        id='email'
                        label='Email'
                        type='email'
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        value={input.birthdate}
                        margin='dense'
                        id='birthdate'
                        label='Fecha de nacimiento'
                        type='date'
                        onChange={handleChange}
                        fullWidth
                    />
                    <InputLabel id='state'>Estado</InputLabel>
                    <Select id='state' onChange={handleChange}>
                        {states.map((el) => (
                            <MenuItem value={input.state}>{el}</MenuItem>
                        ))}
                    </Select>
                    <InputLabel id='specialityA'>Especialidad 1</InputLabel>
                    <Select id='specialityA' onChange={handleChange}>
                        {medicSpecialities.map((el) => (
                            <MenuItem value={el.id}>{el.name}</MenuItem>
                        ))}
                    </Select>
                    <InputLabel id='specialityB'>Especialidad 2</InputLabel>
                    <Select id='specialityB' onChange={handleChange}>
                        {medicSpecialities.map((el) => (
                            <MenuItem value={el.id}>{el.name}</MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancelar
                    </Button>
                    <Button
                        type='submit'
                        onClick={handleSubmit}
                        color='primary'
                    >
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AdminMedicAdd;
