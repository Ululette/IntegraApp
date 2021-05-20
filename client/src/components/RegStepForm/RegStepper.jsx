import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DatosTitular from './DatosTitular';
import DatosSalud from './DatosSalud';
import DatosFamiliares from './DatosFamiliares';
import DatosEmpresa from "./DatosEmpresa"
import DatosRevision from './DatosRevision';
import supabase from "../../supabase.config";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Datos del Titular","Datos de la Empresa","Resumen",];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <DatosTitular/> ;
    case 1:
      return <DatosEmpresa/> ;
    // case 2:
    //   return <DatosSalud/>;
    // case 3: 
    //   return <DatosFamiliares/>;
    case 2: 
      return <DatosRevision/>
    default:
      return 'Unknown stepIndex';
  }
}

export default function RegStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

const alltrue= (obj) => {
  let completeError = true;
  for (let error in obj) {
    completeError = completeError && Object.values(obj[error])[0]
}
return completeError}

  const handleNext = async() => {
      
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
     
    if(activeStep === steps.length - 1 ){
      const datosTitular = JSON.parse(localStorage.getItem('datosTitular'));
      const datosEmpresa = JSON.parse(localStorage.getItem('datosEmpresa'));
      console.log(activeStep)
      const { data:partner, error:errorPartner } = await supabase
      .from('partners')
      .insert([{ dni:datosTitular.dni,
                name:datosTitular.first_name,
                lastname:datosTitular.last_name,
                birthdate:datosTitular.birth_date,
                phone_number:datosTitular.phone_number,
                titular:true,
                family_bond:'titular',
                family_group:0,
                state:'revision pendiente',
                email:datosTitular.email,
                plan_id:8,
                company_id:null,
                medical_records_id:null,
                gender:datosTitular.gender
      }])
      const { data:address, error:errorAddress } = await supabase
      .from('address')
      .insert([{  street:datosTitular.street_name,
                  street_number:datosTitular.number,
                  floor:1,
                  medic_id:null,
                  locality_id:datosTitular.locality.split('-')[0],
                  partner_dni:datosTitular.dni,
                  department:datosTitular.apartment
      }])
      const { data:companies, error:errorCompanies } = await supabase
      .from('companies')
      .insert([{  business_name:datosEmpresa.bussines_name,
                  cuit:111111,
                  phone_number:datosEmpresa.company_phone,
                  email:datosEmpresa.company_email
      }])
    }
  };

  const handleBack = () => {
    
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    localStorage.clear();
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} >
                {activeStep === 2 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
