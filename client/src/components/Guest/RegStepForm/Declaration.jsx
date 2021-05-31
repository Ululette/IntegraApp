import React, { useEffect, useState } from "react";
import {
  FormControlLabel,
  TextField,
  FormLabel,
  Radio,
  RadioGroup,
  InputAdornment,
  Checkbox,
  StylesProvider,
} from "@material-ui/core";
import styles from "./Declaration.module.css";
import { ReactReduxContext } from "react-redux";

const Declaration = () => {
  const [inputsRad, setInputsRad] = useState({
    diabetes: "No",
    heart: "No",
    hernia: "No",
    allergies: "No",
    seizures: "No",
    asthma: "No",
    sinusitis: "No",
    hypertension: "No",
    hypotension: "No",
    others: "No",
    surgeryProt: "No",
    hearing: "No",
    visual: "No",
    spine: "No",
    fainting: "No",
    psychological: "No",
    psychiatric: "No",
    medicines: "No",
  });
  const [inputsText, setInputsText] = useState({
    completeName:"",
    diabetesD: "",
    heartD: "",
    herniaD: "",
    allergiesD: "",
    seizuresD: "",
    asthmaD: "",
    sinusitisD: "",
    hypertensionD: "",
    hypotensionD: "",
    othersD: "",
    surgeryProtD: "",
    hearingD: "",
    visualD: "",
    spineD: "",
    faintingD: "",
    psychologicalD: "",
    psychiatricD: "",
    medicinesD: "",
  });
  // const [inputNum, setInputNum] = useState({ dniDeclaration: "" });
  const [checkInput, setCheckInput] = useState({accept:""});
  const [errors, setErrors] = useState({ completeName: "", dniDeclaration: "" });
  const handleRad = (e) => {
    let { name, value } = e.target;
    setInputsRad({
      ...inputsRad,
      [name]: value,
    });
  };
  const handleName = (e) => {
    let { name, value } = e.target;
    validin(value,"string");
    setInputsText({
      ...inputsText,
      [name]: value,
    });
  };
  const handleText = (e) => {
    let { name, value } = e.target;
    setInputsText({
      ...inputsText,
      [name]: value,
    });
  };
  // const handleNum = (e) => {
  //   let { name, value } = e.target;
  //   validin(value,"number");
  //   setInputNum({ [name]: value });
  //   saveInLocalStorage()
  // };
  const handleCheck = (e) => {
    setCheckInput({...checkInput,[e.target.name]:e.target.checked});
  };

  const validin = (input,type) => {
    const ex_dni = /^\d{8}(?:[-\s]\d{4})?$/;
    const ex_name = /^[a-z ,.'-]+$/i;
    // if (type === "number") {
    //   if (!ex_dni.test(Number(input))){
    //   console.log("entroaNumber error",!ex_dni.test(Number(input)))
    //     setErrors({
    //       ...errors,
    //       dniDeclarationi: "Dni erroneo, formato no válido",
    //     })}else{
    //       setErrors({
    //         ...errors,
    //         dniDeclaration: "",
    //       })
    //     }
    // }
    if (type === "string") {
      if (!ex_name.test(input)){
      setErrors({
          ...errors,
          completeName: "Completar nombre y apellido",
        })
      }else{ 
        setErrors({
          ...errors,
          completeName: "",
        })
      }
      };
    }

  function saveInLocalStorage() {
    localStorage.setItem(
      "datosDeclaration",
      JSON.stringify({
        ...inputsRad,
        ...inputsText,
        // ...inputNum,
        ...checkInput
      }))

      localStorage.setItem(
        "errorsDeclaration",
        JSON.stringify({...errors})
      )
  }
  useEffect(() => {
    let datosDeclaration = JSON.parse(
      localStorage.getItem("datosDeclaration")
    );
    if(datosDeclaration){
      setInputsRad({
          diabetes: datosDeclaration.diabetes,
          heart: datosDeclaration.heart,
          hernia: datosDeclaration.hernia,
          allergies: datosDeclaration.allergies,
          seizures: datosDeclaration.seizures,
          asthma: datosDeclaration.asthma,
          sinusitis: datosDeclaration.sinusitis,
          hypertension: datosDeclaration.hypertension,
          hypotension: datosDeclaration.hypotension,
          others: datosDeclaration.others,
          surgeryProt: datosDeclaration.surgeryProt,
          hearing: datosDeclaration.hearing,
          visual: datosDeclaration.visual,
          spine: datosDeclaration.spine,
          fainting: datosDeclaration.fainting,
          psychological: datosDeclaration.psychological,
          psychiatric: datosDeclaration.psychiatric,
          medicines: datosDeclaration.medicines,        
      })
      setInputsText({
        completeName:datosDeclaration.completeName,
        diabetesD: datosDeclaration.diabetesD,
        heartD: datosDeclaration.heartD,
        herniaD: datosDeclaration.herniaD,
        allergiesD: datosDeclaration.allergiesD,
        seizuresD: datosDeclaration.seizuresD,
        asthmaD: datosDeclaration.asthmaD,
        sinusitisD: datosDeclaration.sinusitisD,
        hypertensionD: datosDeclaration.hypertensionD,
        hypotensionD: datosDeclaration.hypotensionD,
        othersD: datosDeclaration.othersD,
        surgeryProtD: datosDeclaration.surgeryProtD,
        hearingD: datosDeclaration.hearingD,
        visualD: datosDeclaration.visualD,
        spineD: datosDeclaration.spineD,
        faintingD: datosDeclaration.faintingD,
        psychologicalD: datosDeclaration.psychologicalD,
        psychiatricD: datosDeclaration.psychiatricD,
        medicinesD: datosDeclaration.medicinesD
      })
      // setInputNum({
      //   dniDeclaration:datosDeclaration.dniDeclaration
      // })
      setCheckInput({accept:datosDeclaration.accept})
      validin(datosDeclaration.dniDeclaration,"number")
      validin(datosDeclaration.completeName,"string")
    }
  },[]);

  return (
    <div name="masterCol" className={styles.mastercol}>
      <TextField
        className={styles.tfield}
        name="completeName"
        value={inputsText.completeName}
        onChange={handleName}
        label="NOMBRE Y APELLIDO"
        onBlur={saveInLocalStorage}
        {...(errors.completeName && {
          error: errors.completeName,
          helperText: errors.completeName,
        })}
      ></TextField>
      {/* <TextField
        name="dniDeclaration"
        type="number"
        value={inputNum.dniDeclaration}
        onChange={handleNum}
        label="DNI"
        inputProps={{
          min: 0,
        }}
        onBlur={saveInLocalStorage}
        {...(errors.dniDeclaration && {
          error: errors.dniDeclaration,
          helperText: errors.dniDeclaration,
        })}
      ></TextField> */}
      <FormLabel>
        <h4 className={styles.title}>
          ¿Padece alguna de las siguientes enfermedades?
        </h4>{" "}
      </FormLabel>

      <div name="dos columnas row" className={styles.doscol}>
        <div name="columna1 col" className={styles.col1}>
          <div className={styles.item}>
            <h5>Diabetes</h5>
            <RadioGroup
              name="diabetes"
              value={inputsRad.diabetes}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.diabetes === "Si" ? (
            <TextField
              name="diabetesD"
              value={inputsText.diabetesD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
          <div className={styles.item}>
            <h5>Enfermedad cardíaca (soplo, palpitaciones, etc.)</h5>
            <RadioGroup
              name="heart"
              value={inputsRad.heart}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.heart === "Si" ? (
            <TextField
              name="heartD"
              value={inputsText.heartD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
          <div className={styles.item}>
            <h5>Hernia</h5>
            <RadioGroup
              name="hernia"
              value={inputsRad.hernia}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.hernia === "Si" ? (
            <TextField
              name="herniaD"
              value={inputsText.herniaD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
          <div className={styles.item}>
            <h5>Alergia (aclarar a qué y cómo)</h5>
            <RadioGroup
              name="allergies"
              value={inputsRad.allergies}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.allergies === "Si" ? (
            <TextField
              name="allergiesD"
              value={inputsText.allergiesD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
          <div className={styles.item}>
            <h5>Convulsiones</h5>
            <RadioGroup
              name="seizures"
              value={inputsRad.seizures}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.seizures === "Si" ? (
            <TextField
              name="seizuresD"
              value={inputsText.seizuresD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
        </div>
        <div name="columna2col" className={styles.col2}>
          <div className={styles.item}>
            <h5>Asma</h5>
            <RadioGroup
              name="asthma"
              value={inputsRad.asthma}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.asthma === "Si" ? (
            <TextField
              name="asthmaD"
              value={inputsText.asthmaD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
          <div className={styles.item}>
            <h5>Sinusitis, Adenoides, Otitis a repetición</h5>
            <RadioGroup
              name="sinusitis"
              value={inputsRad.sinusitis}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.sinusitis === "Si" ? (
            <TextField
              name="sinusitisD"
              value={inputsText.sinusitisD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
          <div className={styles.item}>
            <h5>Hipertensión</h5>
            <RadioGroup
              name="hypertension"
              value={inputsRad.hypertension}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.hypertension === "Si" ? (
            <TextField
              name="hypertensionD"
              value={inputsText.hypertensionD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
          <div className={styles.item}>
            <h5>Hipotensión ( baja presión)</h5>
            <RadioGroup
              name="hypotension"
              value={inputsRad.hypotension}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.hypotension === "Si" ? (
            <TextField
              name="hypotensionD"
              value={inputsText.hypotensionD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
          <div className={styles.item}>
            <h5>Otros</h5>
            <RadioGroup
              name="others"
              value={inputsRad.others}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.others === "Si" ? (
            <TextField
              name="othersD"
              value={inputsText.othersD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
        </div>
      </div>
      <FormLabel>
        <h4 className={styles.title}>Operaciones / Protesis (Aclarar) </h4>
      </FormLabel>
      <div className={styles.item}>
        <RadioGroup
          name="surgeryProt"
          value={inputsRad.surgeryProt}
          onChange={handleRad}
          onBlur={saveInLocalStorage}
          className={styles.item}
        >
          <FormControlLabel value="Si" control={<Radio />} label="Si" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </div>
      {inputsRad.surgeryProt === "Si" ? (
        <TextField
          name="surgeryProtD"
          value={inputsText.surgeryProtD}
          onChange={handleText}
          onBlur={saveInLocalStorage}
          label="Observaciones"
          variant="outlined"
        ></TextField>
      ) : null}
      <FormLabel>
        <h4 className={styles.title}>Manifiesta algún problema </h4>
      </FormLabel>
      <div name="doscolumnas" className={styles.doscol}>
        <div name="columna1" className={styles.col1}>
          <div className={styles.item}>
            <h5>Auditivo ¿Cuál?</h5>
            <RadioGroup
              name="hearing"
              value={inputsRad.hearing}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.hearing === "Si" ? (
            <TextField
              name="hearingD"
              value={inputsText.hearingD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
          <div className={styles.item}>
            <h5>Visual ¿Cuál?</h5>
            <RadioGroup
              name="visual"
              value={inputsRad.visual}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.visual === "Si" ? (
            <TextField
              name="visualD"
              value={inputsText.visualD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
        </div>
        <div name="columna2" className={styles.col2}>
          <div className={styles.item}>
            <h5>¿Desviación de Columna? Especifique</h5>
            <RadioGroup
              name="spine"
              value={inputsRad.spine}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.spine === "Si" ? (
            <TextField
              name="spineD"
              value={inputsText.spineD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
          <div className={styles.item}>
            <h5>¿Desmayos? Especifique causas</h5>
            <RadioGroup
              name="fainting"
              value={inputsRad.fainting}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.fainting === "Si" ? (
            <TextField
              name="faintingD"
              value={inputsText.faintingD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
        </div>
      </div>
      <FormLabel>
        <h4 className={styles.title}> Area de Salud Mental </h4>
      </FormLabel>
      <div name="doscolumnas" className={styles.doscol}>
        <div name="columna1" className={styles.col1}>
          <div className={styles.item}>
            <h5>Tratamiento psicológico </h5>
            <RadioGroup
              name="psychological"
              value={inputsRad.psychological}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.psychological === "Si" ? (
            <TextField
              name="psychologicalD"
              value={inputsText.psychologicalD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
        </div>
        <div name="columna2" className={styles.col2}>
          <div className={styles.item}>
            <h5> Tratamiento psiquiátrico</h5>
            <RadioGroup
              name="psychiatric"
              value={inputsRad.psychiatric}
              onChange={handleRad}
              onBlur={saveInLocalStorage}
              className={styles.item}
            >
              <FormControlLabel value="Si" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
          {inputsRad.psychiatric === "Si" ? (
            <TextField
              name="psychiatricD"
              value={inputsText.psychiatricD}
              onChange={handleText}
              onBlur={saveInLocalStorage}
              label="Observaciones"
              variant="outlined"
            ></TextField>
          ) : null}
        </div>
      </div>
      <FormLabel>
        <h4 className={styles.title}>
          ¿Actualmente toma algún medicamento? ¿Por qué? Especifique.{" "}
        </h4>
      </FormLabel>
      <div className={styles.item}>
        <RadioGroup
          name="medicines"
          value={inputsRad.medicines}
          onChange={handleRad}
          onBlur={saveInLocalStorage}
          className={styles.item}
        >
          <FormControlLabel value="Si" control={<Radio />} label="Si" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </div>
      {inputsRad.medicines === "Si" ? (
        <TextField
          name="medicinesD"
          value={inputsText.medicinesD}
          onChange={handleText}
          onBlur={saveInLocalStorage}
          label="Observaciones"
          variant="outlined"
        ></TextField>
      ) : null}
      <div className={styles.declaration}>

      <FormControlLabel
        className={styles.accept}
        name="accept"
        checked={checkInput.accept&&checkInput.accept}
        control={<Checkbox required/>}
        onChange={handleCheck}
        label="Acepto."
        onBlur={saveInLocalStorage}
      />
      <h4 className={styles.declaration}>"Declaro bajo juramento que en la presente informé la totalidad de mis
              antecedentes de salud no habiendo omitido dato alguno, estando por lo tanto
              INTEGRA facultado para resolver el vínculo en caso de falsedad en los
              términos del Dec. Reg. 1993/11, art. 9, inc. b, el que también declaro
              conocer. Autorizo expresamente a INTEGRA a requerir información médica
              referida a mi persona y/o grupo familiar a cualquier prestador y/o
              institución de salud."</h4>

      </div>
    </div>
  );
};
export default Declaration;
