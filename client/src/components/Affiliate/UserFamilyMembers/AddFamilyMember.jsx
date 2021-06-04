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
import clsx from 'clsx';
import { lighten} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import validator from '../../../functions/validator.js';
import supabase from '../../../supabase.config.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#41aea9',
        },
        // secondary: {
        //     // This is green.A700 as hex.
        //     main: '#11cb5f',
        // },
    },
});


const useStyles = makeStyles((theme) => ({
    all:{
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        marginTop:'20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center',
        flexWrap: 'wrap',
    },
    textfield: {
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),
        minWidth:'200px',
        width: '500px',
        margin:'20px',
    },
    firstColumn:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        // flexWrap: 'wrap',
    },
    secondColumn:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'20px',
        // flexWrap: 'wrap',
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
        margin:'20px'
        // marginBottom:'20px'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    select:{
        width:'500px',
        // margin:'20px',
    },
    header: {
        // paddingLeft: theme.spacing(0),
        // paddingRight: theme.spacing(0),
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'64px',
        backgroundColor: lighten('#34a7a1', 0.3),
        padding: '0px 0px 0px 0px',
        //color barra superior '
    },
    title: {
        flex: '1 1 100%',
        fontWeight: 'bold',
        fontSize: '1.4rem',
        color: '#fafafa',
        textAlign: 'center',
    },
    mainButton:{
        color:'#fafafa',
        width:'100px',
    },
    buttonContainer:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
    }
}));

export default function AddFamilyMember() {
    const classes = useStyles();
    const affData = JSON.parse(localStorage.getItem('affiliatedata'));
    const [errors, setErrors] = useState({});
    const MySwal = withReactContent(Swal);

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
        MySwal.fire({
            title: `Esta seguro de agregar a ${inputsText.name} ${inputsText.lastName}, DNI: ${inputNumber.dni} al grupo familiar?`,
            showCloseButton: true,
            showCancelButton: true,
            icon: 'question',
        }).then(async (res) => {
            if (res.isConfirmed) {
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
                    MySwal.fire({
                        title: 'Error al agregar. Contacte al administrador.',
                        icon: 'error',
                    });
                    return null;
                }
                MySwal.fire({
                    title: 'Se agrego al familiar con exito!',
                    icon: 'success',
                    timer: 2000,
                }).then(() => window.location.reload());
            }
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.all}>
                <div className={classes.header}>
                    <Typography
                        className={classes.title}
                        variant='h6'
                        id='tableTitle'
                        component='div'
                    >
                        AÑADIR FAMILIAR
                    </Typography>
                </div>
                <form className={classes.container} noValidate onSubmit={handleSubmit}>
                    <div className={classes.firstColumn}>

                        <TextField
                            onChange={handleChangeInputsText}
                            className={classes.textfield}
                            id='name'
                            label='Name'
                            variant='outlined'
                        />
                        <TextField
                            onChange={handleChangeInputsText}
                            className={classes.textfield}
                            id='lastName'
                            label='Last Name'
                            variant='outlined'
                        />
                        <TextField
                            className={classes.textfield}
                            id='birthdayDate'
                            label='Birthday'
                            type='date'
                            onChange={handleChangeDate}
                            defaultValue='2000-05-24'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <FormControl component='fieldset'>
                            {/* <FormLabel component='legend'>Gender</FormLabel> */}
                            <RadioGroup
                                aria-label='gender'
                                name='genderRad'
                                value={gender.genderRad}
                                onChange={handleChangeGender}
                            >
                                <FormControlLabel
                                    value='female'
                                    control={<Radio color='primary'/>}
                                    label='Female'
                                />
                                <FormControlLabel
                                    value='male'
                                    control={<Radio color='primary'/>}
                                    label='Male'
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className={classes.secondColumn}>
                        <FormControl variant='outlined' className={classes.formControl}>
                            {/* <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
                            <Select
                                native
                                value={state.age}
                                onChange={handleChange}
                                label="Age"
                                inputProps={{
                                    name: 'age',
                                    id: 'outlined-age-native-simple',
                                }}
                            > */}
                            <InputLabel htmlFor="family-bond-select">Parentesco</InputLabel>
                            <Select
                            // native
                                className={classes.select}
                                value={familyBond}
                                onChange={handleChangeFamilyBond}
                                label='Parentesco'
                                inputProps={{
                                    name: 'familyBond',
                                    id: 'family-bond-select',
                                }}
                            >
                                <MenuItem value=''>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Conyuge'}>Conyuge</MenuItem>
                                <MenuItem value={'Concubino/a'}>Concubino/a</MenuItem>
                                <MenuItem value={'Hijo/a'}>Hijo/a</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            onChange={handleChangeInputsNumber}
                            className={classes.textfield}
                            id='dni'
                            label='DNI'
                            variant='outlined'
                        />
                        <TextField
                            onChange={handleChangeEmail}
                            className={classes.textfield}
                            id='email'
                            label='E-Mail'
                            variant='outlined'
                        />
                        <TextField
                            onChange={handleChangeInputsNumber}
                            className={classes.textfield}
                            id='phoneNumber'
                            label='Phone Number'
                            variant='outlined'
                        />
                    </div>
                </form>
                <div className={classes.buttonContainer}>
                    <Button 
                        type='submit' 
                        color='primary'
                        variant='contained'
                        className={classes.mainButton}
                    >
                        Create
                    </Button>
                </div>
            </div>
        </ThemeProvider>
    );
}
