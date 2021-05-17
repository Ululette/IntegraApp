import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import validator from '../../functions/validator.js';
import supabase from '../../supabase.config.js';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function AddFamilyMember() {
    const classes = useStyles();
    const affData = JSON.parse(localStorage.getItem('affiliatedata'));
    const [errors, setErrors] = useState({});

    const [inputNumber, setInputsNumber] = useState({
        dni: '',
        phoneNumber: '',
    });
    const [inputEmail, setInputEmail] = useState({ email: '' });
    const [gender, setGender] = useState({ genderRad: '' });
    const [familyBond, setFamilyBond] = useState({ familyBondSelect: '' });
    const [inputDate, setInputDate] = useState({ birthdayDate: '' });
    const [inputsText, setInputsText] = useState({
        name: '',
        lastName: '',
    });

    const handleChangeDate = (e) => {
        setInputDate((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
        setErrors({
            ...errors,
            dateErrors: validator(
                { ...inputDate, [e.target.id]: e.target.value },
                'date'
            ),
        });
    };

    const handleChangeGender = (e) => {
        setGender((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
        setErrors({
            ...errors,
            genderErrors: validator(
                { ...gender, [e.target.name]: e.target.value },
                'radio'
            ),
        });
    };

    const handleChangeEmail = (e) => {
        setInputEmail((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
        setErrors({
            ...errors,
            emailErrors: validator(
                { ...inputEmail, [e.target.id]: e.target.value },
                'email'
            ),
        });
    };

    const handleChangeInputsNumber = (e) => {
        setInputsNumber((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
        setErrors({
            ...errors,
            dniPhoneErrors: validator(
                { ...inputNumber, [e.target.id]: e.target.value },
                'number'
            ),
        });
    };

    const handleChangeInputsText = (e) => {
        setInputsText((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
        setErrors({
            ...errors,
            textErrors: validator(
                { ...inputsText, [e.target.id]: e.target.value },
                'text'
            ),
        });
    };

    // Falta para el select la validación

    const handleChangeFamilyBond = (event) => {
        setFamilyBond(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let { error: errorFetchFamily } = await supabase
            .from('partners')
            .insert([
                {
                    name: inputsText.name,
                    lastname: inputsText.lastName,
                    birthdate: inputDate.birthdayDate,
                    family_bond: familyBond,
                    gender: gender.genderRad,
                    dni: inputNumber.dni,
                    email: inputEmail.email,
                    phone_number: inputNumber.phoneNumber,
                    family_group: affData.family_group,
                    plan_id: affData.plan_id,
                    titular: false,
                    state: 'aceptado',
                },
            ]);
        if (errorFetchFamily) {
            console.log(errorFetchFamily);
            alert('Error al agregar. Contacte al administrador.');
            return null;
        }
        alert('Familiar agregado con exito.');
        window.location.reload();
    };

    return (
        <form className={classes.container} noValidate onSubmit={handleSubmit}>
            <TextField
                onChange={handleChangeInputsText}
                id='name'
                label='Name'
                variant='outlined'
            />
            <TextField
                onChange={handleChangeInputsText}
                id='lastName'
                label='Last Name'
                variant='outlined'
            />
            <TextField
                id='birthdayDate'
                label='Birthday'
                type='date'
                onChange={handleChangeDate}
                defaultValue='2000-05-24'
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel id='familyBond'>Family Bond</InputLabel>
                <Select
                    labelId='familyBondSelect'
                    id='familyBondSelect'
                    value={familyBond}
                    onChange={handleChangeFamilyBond}
                    label='familyBond'
                >
                    <MenuItem value=''>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Conyuge'}>Conyuge</MenuItem>
                    <MenuItem value={'Concubino/a'}>Concubino/a</MenuItem>
                    <MenuItem value={'Hijo/a'}>Hijo/a</MenuItem>
                </Select>
            </FormControl>
            <FormControl component='fieldset'>
                <FormLabel component='legend'>Gender</FormLabel>
                <RadioGroup
                    aria-label='gender'
                    name='genderRad'
                    value={gender.genderRad}
                    onChange={handleChangeGender}
                >
                    <FormControlLabel
                        value='female'
                        control={<Radio />}
                        label='Female'
                    />
                    <FormControlLabel
                        value='male'
                        control={<Radio />}
                        label='Male'
                    />
                </RadioGroup>
            </FormControl>
            <TextField
                onChange={handleChangeInputsNumber}
                id='dni'
                label='DNI'
                variant='outlined'
            />
            <TextField
                onChange={handleChangeEmail}
                id='email'
                label='E-Mail'
                variant='outlined'
            />
            <TextField
                onChange={handleChangeInputsNumber}
                id='phoneNumber'
                label='Phone Number'
                variant='outlined'
            />
            <Button type='submit' color='primary'>
                Create
            </Button>
        </form>
    );
}
