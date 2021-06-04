import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import styles from './AdminRegistration.module.css';
import LogoNav from '../../../assets/logo-integra.png';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import supabase from '../../../supabase.config';
import Swal from 'sweetalert2';
import Styles from './AdminRegistration.module.css';
import withReactContent from 'sweetalert2-react-content';
import 'firebase/auth';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '300px',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: {
        backgroundColor: '#27978b',
        color: '#f0f0f0',
    },
}));

function AdminRegistration({ firebase }) {
    const classes = useStyles();
    const MySwal = withReactContent(Swal);
    const [input, setInput] = useState({
        name: '',
        lastname: '',
        dni: '',
        mail: '',
        birthdate: '',
        phone: '',
        root: '',
    });
    const [errors, setErrors] = useState({
        name: false,
        lastname: false,
        dni: false,
        birthdate: false,
        root: false,
        mail: false,
        phone: false,
    });

    const [errorRequest, setErrorRequest] = useState(false);

    const handleClickOpen = async () => {
        if (
            !errors.name &&
            !errors.lastname &&
            !errors.dni &&
            !errors.mail &&
            !errors.birthdate &&
            !errors.root &&
            !errors.phone
        ) {
            await supabase.from('users').insert([
                {
                    dni: input.dni,
                    role: 'admin',
                    email: input.mail,
                },
            ]);

            await supabase.from('admins').insert([
                {
                    name: input.name,
                    lastname: input.lastname,
                    birthdate: input.birthdate,
                    dni: input.dni,
                    root: input.root,
                    email: input.mail,
                    phone_number: input.phone,
                },
            ]);

            await firebase
                .auth()
                .createUserWithEmailAndPassword(input.mail, input.dni);

            try {
                await firebase.auth().sendPasswordResetEmail(input.mail);
            } catch (error) {
                MySwal.fire({
                    title: 'Usuario admin no pudo ser creado.',
                    text: `Mensaje de error ${error}`,
                    icon: 'error',
                });
            }
            MySwal.fire({
                title: 'Usuario admin creado con exito!',
                text: 'Debera resetear su password. Le llegara el link por mail.',
                icon: 'success',
            });

            setInput({
                name: '',
                lastname: '',
                dni: '',
                mail: '',
                birthdate: '',
                root: '',
                phone: '',
            });
        } else {
            setErrorRequest(true);
        }
    };

    const handleClose = () => {
        setErrorRequest(false);
    };

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validate(e.target.name, e.target.value));
    };

    function validate(inputName, value) {
        const mailPattern =
            /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
        const numberPattern = /^[0-9\b]+$/;
        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        let errors = {};
        switch (inputName) {
            case 'name': {
                if (!value) {
                    errors.name = true;
                } else {
                    errors.name = false;
                }
                break;
            }
            case 'lastname': {
                if (!value) {
                    errors.lastname = true;
                } else {
                    errors.lastname = false;
                }
                break;
            }
            case 'dni': {
                if (!numberPattern.test(value) || value.length !== 8) {
                    errors.dni = true;
                } else {
                    errors.dni = false;
                }
                break;
            }
            case 'phone': {
                if (!numberPattern.test(value) || value.length !== 10) {
                    errors.phone = true;
                } else {
                    errors.phone = false;
                }
                break;
            }
            case 'mail': {
                if (!mailPattern.test(value)) {
                    errors.mail = true;
                } else {
                    errors.mail = false;
                }
                break;
            }
            case 'birthdate': {
                if (!value) {
                    errors.birthdate = true;
                } else {
                    errors.birthdate = false;
                }
                break;
            }
            case 'root': {
                if (!value) {
                    errors.root = true;
                } else {
                    errors.root = false;
                }
                break;
            }
            case 'password': {
                if (!passwordPattern.test(value)) {
                    errors.password = true;
                } else {
                    errors.password = false;
                }
                break;
            }
            case 'confirmPassword': {
                if (input.password !== value) {
                    errors.confirmPassword = true;
                } else {
                    errors.confirmPassword = false;
                }
                break;
            }
            default:
                return null;
        }
        return errors;
    }

    return (
        <div className={styles.conteinerAll}>
            <Snackbar
                open={errorRequest}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity='error'>
                    Error, verifique los datos.
                </Alert>
            </Snackbar>
            <div className={styles.formConteiner}>
                <div className={styles.imgConteiner}>
                    <img src={LogoNav} className={styles.logo} alt='Logo' />
                </div>
                <div className={styles.inputs}>
                    <div className={styles.firstColumn}>
                        <div className={styles.textField}>
                            <TextField
                                label='Nombre'
                                variant='outlined'
                                id='name-input'
                                type='text'
                                name='name'
                                autoComplete='off'
                                className={classes.textField}
                                // size='small'
                                value={input.name}
                                onChange={(e) => handleInputChange(e)}
                                {...(errors.name && {
                                    error: errors.name,
                                    helperText: 'Nombre invalido',
                                })}
                            />
                        </div>
                        <div className={styles.textField}>
                            <TextField
                                label='Apellido'
                                variant='outlined'
                                id='lastname-input'
                                type='text'
                                name='lastname'
                                autoComplete='off'
                                className={classes.textField}
                                // size='small'
                                value={input.lastname}
                                onChange={(e) => handleInputChange(e)}
                                {...(errors.lastname && {
                                    error: errors.lastname,
                                    helperText: 'Apellido invalido',
                                })}
                            />
                        </div>
                        <div className={styles.textField}>
                            <TextField
                                label='DNI'
                                variant='outlined'
                                id='dni-input'
                                type='tel'
                                name='dni'
                                autoComplete='off'
                                className={classes.textField}
                                // size='small'
                                value={input.dni}
                                onChange={(e) => handleInputChange(e)}
                                {...(errors.dni && {
                                    error: true,
                                    helperText: 'Dni invalido',
                                })}
                                inputProps={{ maxLength: 8 }}
                            />
                        </div>
                    </div>
                    <div className={styles.secondColumn}>
                        <div className={styles.textField}>
                            <TextField
                                label='Fecha de nacimiento'
                                variant='outlined'
                                id='date-input'
                                type='date'
                                name='birthdate'
                                autoComplete='off'
                                className={classes.textField}
                                // size='small'
                                value={input.birthdate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className={styles.textField}>
                            <FormControl
                                variant='outlined'
                                className={classes.formControl}
                            >
                                <InputLabel htmlFor='mail-input'>
                                    Root
                                </InputLabel>
                                {/* <label htmlFor='mail-input'>Root?</label> */}
                                <Select
                                    label='Root'
                                    variant='outlined'
                                    id='mail-input'
                                    type='text'
                                    name='root'
                                    autoComplete='off'
                                    className={classes.textField}
                                    // size='small'
                                    value={input.root}
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                    onChange={(e) => handleInputChange(e)}
                                >
                                    <MenuItem value='true'>Si</MenuItem>
                                    <MenuItem value='false'>No</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={styles.textField}>
                            <TextField
                                label='E-mail'
                                variant='outlined'
                                id='mail-input'
                                type='text'
                                name='mail'
                                autoComplete='off'
                                className={classes.textField}
                                // size='small'
                                value={input.mail}
                                onChange={(e) => handleInputChange(e)}
                                {...(errors.mail && {
                                    error: true,
                                    helperText: 'Mail invalido',
                                })}
                            />
                        </div>
                    </div>

                    <div className={Styles.textField}>
                        <TextField
                            label='phone'
                            variant='outlined'
                            id='phone-input'
                            type='number'
                            name='phone'
                            autoComplete='off'
                            size='small'
                            value={input.phone}
                            onChange={(e) => handleInputChange(e)}
                            {...(errors.phoneNumber && {
                                error: true,
                                helperText: 'Telefono invalido',
                            })}
                        />
                    </div>

                    {/* <div className={Styles.textField}>
                        <TextField
                            id='outlined-search'
                            label='Contraseña'
                            variant='outlined'
                            id='password-input'
                            type='password'
                            name='password'
                            autoComplete='off'
                            size='small'
                            value={input.password}
                            onChange={(e) => handleInputChange(e)}
                            {...(errors.password && {
                                error: true,
                                helperText: 'Contraseña invalida',
                            })}
                        />
                    </div>
                    <div className={Styles.textField}>
                        <TextField
                            id='outlined-search'
                            label='Confirmas contraseña'
                            variant='outlined'
                            id='confirm-password-input'
                            type='password'
                            name='confirmPassword'
                            autoComplete='off'
                            size='small'
                            value={input.confirmPassword}
                            onChange={(e) => handleInputChange(e)}
                            {...(errors.confirmPassword && {
                                error: true,
                                helperText: 'Las contraseñas no son iguales',
                            })}
                        />
                    </div> */}
                </div>
                <div>
                    <Button
                        variant='contained'
                        color='primary'
                        // style={{ borderRadius: 100, margin: 10 }}
                        className={classes.button}
                        onClick={handleClickOpen}
                    >
                        Agregar Admin
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AdminRegistration;
