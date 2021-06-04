import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import {
    Button,
    List,
    ListItem,
    Divider,
    Card,
    Avatar,
    TextField,
    Typography,
} from '@material-ui/core';
import 'firebase/auth';
import calculateAge from '../../../functions/calculateAge';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Medicines from './Medicines/Medicines.jsx';
import PrintMeds from './PrintMeds/PrintMeds.jsx';
import Orders from './Orders/Orders.jsx';
import PrintOrders from './PrintOrders/PrintOrders.jsx';
import supabase from '../../../supabase.config.js';
import Swal from 'sweetalert2';
import styles from './Consult.module.css';

const useStyles = makeStyles((theme) => ({
    dividerFullWidth: {
        margin: `5px 0 0 ${theme.spacing(9)}px`,
    },
    card: {
        width:'100%',
    },
    textField: {
        width: '84%',
    },
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    divider:{
        listStyleType:'none',
    },
    title:{
        color:'#fafafa',
    },
    mainButton:{
        color:'#fafafa',
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#41aea9',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
    },
});

export default function Consult({ firebase }) {
    let classes = useStyles();

    // Inicialmente se trae los medicamentos del localstorage
    let meds = JSON.parse(localStorage.getItem('medicines')) || [];
    let [medicines, setMedicines] = useState(meds);

    // Inicialmente se trae las ordenes del localstorage
    let ords = JSON.parse(localStorage.getItem('orders')) || [];
    let [orders, setOrders] = useState(ords);

    var today = new Date();
    let date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();

    // Se trae la info del doc del localstorage
    let [medic] = useState(JSON.parse(localStorage.getItem('medicdata')));

    // Estado local con los datos del paciente
    let [patient, setPatient] = useState(null);

    // Cuando recarga la página setea los datos del paciente
    // que obtiene por query.
    useEffect(() => {
        // Se trae x query la info del paciente
        let search = window.location.search;
        let params = new URLSearchParams(search);
        setPatient({
            dni: params.get('dni'),
            name: params.get('name'),
            lastname: params.get('lastname'),
            birthdate: params.get('birthdate'),
            gender: params.get('gender'),
            email: params.get('email'),
        });
    }, []);

    // La información de la consulta se guarda en infObj
    let infObj = {
        date,
        doctor: {
            name: medic.name,
            lastname: medic.lastname,
            medical_specialities: medic.medical_specialities,
            medic_license: medic.medic_license,
        },
        patient: null,
        diagnosis: null,
        medicines,
        orders,
    };

    // Una vez seteados los datos del paciente los guarda
    // en la info a compartir.
    useEffect(() => {
        if (patient) {
            infObj.patient = {
                name: patient.name,
                lastname: patient.lastname,
                plan: patient.plan,
                affiliate_number: patient.dni,
            };
        }
        //eslint-disable-next-line
    }, [patient]);

    const getAge = () =>

        Math.floor(
            // (new Date() - new Date(patient.birthdate).getTime()) / 3.15576e10
            2.3
        );

    function sendEmailConsult(props) {
        emailjs
            .send(
                'service_wcpzjw7',
                'template_qkdom45',
                props,
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


    let [input, setInput] = useState({
        reason: '',
        diagnosis: '',
        observations: '',
        posology: '',
    });

    let [errors, setErrors] = useState({
        reason: true,
        diagnosis: true,
        observations: false,
    });

    function validate(inputName, value, errors) {
        const pattern = /^[A-Za-z0-9\s]+$/g;

        switch (inputName) {
            case 'reason': {
                if (!pattern.test(value) || value.length === 0) {
                    errors.reason = true;
                } else {
                    errors.reason = false;
                }
                break;
            }
            case 'diagnosis': {
                if (!pattern.test(value) || value.length === 0) {
                    errors.diagnosis = true;
                } else {
                    errors.diagnosis = false;
                }
                break;
            }
            case 'observations': {
                if (!pattern.test(value)) {
                    errors.observations = true;
                } else {
                    errors.observations = false;
                }
                break;
            }
            default:
                return null;
        }
        return errors;
    }

    const handleInputChange = (e) => {
        setErrors(validate(e.target.name, e.target.value,errors));
        console.log(errors)
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        let medicines = JSON.parse(localStorage.getItem('medicines'));
        let orders = JSON.parse(localStorage.getItem('orders'));
        if (!errors.reason && !errors.diagnosis && !errors.observations) {
            console.log('paso los errores')
            const { data: newConsult ,error:errorInsert} = await supabase
                .from('medical_consultations')
                .insert([
                    {
                        partner_dni: patient.dni,
                        medic_dni: medic.dni,
                        reason: input.reason,
                        diagnosis: input.diagnosis,
                        observations: input.observations,
                    },
                ]);
                console.error(errorInsert);

            let consultationId = newConsult[0].id;
            if (newConsult) {
                if (medicines) {
                    sendEmailConsult({
                        dr: medic,
                        patient: patient,
                        date,
                        consult: input,
                        prescriptions: medicines.join(' '),
                    });
                } else {
                    sendEmailConsult({
                        dr: medic,
                        patient: patient,
                        date,
                        consult: input,
                        prescriptions: 'nada',
                    });
                }
            }
            if (medicines) {
                await supabase.from('prescriptions').insert([
                    {
                        medical_consultation_id: consultationId,
                        drug_name: medicines[0],
                        date: date,
                        drug_name_2: medicines.length > 1 ? medicines[1] : '',
                        partner_dni: patient.dni,
                    },
                ]);
            }
            if (orders) {
                await supabase.from('orders').insert([
                    {
                        medical_consultation_id: consultationId,
                        study_name: orders[0],
                        date: date,
                        partner_dni: patient.dni,
                        status: 'en espera de autorizacion',
                        medic_dni: medic.dni,
                    },
                ]);
            }
            Swal.fire({
                title: 'Hecho!',
                text: 'La consulta fué subida correctamente',
                icon: 'success',
                showConfirmButton: true,
                reverseButtons: true,
            }).then((el) => {
                if (el.isConfirmed) {
                    localStorage.removeItem('medicines');
                    localStorage.removeItem('orders');
                    let new_window = window.open(window.location, '_self');
                    new_window.close();
                }
            });

            // sendEmailConsult({dr:medic, patient: patientData, date:today, consult: input})
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Revisa los campos!',
            });
        }
    };

    // Al cambiar una medicina guarda
    // en la info a compartir a Medicines.jsx.
    useEffect(() => {
        if (medicines.length) {
            infObj.medicines = medicines;
        }
        //eslint-disable-next-line
    }, [medicines]);

    // Función que obtiene las modificaciones de los medicamentos
    // traidas del componente Medicines
    function getterMed(arr) {
        setMedicines(arr);
        return;
    }

    // Una vez seteados los cambios de medicamentos los guarda
    // en la info a compartir.
    useEffect(() => {
        if (medicines.length) {
            infObj.medicines = medicines;
        }
        //eslint-disable-next-line
    }, [medicines]);

    // Función que obtiene las modificaciones de las órdenes
    // traidas del componente Medicines
    function getterOrder(arr) {
        setOrders(arr);
        return;
    }

    // Una vez seteados los cambios de medicamentos los guarda
    // en la info a compartir.
    useEffect(() => {
        if (orders.length) {
            infObj.orders = orders;
        }
        //eslint-disable-next-line
    }, [orders]);

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.cardContainer}>
                <section className={styles.section}>
                    <h2>Consulta</h2>
                </section>
                <div className={styles.formContainer}>
                    <Card className={classes.card}>
                        {/* <List> */}
                            {medic && (
                                <div className={styles.medicData}>
                                    <div className={styles.medicFirstColumn}>
                                        <div>
                                            <ListItem>
                                                <Avatar
                                                    alt={medic.name}
                                                    src={medic.profilePic}
                                                    className={classes.largeAvatar}
                                                />
                                            </ListItem>
                                        </div>
                                        <div>
                                            <ListItem>
                                                <Typography
                                                    gutterBottom
                                                    variant='h5'
                                                    component='h2'
                                                >
                                                    {medic.name} {medic.lastname}
                                                </Typography>
                                            </ListItem>
                                        </div>
                                    </div>
                                    <div className={styles.medicSecondColumn}>
                                        <div>
                                            <ListItem>
                                                <Typography
                                                    gutterBottom
                                                    variant='subtitle1'
                                                    component='h2'
                                                >
                                                    {medic.medic_license}
                                                </Typography>
                                            </ListItem>
                                        </div>
                                        <div>
                                            <ListItem>
                                                <Typography
                                                    gutterBottom
                                                    variant='subtitle1'
                                                    component='h2'
                                                >
                                                    {medic.medical_specialities[0].name}
                                                </Typography>
                                            </ListItem>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <Divider component='li' className={classes.divider}/>
                            {patient && (
                                <div className={styles.patientData}>
                                    <div className={styles.patientFirstColumn}>
                                        <div>
                                            <ListItem>
                                                <Typography
                                                    gutterBottom
                                                    variant='h6'
                                                    component='h2'
                                                >
                                                    Paciente:
                                                </Typography>
                                            </ListItem>
                                        </div>
                                        <div>
                                            <ListItem>
                                                <Typography
                                                    gutterBottom
                                                    variant='h5'
                                                    component='h2'
                                                >
                                                    {patient.name} {patient.lastname}
                                                </Typography>
                                            </ListItem>
                                        </div>
                                    </div>
                                    <div className={styles.patientSecondColumn}>
                                        <div>
                                            <ListItem>
                                                <Typography
                                                    gutterBottom
                                                    variant='subtitle1'
                                                    component='h2'
                                                >
                                                    DNI: {patient.dni}
                                                </Typography>
                                            </ListItem>
                                        </div>
                                        <div>
                                            <ListItem>
                                                <Typography
                                                    gutterBottom
                                                    variant='subtitle1'
                                                    component='h2'
                                                >
                                                    Edad: {calculateAge(patient.birthdate)}
                                                </Typography>
                                            </ListItem>
                                        </div>
                                        <div>
                                            <ListItem>
                                                <Typography
                                                    gutterBottom
                                                    variant='subtitle1'
                                                    component='h2'
                                                >
                                                    Sexo: {patient.gender}
                                                </Typography>
                                            </ListItem>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <Divider component='li' className={classes.divider} />
                            <div className={styles.form}>
                                <div className={styles.input}>
                                    <TextField
                                        id='reason-input'
                                        name='reason'
                                        label='Razón de consulta'
                                        variant='outlined'
                                        multiline
                                        value={input.reason}
                                        rows={6}
                                        className={classes.textField}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.input}>
                                    <TextField
                                        id='diagnosis-input'
                                        name='diagnosis'
                                        className={classes.textField}
                                        label='Diagnóstico'
                                        variant='outlined'
                                        // value={input.diagnosis}
                                        multiline
                                        rows={6}
                                        className={classes.textField}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.input}>
                                    <TextField
                                        id='ovservations-input'
                                        name='observations'
                                        label='Observaciones'
                                        variant='outlined'
                                        value={input.observations}
                                        multiline
                                        rows={6}
                                        className={classes.textField}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <Divider component='li' className={classes.divider} />
                            <div className={styles.medicines}>
                                <div className={styles.mydiv} autoFocus>
                                    <p className={styles.mydivt}>Medicación indicada:</p>
                                    {medicines && (
                                        <div>
                                            <ul>
                                                {!!medicines.length &&
                                                    medicines.map((med, index) => (
                                                        <li
                                                            className={styles.limed}
                                                            key={index}
                                                        >
                                                            {med}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className={styles.onelinebtns}>
                                        <Medicines handleEvent={getterMed} />
                                        {patient && <PrintMeds info={infObj} />}
                                    </div>
                                </div>
                                <div className={styles.mydiv2} autoFocus>
                                    <p className={styles.mydivt2}>
                                        Posología y administración:
                                    </p>
                                    <input
                                        id='posologia-input'
                                        name='posology'
                                        className={styles.posinput}
                                        onChange={handleInputChange}
                                    />
                                    <Button
                                        name='guardar'
                                        className={styles.btnprint}
                                        size='small'
                                        variant='outlined'
                                        color='primary'
                                    >
                                        Imprimir
                                    </Button>
                                </div>
                            </div>
                            <Divider component='li' className={classes.divider} />
                            <div className={styles.orders}>
                                <div className={styles.mydiv} autoFocus>
                                    <p className={styles.mydivt}>Estudios solicitados:</p>
                                    {orders && (
                                        <div>
                                            <ul>
                                                {!!orders.length &&
                                                    orders.map((med, index) => (
                                                        <li
                                                            className={styles.limed}
                                                            key={index}
                                                        >
                                                            {med}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className={styles.onelinebtns}>
                                        <Orders handleEvent={getterOrder} />
                                        {patient && <PrintOrders info={infObj} />}
                                    </div>
                                </div>
                                <div className={styles.mydiv2} autoFocus>
                                    <p className={styles.mydivt2}>
                                        Indicaciones para la realización de los estudios:
                                    </p>
                                    <input
                                        id='indicaciones-input'
                                        name='instructions'
                                        className={styles.posinput}
                                        onChange={handleInputChange}
                                    />
                                    <Button
                                        name='guardar'
                                        className={styles.btnprint}
                                        size='small'
                                        variant='outlined'
                                        color='primary'
                                    >
                                        Imprimir
                                    </Button>
                                </div>
                            </div>
                            <Divider component='li' className={classes.divider} />
                            <div className={styles.buttons}>
                                <div className={styles.btn}>
                                    <Button
                                        className={classes.mainButton}
                                        variant='contained'
                                        size='large'
                                        color='primary'
                                        onClick={handleSubmit}
                                    >
                                        Subir consulta
                                    </Button>
                                </div>
                            </div>
                        {/* </List> */}
                    </Card>
                </div>
            </div>
        </ThemeProvider>
    );
}
