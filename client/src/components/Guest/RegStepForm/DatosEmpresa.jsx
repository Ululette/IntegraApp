import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import validator from './Validator.js';
import * as styles from './DatosEmpresa.module.css';

const DatosEmpresa = () => {
    const [textInputs, setTextInputs] = useState({
        rh_name: '',
    });
    const [textInputsNum, setTextInputsNum] = useState({
        company_phone: '',
    });
    const [textInputsMix, setTextInputsMix] = useState({
        bussines_name: '',
        bussines_group: '',
    });
    const [emailInputs, setEmailInputs] = useState({
        company_email: '',
    });
    const [errors, setErrors] = useState({
        textErrors: {
            rh_name: '',
        },
        textNumErrors: {
            company_phone: '',
        },
        textMixErrors: {
            bussines_name: '',
            bussines_group: '',
        },
        emailErrors: {
            company_email: '',
        },
    });

    useEffect(() => {
        let datosEmpresa = JSON.parse(localStorage.getItem('datosEmpresa'));
        if (datosEmpresa) {
            setTextInputs({
                rh_name: datosEmpresa.rh_name,
            });
            setTextInputsNum({
                company_phone: datosEmpresa.company_phone,
            });
            setTextInputsMix({
                bussines_name: datosEmpresa.bussines_name,
                bussines_group: datosEmpresa.bussines_group,
            });
            setEmailInputs({
                company_email: datosEmpresa.company_email,
            });
            setErrors((errors) => ({
                ...errors,
                textErrors: validator(
                    {
                        rh_name: datosEmpresa.rh_name,
                    },
                    'text'
                ),
            }));
            setErrors((errors) => ({
                ...errors,
                textNumErrors: validator(
                    {
                        company_phone: datosEmpresa.company_phone,
                    },
                    'number'
                ),
            }));
            setErrors((errors) => ({
                ...errors,
                textMixErrors: validator(
                    {
                        bussines_name: datosEmpresa.bussines_name,
                        bussines_group: datosEmpresa.bussines_group,
                    },
                    'mix'
                ),
            }));
            setErrors((errors) => ({
                ...errors,
                emailErrors: validator(
                    {
                        company_email: datosEmpresa.company_email,
                    },
                    'email'
                ),
            }));
        }
    }, []);

    function saveInLocalStorage() {
        localStorage.setItem(
            'datosEmpresa',
            JSON.stringify({
                ...textInputs,
                ...textInputsNum,
                ...textInputsMix,
                ...emailInputs,
            })
        );
        localStorage.setItem('errorsEmpresa', JSON.stringify({ ...errors }));
    }

    const handleMixChange = (e) => {
        setTextInputsMix((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
        setErrors({
            ...errors,
            textMixErrors: validator(
                { ...textInputsMix, [e.target.name]: e.target.value },
                'mix'
            ),
        });
    };
    const handleTextChange = (e) => {
        setTextInputs((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
        setErrors({
            ...errors,
            textErrors: validator(
                { ...textInputs, [e.target.name]: e.target.value },
                'text'
            ),
        });
    };
    const handleNumberChange = (e) => {
        setTextInputsNum((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
        setErrors({
            ...errors,
            textNumErrors: validator(
                { ...textInputsNum, [e.target.name]: e.target.value },
                'number'
            ),
        });
    };
    const handleEmailChange = (e) => {
        setEmailInputs((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
        setErrors({
            ...errors,
            emailErrors: validator(
                { ...emailInputs, [e.target.name]: e.target.value },
                'email'
            ),
        });
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
                            name='bussines_name'
                            label='Razon Social'
                            variant='outlined'
                            value={textInputsMix.bussines_name}
                            type='text'
                            onChange={(e) => handleMixChange(e)}
                            onBlur={saveInLocalStorage}
                            {...(errors.textMixErrors.bussines_name && {
                                error: !!errors.textMixErrors.bussines_name,
                                helperText: errors.textMixErrors.bussines_name,
                            })}
                            error={
                                errors.textErrors.bussines_name &&
                                !!errors.textErrors.bussines_name
                            }
                        />
                    </div>
                    <div className={styles.input}>
                        <TextField
                            name='bussines_group'
                            label='Grupo Empresarial'
                            variant='outlined'
                            value={textInputsMix.bussines_group}
                            onChange={(e) => handleMixChange(e)}
                            onBlur={saveInLocalStorage}
                            {...(errors.textMixErrors.bussines_group && {
                                error: errors.textMixErrors.bussines_group,
                                helperText: errors.textMixErrors.bussines_group,
                            })}
                        />
                    </div>
                    <div className={styles.input}>
                        <TextField
                            name='rh_name'
                            label='Nombre y Apellido de RRHH'
                            variant='outlined'
                            value={textInputs.rh_name}
                            onChange={(e) => handleTextChange(e)}
                            onBlur={saveInLocalStorage}
                            {...(errors.textErrors.rh_name && {
                                error: errors.textErrors.rh_name,
                                helperText: errors.textErrors.rh_name,
                            })}
                        />
                    </div>
                </div>
                <div className={styles.secondColumn}>
                    <div className={styles.input}>
                        <TextField
                            name='company_phone'
                            label='Telefono'
                            variant='outlined'
                            value={textInputsNum.company_phone}
                            onChange={(e) => handleNumberChange(e)}
                            onBlur={saveInLocalStorage}
                            {...(errors.textNumErrors.company_phone && {
                                error: errors.textNumErrors.company_phone,
                                helperText: errors.textNumErrors.company_phone,
                            })}
                        />
                    </div>
                    <div className={styles.input}>
                        <TextField
                            name='company_email'
                            label='E-mail'
                            variant='outlined'
                            value={emailInputs.company_email}
                            onChange={(e) => handleEmailChange(e)}
                            onBlur={saveInLocalStorage}
                            {...(errors.emailErrors.company_email && {
                                error: errors.emailErrors.company_email,
                                helperText: errors.emailErrors.company_email,
                            })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DatosEmpresa;
