import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";

const DatosEmpresa = () => {
  const [input, setInputs] = useState({
    bussines_name: "",
    bussines_group: "",
    rh_name: "",
    company_phone: "",
    company_email: "",
  });
  const [errors, setErrors] = useState({});
  // const handleChange=(e)=>{
  //   const{value,name} = e.target
  //   setInputs({...inputs,
  //             [name]:value})
  //   validator (name,value)
  // }
  // const validator =(value,name)=>{
  //   let temp = {}
  //   temp.bussines_name= value.length ? "" : "Campo requerido"
  //   temp.bussines_group= value.length? "" : "Campo requerido"
  //   temp.rh_name= value.length?"" : "Campo requerido"
  //   temp.company_phone= value.length?"" :"Tu teléfono debe contener un mínimo de 6 números."
  //   temp.company_email=(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}.test(value))? "": "Ingresá un email válido."

  //   setErrors({...temp})
  // }

  return (
    <>
      <TextField
        name="bussines_name"
        label="Razon Social"
        variant="outlined"
        value={input.bussines_name}
      />
      <TextField
        name="bussines_group"
        label="Grupo Empresarial"
        variant="outlined"
        value={input.bussines_group}
      />
      <TextField
        name="rh_name"
        label="Nombre y Apellido de RRHH Ref. de la Empresa"
        variant="outlined"
        value={input.rh_name}
      />
      <TextField
        name="company_phone"
        label="Telefono de la empresa"
        variant="outlined"
        value={input.company_phone}
      />
      <TextField
        name="company_email"
        label="E-mail de la empresa"
        variant="outlined"
        value={input.company_email}
      />

      <label>Modalidades de pago de la empresa: </label>
      <TextField label="Hasta un plan determinado" variant="outlined" />
      <FormControlLabel
        value="top"
        control={<Checkbox color="primary" />}
        label="Aportes de Ley"
        labelPlacement="start"
      />
      <TextField label="otros" variant="outlined" />
    </>
  );
};
export default DatosEmpresa;
