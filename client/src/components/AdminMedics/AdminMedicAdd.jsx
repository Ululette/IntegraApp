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

const resetInputs = {
    name: '',
    lastname: '',
    dni: '',
    license: '',
    email: '',
    phoneNumber: '',
    state: 'active',
    adressPostalCode: '',
    birthdate: '',
    specialityA: '',
    specialityB: '',
};

function AdminMedicAdd({ medicSpecialities }) {
    const classes = useStyles();

    const [input, setInput] = useState(resetInputs);
    const [open, setOpen] = useState(false);
    const [localities, setLocalities] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
        setInput(resetInputs);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value });
    };

    // const handlePostalCode = async () => {
    //     const { data: info, error: errorSearch } = await supabase
    //         .from('localities')
    //         .select('id, name, states (name)')
    //         .eq('postal_code', input.adressPostalCode);
    //     if (errorSearch) return console.log(errorSearch);
    //     setLocalities(info);
    // };

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
        } catch (error) {
            console.log(error);
            alert('Error. (ver en consola)');
        }
        alert('Medico agregado con exito');
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title='Agregar medico' onClick={handleClickOpen}>
                <Fab color='primary' className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <form onSubmit={handleSubmit}>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    onSubmit={handleSubmit}
                >
                    <DialogTitle>Agregar Medico</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Formulario para agregar medico.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin='dense'
                            name='dni'
                            label='DNI'
                            type='number'
                            value={input.dni}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            name='lastname'
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
                            name='name'
                            label='Nombre/s'
                            type='text'
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            value={input.license}
                            margin='dense'
                            name='license'
                            label='Matricula'
                            type='text'
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            value={input.phoneNumber}
                            name='phoneNumber'
                            label='Numero de telefono'
                            type='text'
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            value={input.email}
                            margin='dense'
                            name='email'
                            label='Email'
                            type='email'
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name='birthdate'
                            label='Fecha de nacimiento'
                            type='date'
                            defaultValue='2021-05-14'
                            onChange={handleChange}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        {/* <InputLabel htmlFor='state'>Estado</InputLabel> */}
                        <p name='state'>active</p>
                        <InputLabel htmlFor='specialityA'>
                            Especialidad 1
                        </InputLabel>
                        <Select name='specialityA' onChange={handleChange}>
                            {medicSpecialities.map((el, index) => (
                                <MenuItem
                                    key={`specialityA-${index}`}
                                    name='specialityA'
                                    value={el.id}
                                >
                                    {el.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputLabel htmlFor='specialityB'>
                            Especialidad 2
                        </InputLabel>
                        <Select name='specialityB' onChange={handleChange}>
                            <MenuItem name='specialityB' value={null}>
                                Ninguno
                            </MenuItem>
                            {medicSpecialities.map((el, index) => (
                                <MenuItem
                                    key={`specialityB-${index}`}
                                    name='specialityB'
                                    value={el.id}
                                >
                                    {el.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {/* <p>Direccion</p>
                        <TextField
                            autoFocus
                            value={input.adressStreet}
                            margin='dense'
                            name='adressStreet'
                            label='Calle'
                            type='text'
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            value={input.adressStreetNumber}
                            margin='dense'
                            name='adressStreetNumber'
                            label='Numero'
                            type='text'
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            value={input.adressFloor}
                            margin='dense'
                            name='adressFloor'
                            label='Piso'
                            type='text'
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            value={input.adressPostalCode}
                            margin='dense'
                            name='adressPostalCode'
                            label='Codigo postal'
                            type='text'
                            onChange={handleChange}
                            onBlur={handlePostalCode}
                            fullWidth
                        />
                        <Select name='locality' onChange={handleChange}>
                            {localities.length === 0
                                ? null
                                : localities.map((el, index) => (
                                      <MenuItem
                                          key={`locality-${index}`}
                                          value={el.name}
                                          name='locality'
                                      >
                                          {el.name}
                                      </MenuItem>
                                  ))}
                        </Select>
                        <TextField
                            autoFocus
                            value={
                                localities.states
                                    ? localities.states.name
                                    : null
                            }
                            margin='dense'
                            name='localityState'
                            label='Provincia'
                            disabled
                            type='text'
                            onChange={handleChange}
                            fullWidth
                        /> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} color='primary'>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            type='submit'
                            color='primary'
                        >
                            Agregar
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    );
}

export default AdminMedicAdd;
