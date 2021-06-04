import React, { useState } from 'react';
import { Fab, Tooltip, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AddIcon from '@material-ui/icons/Add';
import DialogTitle from '@material-ui/core/DialogTitle';
import supabase from '../../../supabase.config.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
        backgroundColor: '#2c7f7b',
        fontSize: '35px',
        border: '3px solid #2c7f7b',
        '&:hover': {
            backgroundColor: '#2c7f7b',
            border: '3px solid #fafafa',
        },
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
        backgroundColor: '#3db7b1',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '15px',
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
        borderRadius: '5px',
        backgroundColor: '#2c7f7b',
        fontWeight: 'bold',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: '#fafafa',
            color: '#2c7f7b',
            padding: theme.spacing(0.5),
        },
    },
    select: {
        width: '177px',
        textTransform: 'capitalize',
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
    specialities: [],
};

function AdminMedicAdd({ medicSpecialities, firebase }) {
    const classes = useStyles();
    const MySwal = withReactContent(Swal);
    const [input, setInput] = useState(resetInputs);
    const [open, setOpen] = useState(false);
    const [chipSpecialities, setChipSpecialities] = useState([]);
    const [localities, setLocalities] = useState([]);
    const [address, setAddress] = useState({
        street: '',
        number: '',
        floor: '',
        department: '',
        locality: '',
        postalCode: '',
        state: '',
    });

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

    const handleChangeAddress = async (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAddress({ ...address, [name]: value });
    };

    const handlePostalCode = async () => {
        if (
            address.postalCode !== '' &&
            String(address.postalCode).length >= 4
        ) {
            const { data, error: errorsito } = await supabase
                .from('localities')
                .select('name, postal_code, states (name)')
                .eq('postal_code', address.postalCode);
            if (errorsito || data.length === 0)
                return MySwal.fire({
                    title: 'No existe ese codigo postal.',
                    icon: 'error',
                    showCancelButton: false,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#00897B',
                });
            setLocalities(data);
            setAddress({ ...address, state: data[0].states.name });
        }
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

            input.specialities.forEach(async (el) => {
                await supabase.from('medics_medical_specialities').insert([
                    {
                        medic_dni: input.dni,
                        speciality_id: el.id,
                    },
                ]);
            });

            MySwal.fire({
                title: 'Se agregó al médico con éxito.',
                icon: 'success',
                timer: 2000,
            });
        } catch (error) {
            MySwal.fire({
                title: 'No se pudo agregar al medico.',
                text: error.message,
                icon: 'error',
            });
        }
        await supabase.from('users').insert([
            {
                dni: parseInt(input.dni),
                role: 'medic',
                email: input.email,
                account: 'active',
            },
        ]);

        await firebase
            .auth()
            .createUserWithEmailAndPassword(input.email, String(input.dni));

        await firebase.auth().sendPasswordResetEmail(input.email);

        try {
            MySwal.fire({
                title: 'Se creó un nuevo usuario médico!.',
                text: 'Debe resetear su password. Le llegará el link por mail.',
                icon: 'success',
                timer: 2000,
            }).then(() => window.location.reload());
        } catch (error) {
            MySwal.fire({
                title: 'No se pudo agregar al medico.',
                text: error.message,
                icon: 'error',
            });
        }
        setOpen(false);
    };

    const handleChipAdd = (toAdd) => {
        const value = toAdd.target.value;

        const speciality = medicSpecialities.find(
            (speciality) => speciality.name === value
        );
        setInput({
            ...input,
            specialities: input.specialities.concat(speciality),
        });
        setChipSpecialities(chipSpecialities.concat(value));
    };

    const handleChipDelete = (toDelete) => {
        setChipSpecialities((chips) =>
            chips.filter((chip) => chip !== toDelete)
        );
        setInput({
            ...input,
            specialities: input.specialities.filter(
                (deleteSpec) => deleteSpec.name !== toDelete
            ),
        });
    };

    return (
        <div>
            <Tooltip title='Agregar medico' onClick={handleClickOpen}>
                <Fab color='primary' className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} onSubmit={handleSubmit}>
                <DialogTitle className={classes.popup}>
                    AGREGAR NUEVO MEDICO
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ingrese los datos solicitados.
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
                    <InputLabel htmlFor='specialityA'>
                        Especialidades
                    </InputLabel>
                    <Select
                        className={classes.select}
                        name='specialities'
                        onChange={handleChipAdd}
                        inputProps={{
                            style: { width: '177px' },
                        }}
                    >
                        {medicSpecialities.map((el, index) => (
                            <MenuItem
                                key={`speciality-${index}`}
                                value={el.name}
                            >
                                {el.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <Paper component='ul' className={classes.paper}>
                        {chipSpecialities.map((data, index) => (
                            <li key={`speciality-${index}`}>
                                <Chip
                                    className={classes.chip}
                                    label={data}
                                    onDelete={() => handleChipDelete(data)}
                                />
                            </li>
                        ))}
                    </Paper>
                    <p>Direccion</p>
                    <TextField
                        autoFocus
                        value={address.street}
                        margin='dense'
                        name='street'
                        label='Calle'
                        type='text'
                        onChange={handleChangeAddress}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        value={address.number}
                        margin='dense'
                        name='number'
                        label='Numero'
                        type='text'
                        onChange={handleChangeAddress}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        value={address.floor}
                        margin='dense'
                        name='floor'
                        label='Piso'
                        type='text'
                        onChange={handleChangeAddress}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        value={address.postalCode}
                        margin='dense'
                        name='postalCode'
                        label='Codigo postal'
                        type='text'
                        onChange={handleChangeAddress}
                        onBlur={handlePostalCode}
                        fullWidth
                    />
                    <Select name='locality' onChange={handleChangeAddress}>
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
                        margin='dense'
                        name='state'
                        label='Provincia'
                        value={address.state}
                        disabled
                        type='text'
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} className={classes.popupBtn}>
                        Cancelar
                    </Button>
                    <Button
                        className={classes.popupBtn}
                        onClick={handleSubmit}
                        type='submit'
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
