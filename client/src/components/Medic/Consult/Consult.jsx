import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Redirect } from "react-router-dom";
import NewPrescriptionDialog from './NewPrescriptionDialog/NewPrescriptionDialog.jsx';
import NewOrderDialog from './NewOrderDialog/NewOrderDialog.jsx';
import Medicines from './Medicines/Medicines.jsx';
import {
  Button,
  List,
  ListItem,
  Divider,
  Card,
  Avatar,
  TextField,
  Typography
} from '@material-ui/core';
import 'firebase/auth';
import { makeStyles } from '@material-ui/core/styles';
import supabase from '../../../supabase.config';
import { useUser } from 'reactfire';
import style from './Consult.module.css';
// import { NavLink } from 'react-router-dom';
//path= /50607080/medic/patients/9800178/newconsultation

const useStyles = makeStyles((theme) => ({
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
  card: {
    maxWidth: '90%',
  },
  textField: {
    width: '90%',
  },
  largeAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

//---------------------------------------------------------
export default function Consult({ firebase }) {

  const hardPatient = {
    id: 3,
    dni: 9800178,
    name: 'Stella',
    lastname: 'Jensen',
    birthdate: "1988-09-12",
    phone_number: '(0074)-651-7355',
    email: 'nec.mauris.blandit@faucibusut.ca',
    gender: 'mujer',
    plan: 'Integra 410'
  }
  const hardMedic = {
    address: "Inglaterra 234, England, England, England",
    birthdate: "1975-09-12",
    dni: 50607080,
    email: "soyelmedicoramon@mail.com",
    lastname: "El Medico",
    medic_license: "MN5465321",
    medical_specialities: [{ id: 28, name: "farrukologia" }],
    name: "Ramon",
    phone_number: "1122334455667323",
    profilePic: "https://img.freepik.com/vector-gratis/diseno-ilustracion-vector-personaje-avatar-hombre-joven_24877-18514.jpg?size=338&ext=jpg",
    state: "activo",
  }

  const [patient, setPatient] = useState({});
  const [medic, setMedic] = useState({});
  const [redirectNewOrder, setRedirectNewOrder] = useState(false);
  const [redirectNewPrescription, setRedirectNewPrescription] = useState(false);

  let fetchMedicData = async (document) => {
    try {
      let { data: medicData } = await supabase
        .from('medics')
        .select(
          'dni, name, lastname, medic_license, phone_number, email, profilePic, medical_specialities(id,name))'
        )
        .eq('dni', document);
      setMedic(medicData[0]);
      // console.log(medic);
    } catch (err) {
      console.error(err);
    }
    return;
  };

  const classes = useStyles();
  const userFirebase = useUser();

  const [input, setInput] = useState({
    reason: '',
    diagnosis: '',
    observations: '',
    prescriptions: ''
  })
  const [errors, setErrors] = useState({
    reason: false,
    diagnosis: false,
    observations: false,
    prescriptions: false
  });

  useEffect(() => {
    let userDni = JSON.parse(localStorage.getItem('userdata')).dni;
    // console.log('DNI user:' + userDni);
    fetchMedicData(userDni);
  }, [])

  const getAge = () => Math.floor((new Date() - new Date(hardPatient.birthdate).getTime()) / 3.15576e+10)
  var today = new Date();
  var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

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


  const handleSubmit = async () => {
    if (!errors.reason &&
      !errors.diagnosis &&
      !errors.observations &&
      !errors.prescriptions) {
      const { data : newConsult, error } = await supabase
        .from('medical_consultations')
        .insert([
          {
            reason: input.reason,
            diagnosis: input.diagnosis,
            observations: input.observations,
            prescriptions: input.prescriptions
          },
        ])
      sendEmailConsult({
        date,
        doctor: hardMedic,
        patient: hardPatient,
        consult: newConsult ? newConsult : input
      }) 
    }
  }

  const handleBtnNewPrescription = () => {
    setRedirectNewPrescription(true);
  };
  const handleBtnNewOrder = () => {
    setRedirectNewOrder(true);
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate(e.target.name, e.target.value));
  };

  const renderRedirectNewPrescription = () => {
    if (redirectNewPrescription) {
      return <Redirect to='/' />;
    }
  };
  const renderRedirectNewOrder = () => {
    if (redirectNewOrder) {
      return <Redirect to='/' />;
    }
  };

  function validate(inputName, value) {
    const pattern = /^[A-Za-z0-9\s]+$/g;
    let errors = {};

    switch (inputName) {
      case 'reason': {
        if (!pattern.test(value)) {
          errors.reason = true;
        } else {
          errors.reason = false;
        }
        break;
      }
      case 'diagnosis': {
        if (!pattern.test(value)) {
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
      case 'prescriptions': {
        if (!pattern.test(value)) {
          errors.prescriptions = true;
        } else {
          errors.prescriptions = false;
        }
        break;
      }
      default:
        return null;
    }
    return errors;
  }


  //-------------------------------------------------------------------
  // OJO!!!! Cuando guarde la consulta hacer un dispatch al store para limpiar las medicinas:   
  //  dispatch(setMedicines([]));
  let medicines = JSON.parse(localStorage.getItem('medicines'));

  let infObj = {
    date,
    doctor: { name: hardMedic.name, lastname: hardMedic.lastname, medical_specialities: hardMedic.medical_specialities, medic_license: hardMedic.medic_license },
    patient: { name: hardPatient.name, lastname: hardPatient.lastname, plan: hardPatient.plan, affiliate_number: hardPatient.dni },
    diagnosis: 'Hipertiroidismo',
    medicines
  }

  useEffect(() => {
    if (medicines) {
      console.log(medicines)
    }
  }, [medicines])

  return (
    <Card className={classes.card}>
      <List>
        <div className={style.medicData}>
          <div className={style.medicFirstColumn}>
            <div>
              <ListItem>
                <Avatar alt={hardMedic.name} src={hardMedic.profilePic} className={classes.largeAvatar} />
              </ListItem>
            </div>
            <div>
              <ListItem>
                <Typography gutterBottom variant="h5" component="h2">
                  {hardMedic.name} {hardMedic.lastname}
                </Typography>
              </ListItem>
            </div>
          </div>
          <div className={style.medicSecondColumn}>
            <div>
              <ListItem>
                <Typography gutterBottom variant="subtitle1" component="h2">
                  {hardMedic.medic_license}
                </Typography>
              </ListItem>
            </div>
            <div>
              <ListItem>
                <Typography gutterBottom variant="subtitle1" component="h2">
                  {hardMedic.medical_specialities[0].name}
                </Typography>
              </ListItem>
            </div>
          </div>
        </div>
        <Divider component="li" />
        <div className={style.patientData}>
          <div className={style.patientFirstColumn}>
            <div>
              <ListItem>
                <Typography gutterBottom variant="h6" component="h2">
                  Paciente:
                </Typography>
              </ListItem>
            </div>
            <div>
              <ListItem>
                <Typography gutterBottom variant="h5" component="h2">
                  {hardPatient.name} {hardPatient.lastname}
                </Typography>
              </ListItem>
            </div>
          </div>
          <div className={style.patientSecondColumn}>
            <div>
              <ListItem>
                <Typography gutterBottom variant="subtitle1" component="h2">
                  DNI: {hardPatient.dni}
                </Typography>
              </ListItem>
            </div>
            <div>
              <ListItem>
                <Typography gutterBottom variant="subtitle1" component="h2">
                  Edad: {getAge()}
                </Typography>
              </ListItem>
            </div>
            <div>
              <ListItem>
                <Typography gutterBottom variant="subtitle1" component="h2">
                  Sexo: {hardPatient.gender}
                </Typography>
              </ListItem>
            </div>
          </div>
        </div>
        <Divider component="li" />
        <div className={style.form}>
          <div className={style.input}>
            <TextField
              id="reason-input"
              name='reason'
              label="Razón de consulta"
              variant='outlined'
              multiline
              rows={6}
              className={classes.textField}
              onChange={handleInputChange}
              {...(errors.reason && {
                error: true,
                helperText: 'Solo se permiten letras y numeros',
              })}
            />
          </div>
          <div className={style.input}>
            <TextField
              id="diagnosis-input"
              name='diagnosis'
              label="Diagnóstico"
              variant='outlined'
              multiline
              rows={6}
              className={classes.textField}
              onChange={handleInputChange}
              {...(errors.diagnosis && {
                error: true,
                helperText: 'Solo se permiten letras y numeros',
              })}
            />
          </div>
          <div className={style.input}>
            <TextField
              id="ovservations-input"
              name='observations'
              label="Observaciones"
              variant='outlined'
              multiline
              rows={6}
              className={classes.textField}
              onChange={handleInputChange}
              {...(errors.observations && {
                error: true,
                helperText: 'Solo se permiten letras y numeros',
              })}
            />
          </div>
          <div className={style.input}>
          </div>
        </div>
        <Divider component="li" />
        <Medicines />
        <Divider component="li" />
        <div className={style.buttons}>
          <div className={style.btn}>
            <NewPrescriptionDialog info={infObj} />
          </div>
          <div className={style.btn}>
            <NewOrderDialog info={infObj} />
          </div>
          <div className={style.btn}>
            <Button variant="contained" size="large" color="primary">
              Subir consulta
            </Button>
          </div>
        </div>
      </List>
    </Card>
  );
}
