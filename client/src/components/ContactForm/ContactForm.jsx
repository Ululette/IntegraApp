import React, { useState } from 'react';
import Styles from './ContactForm.module.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

// const LOGOLOCAL = 'client/src/components/contact_form_guest/logo-integra.png';
const LOGO = '../../assets/images/logo-simple.png';

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
        //   minWidth: 275,
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

function ContactForm() {
    const classes = useStyles();

    const [openGood, setOpenGood] = useState(false);
    const [openBad, setOpenBad] = useState(false);
    const [name, setName] = useState('');
    const [old, setOld] = useState('');
    const [dni, setDni] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');

    const mailPattern = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
    const namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    const numberPattern = /^\d*$/;
    const mailResult = mailPattern.test(mail);
    const nameResult = namePattern.test(name);
    const oldResult = numberPattern.test(old);
    const dniResult = numberPattern.test(dni);
    const phoneResult = numberPattern.test(phone);

    const handleClickOpen = () => {
        if (nameResult && oldResult && dniResult && phoneResult && mailResult) {
            setOpenGood(true);
        } else {
            setOpenBad(true);
        }
    };

    const handleClose = () => {
        setOpenGood(false);
        setOpenBad(false);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleOldChange = (event) => {
        setOld(event.target.value);
    };
    const handleDniChange = (event) => {
        setDni(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const handleMailChange = (event) => {
        setMail(event.target.value);
    };

    return (
        <div className={Styles.conteinerAll}>
            <ThemeProvider theme={theme}>
                <Card className={classes.root}>
                    <Snackbar
                        open={openGood}
                        autoHideDuration={6000}
                        onClose={handleClose}
                    >
                        <Alert onClose={handleClose} severity='success'>
                            Gracias por contactarse, nos comunicaremos con usted
                            en breve.
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={openBad}
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
                                <img src={LOGO} alt='' />
                            </div>
                            <div className={Styles.textField}>
                                <label htmlFor=''>Me llamo </label>
                                <TextField
                                    id='name-input'
                                    type='text'
                                    autoComplete='off'
                                    value={name}
                                    onChange={(e) => handleNameChange(e)}
                                />
                            </div>
                            <div className={Styles.textField}>
                                <label htmlFor=''>Tengo </label>
                                <TextField
                                    id='old-input'
                                    type='tel'
                                    autoComplete='off'
                                    value={old}
                                    onChange={(e) => handleOldChange(e)}
                                    inputProps={{ maxLength: 3 }}
                                />
                                <label htmlFor=''> años.</label>
                            </div>
                            <div className={Styles.textField}>
                                <label htmlFor=''>Mi DNI es </label>
                                <TextField
                                    id='dni-input'
                                    type='tel'
                                    autoComplete='off'
                                    value={dni}
                                    onChange={(e) => handleDniChange(e)}
                                    inputProps={{ maxLength: 8 }}
                                />
                            </div>
                            <div className={Styles.textField}>
                                <label htmlFor=''>Mi teléfono es </label>
                                <TextField
                                    id='phone-input'
                                    type='tel'
                                    autoComplete='off'
                                    value={phone}
                                    onChange={(e) => handlePhoneChange(e)}
                                    inputProps={{ maxLength: 12 }}
                                />
                            </div>
                            <div className={Styles.textField}>
                                <label htmlFor=''>Mi mail es </label>
                                <TextField
                                    id='mail-input'
                                    type='email'
                                    autoComplete='off'
                                    value={mail}
                                    onChange={(e) => handleMailChange(e)}
                                    inputProps={{ maxLength: 40 }}
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                variant='contained'
                                color='primary'
                                style={{ borderRadius: 100, margin: 10 }}
                                onClick={handleClickOpen}
                                disabled={
                                    !(
                                        nameResult &&
                                        oldResult &&
                                        dniResult &&
                                        phoneResult &&
                                        mailResult
                                    )
                                }
                            >
                                Consultar
                            </Button>
                            <Button
                                variant='contained'
                                color='secondary'
                                style={{ borderRadius: 100, margin: 10 }}
                            >
                                Volver
                            </Button>
                        </div>
                    </div>
                </Card>
            </ThemeProvider>
        </div>
    );
}

export default ContactForm;
