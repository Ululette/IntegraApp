import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Styles from '../ContactForm/ContactForm.module.css';
import LogoNav from '../../assets/logo-integra.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import supabase from '../../supabase.config';
import 'firebase/auth';
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#41aea9',
        },
        secondary: {
            main: '#e8ffff',
        },
    },
});

const useStyles = makeStyles({
    root: {
        width: '50%',
        height: '70%',
        background: '#e8ffff',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
function AdminRegistration({ firebase }) {
    const [input, setInput] = useState({
        name: '',
        lastname: '',
        dni: '',
        mail: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        name: false,
        lastname: false,
        dni: false,
        mail: false,
        password: false,
        confirmPassword: false,
    });

    const [successRequest, setSuccessRequest] = useState(false);
    const [errorRequest, setErrorRequest] = useState(false);

    const handleClickOpen = async () => {
        if (
            !errors.name &&
            !errors.lastname &&
            !errors.dni &&
            !errors.mail &&
            !errors.password &&
            !errors.confirmPassword
        ) {
            setSuccessRequest(true);
            await supabase.from('users').insert([
                {
                    role: 'admin',
                    name: input.name.toLowerCase(),
                    lastname: input.lastname.toLowerCase(),
                    id: input.dni,
                    email: input.mail.toLowerCase(),
                },
            ]);

            await firebase
                .auth()
                .createUserWithEmailAndPassword(input.mail, input.password);
            alert('Usuario creado');

            setInput({
                name: '',
                lastname: '',
                dni: '',
                mail: '',
                password: '',
                confirmPassword: '',
            });
        } else {
            setErrorRequest(true);
        }
    };

    const handleClose = () => {
        setSuccessRequest(false);
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
            case 'mail': {
                if (!mailPattern.test(value)) {
                    errors.mail = true;
                } else {
                    errors.mail = false;
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
        <div className={Styles.conteinerAll}>
            <h2> Agregar nuevo admin </h2>
            <Snackbar
                open={errorRequest}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity='error'>
                    Error, verifique los datos.
                </Alert>
            </Snackbar>
            <div className={Styles.formConteiner}>
                <div className={Styles.inputs}>
                    <div className={Styles.imgConteiner}>
                        <img src={LogoNav} alt='Logo' />
                    </div>
                    <div className={Styles.textField}>
                        <TextField
                            id='outlined-search'
                            label='Nombre'
                            variant='outlined'
                            id='name-input'
                            type='text'
                            name='name'
                            autoComplete='off'
                            size='small'
                            value={input.name}
                            onChange={(e) => handleInputChange(e)}
                            {...(errors.name && {
                                error: errors.name,
                                helperText: 'Nombre invalido',
                            })}
                        />
                    </div>
                    <div className={Styles.textField}>
                        <TextField
                            id='outlined-search'
                            label='Apellido'
                            variant='outlined'
                            id='lastname-input'
                            type='text'
                            name='lastname'
                            autoComplete='off'
                            size='small'
                            value={input.lastname}
                            onChange={(e) => handleInputChange(e)}
                            {...(errors.lastname && {
                                error: errors.lastname,
                                helperText: 'Apellido invalido',
                            })}
                        />
                    </div>
                    <div className={Styles.textField}>
                        <TextField
                            id='outlined-search'
                            label='DNI'
                            variant='outlined'
                            id='dni-input'
                            type='tel'
                            name='dni'
                            autoComplete='off'
                            size='small'
                            value={input.dni}
                            onChange={(e) => handleInputChange(e)}
                            {...(errors.dni && {
                                error: true,
                                helperText: 'Dni invalido',
                            })}
                            inputProps={{ maxLength: 8 }}
                        />
                    </div>

                    <div className={Styles.textField}>
                        <TextField
                            id='outlined-search'
                            label='E-mail'
                            variant='outlined'
                            id='mail-input'
                            type='text'
                            name='mail'
                            autoComplete='off'
                            size='small'
                            value={input.mail}
                            onChange={(e) => handleInputChange(e)}
                            {...(errors.mail && {
                                error: true,
                                helperText: 'Mail invalido',
                            })}
                        />
                    </div>
                    <div className={Styles.textField}>
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
                    </div>
                </div>
                <div>
                    <Button
                        variant='contained'
                        color='primary'
                        style={{ borderRadius: 100, margin: 10 }}
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
