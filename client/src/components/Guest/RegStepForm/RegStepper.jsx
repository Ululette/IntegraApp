import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DatosTitular from "./DatosTitular";
import DatosEmpresa from "./DatosEmpresa";
import DatosRevision from "./DatosRevision";
import supabase from "../../../supabase.config";
import style from "./RegStepper.module.css";
import Styles from "../../Guest/ContactForm/ContactForm.module.css";
import swal from "sweetalert2";
import Declaration from "./Declaration";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(5),
    color: '#fafafa',
    width: "fit-content",
    marginLeft: "40px",
    border: '3px solid #2c7f7b',
    borderRadius:'5px',
    backgroundColor:'#2c7f7b',
    fontWeight:'bold',
    fontSize:'15px',
    '&:hover':{
        backgroundColor:'#fafafa',
        color:'#2c7f7b'
    }
      },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  popupBtn:{
    color: '#fafafa',
    width: "fit-content",
    marginLeft: "40px",
    border: '3px solid #2c7f7b',
    borderRadius:'5px',
    backgroundColor:'#2c7f7b',
    fontWeight:'bold',
    fontSize:'15px',
    '&:hover':{
        backgroundColor:'#fafafa',
        color:'#2c7f7b'
    }
  }
}));

function getSteps() {
  return [
    "Datos del Titular",
    "Datos de la Empresa",
    "Antecedentes de Salud",
    "Resumen",
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <DatosTitular />;
    case 1:
      return <DatosEmpresa />;
    case 2:
      return <Declaration />;
    // case 3:
    //   return <DatosFamiliares/>;
    case 3:
      return <DatosRevision />;
    default:
      return "Unknown stepIndex";
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
        completeError && typeof Object.values(obj[error])[0] !== "string";
    }
    return completeError;
  };

  const handleNext = async () => {
    switch (activeStep.toString()) {
      case "0":
        const errorsTitular = JSON.parse(localStorage.getItem("errorsTitular"));
        alltrue(errorsTitular)
          ? setActiveStep((prevActiveStep) => prevActiveStep + 1)
          : new swal("Ups!", "Debes completar todos los campos");
        break;
      case "1":
        const errorsEmpresa = JSON.parse(localStorage.getItem("errorsEmpresa"));
        alltrue(errorsEmpresa)
          ? setActiveStep((prevActiveStep) => prevActiveStep + 1)
          : new swal("Ups!", "Debes completar todos los campos");
        break;
      case "2":
        const errorsDeclaration = JSON.parse(
          localStorage.getItem("errorsDeclaration")
        );
        const finalcheck = JSON.parse(
          localStorage.getItem("datosDeclaration")
        ).accept;
        const { completeName, dni } = errorsDeclaration;
        !completeName && !dni && finalcheck
          ? setActiveStep((prevActiveStep) => prevActiveStep + 1)
          : new swal("Ups!", "Debes completar todos los campos");
        break;

      default:
        break;
    }
    // setActiveStep((prevActiveStep) => prevActiveStep + 1)

    if (activeStep === steps.length - 1) {
      const datosTitular = JSON.parse(localStorage.getItem("datosTitular"));
      const datosEmpresa = JSON.parse(localStorage.getItem("datosEmpresa"));
      const datosDeclaration = JSON.parse(
        localStorage.getItem("datosDeclaration")
      );

      const { data: idPartners, error: errorId } = await supabase
        .from("partners")
        .select("family_group");

      const lastId =
        idPartners
          .sort(function (a, b) {
            if (a.family_group < b.family_group) {
              return 1;
            }
            if (a.family_group > b.family_group) {
              return -1;
            }
            return 0;
          })
          .shift().family_group + 1;

      console.log("miraeseid", lastId);

      const { data: partner, error: errorPartner } = await supabase
        .from("partners")
        .insert([
          {
            dni: datosTitular.dni,
            name: datosTitular.first_name,
            lastname: datosTitular.last_name,
            birthdate: datosTitular.birth_date,
            phone_number: datosTitular.phone_number,
            titular: true,
            family_bond: "titular",
            family_group: lastId,
            state: "revision pendiente",
            email: datosTitular.email,
            plan_id: 8,
            company_id: null,
            gender: datosTitular.gender,
          },
        ]);
      console.log("parnerrorcis", errorPartner);
      const { data: address, error: errorAddress } = await supabase
        .from("address")
        .insert([
          {
            street: datosTitular.street_name,
            street_number: datosTitular.number,
            floor: datosTitular.floor && datosTitular.floor,
            medic_id: null,
            locality_id: datosTitular.locality.split("-")[0],
            partner_dni: datosTitular.dni,
            department: datosTitular.apartment && datosTitular.apartment,
          },
        ]);
      console.log("ADRESSSRROR", errorAddress);

      const { data: companies, error: errorCompanies } = await supabase
        .from("companies")
        .insert([
          {
            business_name: datosEmpresa.bussines_name,
            cuit: datosEmpresa.company_cuit,
            phone_number: datosEmpresa.company_phone,
            email: datosEmpresa.company_email,
          },
        ]);

      const { data: declaration, error: errorDeclaration } = await supabase
        .from("medical_records")
        .insert([
          {
            partner_dni: datosTitular.dni,
            declaration: JSON.stringify(datosDeclaration),
          },
        ]);
      console.log("RECORTTTS", errorDeclaration);

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
            <Typography className={classes.instructions}>
              <div style={{backgroundColor:"#41aea9"}} className={Styles.successRequestContent}>
                <p className={Styles.successRequestTitle}>
                  ¡Gracias por escribirnos!
                </p>
                <p className={Styles.successRequestSubTitle}>
                  {" "}
                  Un asesor se comunicara con vos
                </p>
                <p className={Styles.successRequestSubTitle}>
                  {" "}
                  para charlar sobre tu próximo plan.
                </p>
              </div>
            </Typography>

            <Button onClick={handleReset}>Reset</Button>
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
              <Button className={classes.popupBtn}variant="contained" color="primary" onClick={handleNext}>
                {activeStep === 3 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
