import React,{useState} from 'react';
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

  const errorsT =  JSON.parse(localStorage.getItem('errorsTitular'));
  // const algo = ()=>{

  //   if(errorsT){
      
  //   }
  // }
  // algo();

  const handleNext = () => {
    console.log('errorsT',!!errorsT)
    console.log('step',!!activeStep)
    // if(errorsT){
    //   const {dateErrors,emailErrors,selectErrors,textErrors,textMixErrors,textNumErrors} = JSON.parse(localStorage.getItem('errorsTitular'))
    //  if(dateErrors.dateComplete && emailErrors.emailComplete && 
    //   selectErrors.radComplete && textErrors.textComplete &&
    //   textMixErrors.textMixComplete && textNumErrors.textNumComplete 
    //   && activeStep===0){

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //   }
      
    //   else alert('debe completar los datos.')
    // }
    
  };

  const handleBack = () => {
    const {dateErrors,emailErrors,selectErrors,textErrors,textMixErrors,textNumErrors} = JSON.parse(localStorage.getItem('errorsTitular'))
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
