import React, { useState } from "react";
import Styles from './ContactForm.module.css'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qeubfsxlcvapzvjihzep.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDMyNDU4NCwiZXhwIjoxOTM1OTAwNTg0fQ.l9ZzKLUoPFsMWMCismH6RkXsEzBiSrDMylGB9V_HHjI'
const supabase = createClient(supabaseUrl, supabaseKey)

// const LOGOLOCAL = 'client/src/components/contact_form_guest/logo-integra.png';
const LOGO = "https://cdn.discordapp.com/attachments/837738450736250918/839883762019860490/manos1.png";

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
        width:'50%',
        height:'70%',
        background:'#e8ffff'
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
  })

function ContactForm(){
    const classes = useStyles();

    const[input,setInput] = useState({name:'',age:'',dni:'',phone_number:'',mail:''});
    const[errors,setErrors] = useState({name:false,age:false,dni:false,phone_number:false,mail:false});
    const[openGood, setOpenGood] =useState(false);
    const[openBad, setOpenBad] =useState(false);

    const handleClickOpen = async() => {
        if(!errors.age && !errors.dni && !errors.phone_number && !errors.mail && !errors.name){
            setOpenGood(true);
            const { data, error } = await supabase
            .from('request_form')
            .insert([
                { name: input.name, age: input.age, dni: input.dni, phone_number: input.phone_number, mail: input.mail},
            ])
            console.log(error)
            console.log(data)
        } else {
            setOpenBad(true);
        }
        setInput({name:'',age:'',dni:'',phone_number:'',mail:''});
    };
    
    const handleClose = () => {
        setOpenGood(false);
        setOpenBad(false);
    };

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value
            })
        );
    }

    function validate(input) {
        const mailPattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
        const numberPattern = /^\d*$/;
        let errors = {};
        if (!namePattern.test(input.name)) {
            errors.name = true;
        } else{
            errors.name = false;
        }

        if (!numberPattern.test(input.age)) {
            errors.age = true;
        } else{
            errors.age = false;
        }

        if (!numberPattern.test(input.dni)&&(input.dni.length===10)) {
            errors.dni = true;
        } else{
            errors.dni = false;
        }

        if (!numberPattern.test(input.phone_number)&&(input.phone_number.length<=12)) {
            errors.phone_number = true;
        } else{
            errors.phone_number = false;
        }

        if (!mailPattern.test(input.mail)) {
            errors.mail = true;
        } else{
            errors.mail = false;
        }
        return errors;
    };

    return(
        <div className={Styles.conteinerAll}>
            <ThemeProvider theme={theme}>
            <Card className={classes.root}>
                <Snackbar open={openGood} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Gracias por contactarse, nos comunicaremos con usted en breve.
                    </Alert>
                </Snackbar>
                <Snackbar open={openBad} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Error, verifique los datos.
                    </Alert>
                </Snackbar>
                <div className={Styles.formConteiner}>
                    <div className={Styles.inputs}>
                        <div className={Styles.imgConteiner}>
                            <img src={LOGO} alt="" />
                        </div>
                        <div className={Styles.textField}>
                            <label htmlFor="">Me llamo </label>
                            <TextField
                                id="name-input"
                                type="text"
                                name="name"
                                autoComplete='off'
                                value={input.name}
                                onChange={(e) => handleInputChange(e)}
                                {...(errors.name && {error:errors.name,helperText:'Nombre invalido'})}
                                />
                        </div>
                        <div className={Styles.textField}>
                            <label htmlFor="">Tengo </label>
                            <TextField
                                id="age-input"
                                type="tel"
                                name="age"
                                autoComplete='off'
                                value={input.age}
                                onChange={(e) => handleInputChange(e)}
                                {...errors.age && {error:true,helperText:'Edad invalido'}}
                                inputProps={{ maxLength: 3 }}
                            />
                            <label htmlFor=""> años.</label>
                        </div>
                        <div className={Styles.textField}>
                            <label htmlFor="">Mi DNI es </label>
                            <TextField
                                id="dni-input"
                                type="tel"
                                name="dni"
                                autoComplete='off'
                                value={input.dni}
                                onChange={(e) => handleInputChange(e)}
                                {...(errors.dni && {error:true,helperText:'Dni invalido'})}
                                inputProps={{ maxLength: 8 }}
                            />
                        </div>
                        <div className={Styles.textField}>
                            <label htmlFor="">Mi teléfono es </label>
                            <TextField
                                id="phone-input"
                                type="tel"
                                name="phone_number"
                                autoComplete='off'
                                value={input.phone_number}
                                onChange={(e) => handleInputChange(e)}
                                {...(errors.phone_number && {error:true,helperText:'Teléfono invalido'})}
                                inputProps={{ maxLength: 12 }}
                            />
                        </div>
                        <div className={Styles.textField}>
                            <label htmlFor="">Mi mail es </label>
                            <TextField
                                id="mail-input"
                                type="email"
                                name="mail"
                                autoComplete='off'
                                value={input.mail}
                                onChange={(e) => handleInputChange(e)}
                                {...(errors.mail && {error:true,helperText:'Mail invalido'})}
                            />
                        </div>
                    </div>
                    <div>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            style={{ borderRadius: 100 , margin: 10 }} 
                            onClick={handleClickOpen} 
                            disabled = {(!input.age && !input.dni && !input.phone_number && !input.mail && !input.name)}
                        >
                            Consultar
                        </Button>
                        <Button variant="contained" color="secondary" style={{ borderRadius: 100 , margin: 10 }} >
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