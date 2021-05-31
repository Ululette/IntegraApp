import React, { useState } from 'react';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
import supabase from '../../../supabase.config.js';
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
        backgroundColor:'#3db7b1',
        color:'white',
        fontWeight:'bold',
        fontSize:'15px',
        
    },
    popup:{
        color: '#fafafa',
        backgroundColor: '#2c7f7b',
        fontWeight:'bold',
        fontSize:'30px'
    },
    popupBtn:{
        color: '#fafafa',
        padding: theme.spacing(0.5),
        border: '3px solid #2c7f7b',
        borderRadius:'5px',
        backgroundColor:'#2c7f7b',
        fontWeight:'bold',
        fontSize:'15px',
        '&:hover':{
            backgroundColor:'#fafafa',
            color:'#2c7f7b',
            padding: theme.spacing(0.5),
        }
    },
    select:{
        width:'177px',
        textTransform:'capitalize',
    }
}));

function AdminMedicEdit({
    medicData,
    medicSpecialities,
    setEditActive,
    editActive,
}) {
    const classes = useStyles();
    const MySwal = withReactContent(Swal);
    let [input, setInput] = useState({
        dni: medicData.dni,
        name: medicData.name,
        lastname: medicData.lastname,
        email: medicData.email,
        phoneNumber: medicData.phone_number,
        specialities: medicData.medical_specialities.map((el) => el),
        status: medicData.state,
    });

    const [chipSpecialities, setChipSpecialities] = useState(
        input.specialities.map((el) => el.name)
    );

    const handleClose = () => {
        setEditActive(false);
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

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEditActive(false);
        MySwal.fire({
            title: `Esta seguro de actualizar al medico: ${medicData.name} ${medicData.lastname} con DNI: ${medicData.dni}?`,
            icon: 'question',
            showCloseButton: true,
            showCancelButton: true,
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    await supabase
                        .from('medics_medical_specialities')
                        .delete()
                        .eq('medic_dni', medicData.dni);
                    for (let i = 0; i < input.specialities.length; i++) {
                        let { error: insertError } = await supabase
                            .from('medics_medical_specialities')
                            .insert([
                                {
                                    medic_dni: medicData.dni,
                                    speciality_id: input.specialities[i].id,
                                },
                            ])
                            .eq('medic_dni', medicData.dni);
                        if (insertError) {
                            return console.log(insertError);
                        }
                    }
                    let { error: insertErrorData } = await supabase
                        .from('medics')
                        .update({
                            lastname: input.lastname,
                            name: input.name,
                            email: input.email,
                            phone_number: input.phoneNumber,
                            state: input.status,
                        })
                        .eq('dni', medicData.dni);
                    if (insertErrorData) {
                        return MySwal.fire({
                            title: 'Hubo un error al editar al medico.',
                            text: `Error: ${insertErrorData.message}`,
                            icon: 'error',
                        });
                    }
                    MySwal.fire({
                        title: 'Se edito al medico con exito!',
                        icon: 'success',
                        timer: 2000,
                    }).then(() => window.location.reload());
                } catch (error) {
                    console.log(error);
                    MySwal.fire({
                        title: 'Hubo un error al editar al medico.',
                        text: `Error: ${error}`,
                        icon: 'error',
                    });
                }
            }
        });
    };

    if (!medicData) return <CircularProgress />;

    console.log(input);

    return (
        <Dialog open={editActive} onClose={handleClose} onSubmit={handleSubmit}>
            <DialogTitle className={classes.popup}>EDITAR MEDICO</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Ingrese los datos solicitados.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin='dense'
                    disabled
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
                <InputLabel htmlFor='status'>Estado</InputLabel>
                <Select
                    className={classes.select}
                    name='status'
                    onChange={handleChange}
                    value={input.status}
                >
                    {statesMedic.map((el, index) => (
                        <MenuItem key={`state-${index}`} value={el}>
                            {el}
                        </MenuItem>
                    ))}
                </Select>
                <InputLabel htmlFor='specialities'>Especialidades</InputLabel>
                <Select name='specialities' onChange={handleChipAdd} className={classes.select}>
                    {medicSpecialities.map((el, index) => (
                        <MenuItem key={`speciality-${index}`} value={el.name}>
                            {el.name}
                        </MenuItem>
                    ))}
                </Select>
                <Paper component='ul' className={classes.paper}>
                    {chipSpecialities.map((data, index) => (
                        <li key={`speciality-${index}`}>
                            <Chip
                                label={data}
                                onDelete={() => handleChipDelete(data)}
                                className={classes.chip}
                            />
                        </li>
                    ))}
                </Paper>

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
                <Button onClick={handleClose} color='primary' className={classes.popupBtn}>
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} type='submit' color='primary' className={classes.popupBtn}>
                    Editar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AdminMedicEdit;
