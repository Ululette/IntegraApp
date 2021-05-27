import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Styles from './ContactForm.module.css';
import emailjs from 'emailjs-com';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
// import { _reCAPTCHA_site_key_ } from '../../../recaptcha.config.js';
import supabase from '../../../supabase.config';
import Recaptcha from 'react-recaptcha';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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
        width: '90%',
        height: '100%',
        background: '#1c8383',
        border: 'none',
        boxShadow: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
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
    textField: {
        width: '200px',
    },
});

function ContactForm() {
    const classes = useStyles();
    const MySwal = withReactContent(Swal);

    const [input, setInput] = useState({
        name: '',
        age: '',
        dni: '',
        phone_number: '',
        email: '',
    });

    const [errors, setErrors] = useState({
        name: false,
        age: false,
        dni: false,
        phone_number: false,
        email: false,
        onProcess: false,
    });
    const [successRequest, setSuccessRequest] = useState(false);
    const [errorRequest, setErrorRequest] = useState(false);
    const [captchaResolve, setCaptchaResolve] = useState(false);

    const handleClickOpen = async () => {
        if (!captchaResolve) {
            MySwal.fire({
                title: 'Completa el captcha para continuar!',
                icon: 'info',
                timer: 2500,
            });
        }
        if (
            !errors.age &&
            !errors.dni &&
            !errors.phone_number &&
            !errors.email &&
            !errors.name &&
            !errors.onProcess &&
            captchaResolve
        ) {
            setSuccessRequest(true);
            const { data: contactFormResolve } = await supabase
                .from('guest_contacts')
                .insert([
                    {
                        dni: parseInt(input.dni),
                        name: input.name,
                        age: parseInt(input.age),
                        phone_number: parseInt(input.phone_number),
                        email: input.email,
                    },
                ]);

            contactFormResolve && sendEmail();

            setInput({
                name: '',
                age: '',
                dni: '',
                phone_number: '',
                email: '',
            });
        } else {
            console.log('Hay errores!', errors);
            setErrorRequest(true);
        }
    };

    const handleClose = () => {
        setSuccessRequest(false);
        setErrorRequest(false);
    };
    const handleBack = () => {
        setSuccessRequest(false);
    };

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrors(validate(e.target.name, e.target.value));
    };

    function validate(inputName, value) {
        const emailPattern =
            /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
        const namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
        const numberPattern = /^[0-9\b]+$/;
        var validateErrors = errors;

        switch (inputName) {
            case 'name': {
                if (!namePattern.test(value)) {
                    validateErrors = { ...errors, [inputName]: true };
                } else {
                    validateErrors = { ...errors, [inputName]: false };
                }
                break;
            }
            case 'age': {
                if (!numberPattern.test(value)) {
                    validateErrors = { ...errors, [inputName]: true };
                } else {
                    validateErrors = { ...errors, [inputName]: false };
                }
                break;
            }
            case 'dni': {
                if (!numberPattern.test(value) || value.length !== 8) {
                    validateErrors = { ...errors, [inputName]: true };
                } else {
                    validateErrors = { ...errors, [inputName]: false };
                }
                break;
            }
            case 'phone_number': {
                if (!numberPattern.test(value) || value.length < 10) {
                    validateErrors = { ...errors, [inputName]: true };
                } else {
                    validateErrors = { ...errors, [inputName]: false };
                }
                break;
            }
            case 'email': {
                inputEmailFetchCheck(value);
                if (!emailPattern.test(value)) {
                    validateErrors = { ...errors, [inputName]: true };
                } else {
                    validateErrors = { ...errors, [inputName]: false };
                }
                break;
            }
            default:
                return null;
        }
        console.log(validateErrors);
        return validateErrors;
    }

    async function inputEmailFetchCheck(email) {
        const { data: emails } = await supabase
            .from('guest_contacts')
            .select('email')
            .eq('email', email);
        emails && console.log('emails!', emails);
        console.log(emails.length > 0);
        setErrors({ ...errors, onProcess: emails.length > 0 });
    }

    function sendEmail() {
        emailjs
            .send(
                'service_wcpzjw7',
                'template_r93a6bs',
                input,
                'user_mgft1j53RDkaGc1EWyKNK'
            )
            .then(
                (result) => {
                    console.log('resultado:', result.text);
                },
                (error) => {
                    console.log('error:', error.text);
                }
            );
    }

    function recaptchaLoaded() {
        console.log('Recaptcha loaded');
    }

    const verifyCaptcha = (response) => {
        if (response) {
            setCaptchaResolve(true);
        } else {
            setCaptchaResolve(false);
        }
    };

    const success = () => {
        if (successRequest) {
            return (
                <div
                    className={Styles.successRequest}
                    style={!successRequest ? { display: 'none' } : {}}
                >
                    <div className={Styles.successRequestContent}>
                        <p className={Styles.successRequestTitle}>
                            ¡Gracias por escribirnos!
                        </p>
                        <div></div>
                        <div>
                            <p className={Styles.successRequestSubTitle}>
                                Un asesor se comunicara con vos
                            </p>
                            <p className={Styles.successRequestSubTitle}>
                                para charlar sobre tu próximo plan.
                            </p>
                        </div>
                        <Button
                            className={Styles.buttonVolverSuccess}
                            variant='contained'
                            color='secondary'
                            onClick={handleBack}
                            style={{ borderRadius: 100 }}
                        >
                            Volver
                        </Button>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div className={Styles.conteinerAll}>
            <ThemeProvider theme={theme}>
                {success()}
                <Card className={classes.root}>
                    <Snackbar
                        open={errorRequest}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity='error'>
                            Error! Verifique sus datos
                        </Alert>
                    </Snackbar>
                    <div className={Styles.formConteiner}>
                        <div className={Styles.inputs}>
                            <div className={Styles.textField}>
                                <label htmlFor=''>Me llamo </label>
                                <TextField
                                    id='name-input'
                                    type='text'
                                    className={classes.textField}
                                    name='name'
                                    autoComplete='off'
                                    value={input.name}
                                    onChange={(e) => handleInputChange(e)}
                                    {...(errors.name && {
                                        error: errors.name,
                                        helperText: 'Nombre invalido',
                                    })}
                                />
                            </div>
                            <div className={Styles.textField}>
                                <label htmlFor=''>Tengo </label>
                                <TextField
                                    id='age-input'
                                    type='tel'
                                    name='age'
                                    className={classes.textField}
                                    autoComplete='off'
                                    value={input.age}
                                    onChange={(e) => handleInputChange(e)}
                                    {...(errors.age && {
                                        error: true,
                                        helperText: 'Edad invalido',
                                    })}
                                    inputProps={{ maxLength: 3 }}
                                />
                                <label htmlFor=''> años.</label>
                            </div>
                            <div className={Styles.textField}>
                                <label htmlFor=''>Mi DNI es </label>
                                <TextField
                                    id='dni-input'
                                    type='tel'
                                    className={classes.textField}
                                    name='dni'
                                    autoComplete='off'
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
                                <label htmlFor=''>Mi teléfono es </label>
                                <TextField
                                    id='phone-input'
                                    type='tel'
                                    className={classes.textField}
                                    name='phone_number'
                                    autoComplete='off'
                                    value={input.phone_number}
                                    onChange={(e) => handleInputChange(e)}
                                    {...(errors.phone_number && {
                                        error: true,
                                        helperText: 'Teléfono invalido',
                                    })}
                                    inputProps={{ maxLength: 12 }}
                                />
                            </div>
                            <div className={Styles.textField}>
                                <label htmlFor=''>Mi email es </label>
                                <TextField
                                    id='email-input'
                                    type='text'
                                    className={classes.textField}
                                    name='email'
                                    autoComplete='off'
                                    value={input.email}
                                    onChange={(e) => handleInputChange(e)}
                                    {...(errors.email && {
                                        error: true,
                                        helperText: 'eMail invalido',
                                    })}
                                />
                            </div>
                        </div>
                        <Recaptcha
                            sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                            render='explicit'
                            onloadCallback={recaptchaLoaded}
                            verifyCallback={verifyCaptcha}
                        />
                        <div>
                            <Button
                                variant='contained'
                                color='primary'
                                style={{ borderRadius: 100, margin: 10 }}
                                onClick={handleClickOpen}
                                disabled={
                                    !input.age ||
                                    !input.dni ||
                                    !input.phone_number ||
                                    !input.email ||
                                    !input.name ||
                                    !captchaResolve
                                }
                            >
                                Consultar
                            </Button>
                        </div>
                        <Snackbar
                            open={errorRequest && errors.onProcess}
                            autoHideDuration={4000}
                            onClose={handleClose}
                        >
                            <Alert onClose={handleClose} severity='info'>
                                Éste correo ya tiene una solicitud en proceso!
                            </Alert>
                        </Snackbar>
                    </div>
                </Card>
            </ThemeProvider>
        </div>
    );
}

export default ContactForm;
