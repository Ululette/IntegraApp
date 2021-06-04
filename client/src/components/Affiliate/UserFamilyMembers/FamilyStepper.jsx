import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DatosFamiliar from './DatosFamiliar';
import DatosRevision from './DatosRevision';
import supabase from '../../../supabase.config';
import style from './FamilyStepper.module.css';
import Styles from '../../Guest/ContactForm/ContactForm.module.css';
import swal from 'sweetalert2';
import Declaration from './Declaration';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(5),
        color: '#fafafa',
        width: 'fit-content',
        border: '3px solid #2c7f7b',
        borderRadius: '5px',
        backgroundColor: '#2c7f7b',
        fontWeight: 'bold',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: '#fafafa',
            color: '#2c7f7b',
        },
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    popupBtn: {
        color: '#fafafa',
        width: 'fit-content',
        marginLeft: '40px',
        border: '3px solid #2c7f7b',
        borderRadius: '5px',
        backgroundColor: '#2c7f7b',
        fontWeight: 'bold',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: '#fafafa',
            color: '#2c7f7b',
        },
    },
}));

function getSteps() {
    return [
        'Datos del Familiar',
        // 'Datos de la Empresa',
        'Antecedentes de Salud',
        'Resumen',
    ];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <DatosFamiliar/>;
        // case 1:
        //     return <DatosEmpresa />;
        case 1:
            return <Declaration />;
        // case 3:
        //   return <DatosFamiliares/>;
        case 2:
            return <DatosRevision />;
        default:
            return 'Unknown stepIndex';
    }
}

export default function RegStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const alltrue = (obj) => {
        let completeError = true;
        for (let error in obj) {
            completeError =
                completeError &&
                typeof Object.values(obj[error])[0] !== 'string';
        }
        return completeError;
    };

    const handleNext = async () => {
        switch (activeStep.toString()) {
            case '0':
                const errorsFamiliar = JSON.parse(
                    localStorage.getItem('errorsFamiliar')
                );
                if(errorsFamiliar){
                alltrue(errorsFamiliar)
                    ? setActiveStep((prevActiveStep) => prevActiveStep + 1)
                    : new swal('Ups!', 'Debes completar todos los campos');
                }else
                    new swal('Ups!', 'Debes completar todos los campos')
                break;
            // case '1':
            //     const errorsEmpresa = JSON.parse(
            //         localStorage.getItem('errorsEmpresa')
            //     );
            //     alltrue(errorsEmpresa)
            //         ? setActiveStep((prevActiveStep) => prevActiveStep + 1)
            //         : new swal('Ups!', 'Debes completar todos los campos');
            //     break;
            case '1':  
               const datosDeclaration = JSON.parse(
                    localStorage.getItem('datosDeclaration')
                ) 
                if(datosDeclaration){
                if(datosDeclaration.accept)
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
                else new swal('Ups!', 'Debe aceptar la declaracion Jurada')}
                else
                new swal('Ups!', "No se registraron datos")
                break;

            default:
                break;
        }
        // setActiveStep((prevActiveStep) => prevActiveStep + 1)

        if (activeStep === steps.length - 1) {
            const datosFamiliar = JSON.parse(
                localStorage.getItem('datosFamiliar')
            );
            // const datosEmpresa = JSON.parse(
            //     localStorage.getItem('datosEmpresa')
            // );
            const datosDeclaration = JSON.parse(
                localStorage.getItem('datosDeclaration')
            );
            const affiliatedata = JSON.parse(
                localStorage.getItem("affiliatedata")
            )

            // const { data: idPartners } = await supabase
            //     .from('partners')
            //     .select('family_group');

            // const lastId =
            //     idPartners
            //         .sort(function (a, b) {
            //             if (a.family_group < b.family_group) {
            //                 return 1;
            //             }
            //             if (a.family_group > b.family_group) {
            //                 return -1;
            //             }
            //             return 0;
            //         })
            //         .shift().family_group + 1;

            // let idCompany = null;

            // const { data: companyData } = await supabase
            //     .from('companies')
            //     .select('id')
            //     .eq('cuit', datosEmpresa.company_cuit);
            // console.log(companyData, 'companyData');

            // if (companyData.length === 0) {
            //     const { data: newId, error: errorInsertCompany } =
            //         await supabase.from('companies').insert([
            //             {
            //                 business_name: datosEmpresa.bussines_name,
            //                 cuit: datosEmpresa.company_cuit,
            //                 phone_number: datosEmpresa.company_phone,
            //                 email: datosEmpresa.company_email,
            //             },
            //         ]);
            //     console.log(errorInsertCompany, 'errorInsertCompany');
            //     console.log(newId, 'newId');

            //     idCompany = newId[0].id;
            // } else {
            //     idCompany = companyData[0].id;
            // }
                const{error:errorP}=
            await supabase.from('partners').insert([
                {
                    dni: datosFamiliar.dni,
                    name: datosFamiliar.first_name,
                    lastname: datosFamiliar.last_name,
                    birthdate: datosFamiliar.birth_date,
                    phone_number: datosFamiliar.phone_number,
                    titular: false,
                    family_bond: datosFamiliar.familyBond,
                    family_group: affiliatedata.family_group,
                    state: 'revision pendiente',
                    email: datosFamiliar.email,
                    plan_id: affiliatedata.plan_id,
                    // // company_id: idCompany,
                    gender: datosFamiliar.gender,
                },
            ]);
            if(errorP){
                localStorage.removeItem('datosFamiliar')
            localStorage.removeItem('datosDeclaration')
            localStorage.removeItem('errorsFamiliar')
            setActiveStep(0)
                return new swal("El DNI ya se encuentra Registrado")}
            await supabase.from('address').insert([
                {
                    street: datosFamiliar.street_name,
                    street_number: datosFamiliar.number,
                    floor: datosFamiliar.floor && datosFamiliar.floor,                  
                    locality_id: datosFamiliar.locality.split('-')[0],
                    partner_dni: datosFamiliar.dni,
                    department:
                        datosFamiliar.apartment && datosFamiliar.apartment,
                },
            ]);

            await supabase.from('medical_records').insert([
                {
                    partner_dni: datosFamiliar.dni,
                    declaration: JSON.stringify(datosDeclaration),
                },
            ]);
            localStorage.removeItem('datosFamiliar')
            localStorage.removeItem('datosDeclaration')
            localStorage.removeItem('errorsFamiliar')
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // const handleReset = () => {
    //     setActiveStep(0);
    //     localStorage.clear();
    // };

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
                         <div className={style.cartel}>
  <img src="../../assets/icons/medicrecordd.png"
  alt="medicRecord"/>
  
  <div className={style.text}>
  <h3 className={style.title}>Su Registro esta Completo</h3>

        <h4 className={style.subtitle}>Muchas gracias por su tiempo.</h4>
        </div>
  </div>

                        {/* <Button onClick={handleReset}>Reset</Button> */}
                    </div>
                ) : (
                    <div classname={style.btn}>
                        <Typography className={classes.instructions}>
                            {getStepContent(activeStep)}
                        </Typography>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                            >
                                Back
                            </Button>
                            <Button
                                className={classes.popupBtn}
                                variant='contained'
                                color='primary'
                                onClick={handleNext}
                            >
                                {activeStep === 2 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
