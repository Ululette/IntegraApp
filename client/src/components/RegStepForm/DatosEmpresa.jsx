import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
	InputLabel,
	TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import validator from "./Validator.js";
import * as styles from './DatosEmpresa.module.css'

const DatosEmpresa = () => {
	const [inputsText, setInputsText] = useState({
		rh_name: "",
	});
	const [inputsNumber, setInputsNumber] = useState({
		company_phone: "",
	});
	const [inputsMix, setInputsMix] = useState({
		bussines_name: "",
		bussines_group: "",
	});
	const [inputsEmail, setInputsEmail] = useState({
		company_email: "",
	});
	const [errors, setErrors] = useState({
		textErrors:{
			bussines_name: "",
			bussines_group: "",
			rh_name: "",
			company_phone: "",
			company_email: "",
		}
	});
	
	useEffect(() => {
		let datosEmpresa=JSON.parse(localStorage.getItem('datosEmpresa')) 
		if(datosEmpresa){
			setInputsText({
				rh_name:datosEmpresa.rh_name
			})
			setInputsNumber({
				company_phone:datosEmpresa.company_phone
			})
			setInputsMix({
				bussines_name: datosEmpresa.bussines_name,
				bussines_group: datosEmpresa.bussines_group,
			})
			setInputsEmail({
				company_email: datosEmpresa.company_email
			})
		}
    }, []);

	function saveInLocalStorage(){
		localStorage
		.setItem('datosEmpresa', 
				JSON.stringify({
					...inputsMix,
					...inputsText,
					...inputsNumber,
					...inputsEmail
		}))
	}

	const handleMixChange = (e) => {
		setInputsMix((prevState) => {
		  return {
			...prevState,
			[e.target.name]: e.target.value,
		  };
		});
		setErrors({...errors,textErrors:validator({...inputsMix,[e.target.name]: e.target.value},"mix")})
		saveInLocalStorage()
	};
	const handleTextChange = (e) => {
		setInputsText((prevState) => {
		  return {
			...prevState,
			[e.target.name]: e.target.value,
		  };
		});
		setErrors({...errors,textErrors:validator({...inputsText,[e.target.name]: e.target.value},"text")})
		saveInLocalStorage()
	};
	const handleNumberChange = (e) => {
		setInputsNumber((prevState) => {
		  return {
			...prevState,
			[e.target.name]: e.target.value,
		  };
		});
		setErrors({...errors,textErrors:validator({...inputsNumber,[e.target.name]: e.target.value},"number")})
		saveInLocalStorage()
	};
	const handleEmailChange = (e) => {
		setInputsEmail((prevState) => {
		  return {
			...prevState,
			[e.target.name]: e.target.value,
		  };
		});
		setErrors({...errors,textErrors:validator({...inputsEmail,[e.target.name]: e.target.value},"email")})
		saveInLocalStorage()
	};

	// useEffect(() => {
	// 	return ()=>{
	// 		saveInLocalStorage()
	// 	}
    // }, []);

	return (
		<div className={styles.form}>
			<div className={styles.title}>
				<h2>Datos de la empresa: </h2>
			</div>
			<div className={styles.data}>
				<div className={styles.firstColumn}>
					<div className={styles.input}>
						<TextField
							name="bussines_name"
							label="Razon Social"
							variant="outlined"
							value={inputsMix.bussines_name}
							type='text'
							onChange={(e) => handleMixChange(e)}
							onBlur={saveInLocalStorage}
							{...(errors.textErrors.bussines_name && {
								error: !!errors.textErrors.bussines_name,
								helperText: errors.textErrors.bussines_name,
							})}
							
							// error= {errors.textErrors.bussines_name && !!errors.textErrors.bussines_name}
						/>
					</div>
					<div className={styles.input}>
						<TextField
							name="bussines_group"
							label="Grupo Empresarial"
							variant="outlined"
							value={inputsMix.bussines_group}
							onChange={(e) => handleMixChange(e)}
							onBlur={saveInLocalStorage}
							{...(errors.textErrors.bussines_group && {
								error: errors.textErrors.bussines_group,
								// helperText: errors.textErrors.bussines_group,
							})}
						/>
					</div>
					<div className={styles.input}>
						<TextField
							name="rh_name"
							label="Nombre y Apellido de RRHH"
							variant="outlined"
							value={inputsText.rh_name}
							onChange={(e) => handleTextChange(e)}
							onBlur={saveInLocalStorage}
							{...(errors.textErrors.rh_name && {
								error: errors.textErrors.rh_name,
								// helperText: errors.textErrors.rh_name,
							})}
						/>
					</div> 
				</div>
				<div className={styles.secondColumn}>
					<div className={styles.input}>
						<TextField
							name="company_phone"
							label="Telefono"
							variant="outlined"
							value={inputsNumber.company_phone}
							onChange={(e) => handleNumberChange(e)}
							onBlur={saveInLocalStorage}
							{...(errors.textErrors.company_phone && {
								error: errors.textErrors.company_phone,
								// helperText: errors.textErrors.company_phone,
							})}
						/>
					</div>
					<div className={styles.input}>
						<TextField
							name="company_email"
							label="E-mail"
							variant="outlined"
							value={inputsEmail.company_email}
							onChange={(e) => handleEmailChange(e)}
							onBlur={saveInLocalStorage}
							{...(errors.textErrors.company_email && {
								error: errors.textErrors.company_email,
								// helperText: errors.textErrors.company_email,
							})}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default DatosEmpresa;
