import {
    FormControlLabel,
    TextField,
    FormLabel,
    Radio,
    RadioGroup,
    InputAdornment,
    Checkbox,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import validator from './Validator.js';
import styles from './DatosSalud.module.css';
const DatosSalud = () => {
    const [textInputs, setTextInputs] = useState({
        completeName: '',
        typeSurgery: '',
        surgeryDiagnosis: '',
        typeProsthesis: '',
        psychDiagnosis: '',
        psychhospitalization: '',
        hospitalizationReason: '',
        otherT: '',
        otherTDiagnosis: '',
        otherTMedic: '',
        studiesDiagnostic: '',
        hereditaryDiseases: '',
        bloodTransReason: '',
        studiesSixMonthsD: '',
        VHDetail: '',
        adictionsDetail: '',
        eatingDisordersD: '',
        otherPatD: '',
    });
    const [textInputsNum, setInputsTextNum] = useState({
        dni: '',
        otherTNumber: '',
        childrens: '',
        weight: '',
        height: '',
    });
    const [textInputsMix, setInputsTextMix] = useState({
        psychMeds: '',
        VHDiagnostic: '',
    });
    const [radioInputs, SetRadioInputs] = useState({
        surgeryRad: '',
        paceMakerRad: '',
        prosthesisRad: '',
        psychiatricRad: '',
        psychActuallyRad: '',
        hospitalizationRad: '',
        otherTreatmentsRad: '',
        medicalResultsRad: '',
        hereditaryDiseasesRad: '',
        bloodTransRad: '',
        pregnantRad: '',
        studiesSixMonthsRad: '',
        visionHearingRad: '',
        diabetesRad: '',
        adictionsRad: '',
        treatmentAdictionsRad: '',
        eatingDisordersRad: '',
        otherPatRad: '',
        disabilityCertRad: '',
    });
    const [dateInputs, setDateInputs] = useState({
        dateSurgery: '',
        prosthesisDate: '',
        psychhospitalizationDate: '',
        hospitalizationDate: '',
        medicalStudiesDate: '',
        bloodTransDate: '',
        treatmentDate: '',
        formDate: '',
    });
    const [checkInputs, setcheckInputs] = useState({
        accept: '',
    });
    const [errors, setErrors] = useState({
        textErrors: {
            completeName: '',
            typeSurgery: '',
            surgeryDiagnosis: '',
            typeProsthesis: '',
            psychDiagnosis: '',
            psychhospitalization: '',
            hospitalizationReason: '',
            otherT: '',
            otherTDiagnosis: '',
            otherTMedic: '',
            studiesDiagnostic: '',
            hereditaryDiseases: '',
            bloodTransReason: '',
            studiesSixMonthsD: '',
            VHDetail: '',
            adictionsDetail: '',
            eatingDisordersD: '',
            otherPatD: '',
        },
        textMixErrors: {
            psychMeds: '',
            VHDiagnostic: '',
        },
        textNumErrors: {
            dni: '',
            otherTNumber: '',
            childrens: '',
            weight: '',
            height: '',
        },
        dateErrors: {
            dateSurgery: '',
            prosthesisDate: '',
            psychhospitalizationDate: '',
            hospitalizationDate: '',
            medicalStudiesDate: '',
            bloodTransDate: '',
            treatmentDate: '',
            formDate: '',
        },
        radioErrors: {
            surgeryRad: '',
            paceMakerRad: '',
            prosthesisRad: '',
            psychiatricRad: '',
            psychActuallyRad: '',
            hospitalizationRad: '',
            otherTreatmentsRad: '',
            medicalResultsRad: '',
            hereditaryDiseasesRad: '',
            bloodTransRad: '',
            pregnantRad: '',
            studiesSixMonthsRad: '',
            visionHearingRad: '',
            diabetesRad: '',
            adictionsRad: '',
            treatmentAdictionsRad: '',
            eatingDisordersRad: '',
            otherPatRad: '',
            disabilityCertRad: '',
        },
        checkErrors: { accept: '' },
    });
    useEffect(() => {
        const datosSalud = JSON.parse(localStorage.getItem('datosSalud'));
        if (datosSalud) {
            setTextInputs({
                completeName: datosSalud.completeName,
                typeSurgery: datosSalud.typeSurgery,
                surgeryDiagnosis: datosSalud.surgeryDiagnosis,
                typeProsthesis: datosSalud.typeProsthesis,
                psychDiagnosis: datosSalud.psychDiagnosis,
                psychhospitalization: datosSalud.psychhospitalization,
                hospitalizationReason: datosSalud.hospitalizationReason,
                otherT: datosSalud.otherT,
                otherTDiagnosis: datosSalud.otherTDiagnosis,
                otherTMedic: datosSalud.otherTMedic,
                studiesDiagnostic: datosSalud.studiesDiagnostic,
                hereditaryDiseases: datosSalud.hereditaryDiseases,
                bloodTransReason: datosSalud.bloodTransReason,
                studiesSixMonthsD: datosSalud.studiesSixMonthsD,
                VHDetail: datosSalud.VHDetail,
                adictionsDetail: datosSalud.adictionsDetail,
                eatingDisordersD: datosSalud.eatingDisordersD,
                otherPatD: datosSalud.otherPatD,
            });
            setInputsTextNum({
                dni: datosSalud.dni,
                otherTNumber: datosSalud.otherTNumber,
                childrens: datosSalud.childrens,
                weight: datosSalud.weight,
                height: datosSalud.height,
            });
            setInputsTextMix({
                psychMeds: datosSalud.psychMeds,
                VHDiagnostic: datosSalud.VHDiagnostic,
            });
            SetRadioInputs({
                surgeryRad: datosSalud.surgeryRad,
                paceMakerRad: datosSalud.paceMakerRad,
                prosthesisRad: datosSalud.prosthesisRad,
                psychiatricRad: datosSalud.psychiatricRad,
                psychActuallyRad: datosSalud.psychActuallyRad,
                hospitalizationRad: datosSalud.hospitalizationRad,
                otherTreatmentsRad: datosSalud.otherTreatmentsRad,
                medicalResultsRad: datosSalud.medicalResultsRad,
                hereditaryDiseasesRad: datosSalud.hereditaryDiseasesRad,
                bloodTransRad: datosSalud.bloodTransRad,
                pregnantRad: datosSalud.pregnantRad,
                studiesSixMonthsRad: datosSalud.studiesSixMonthsRad,
                visionHearingRad: datosSalud.visionHearingRad,
                diabetesRad: datosSalud.diabetesRad,
                adictionsRad: datosSalud.adictionsRad,
                treatmentAdictionsRad: datosSalud.treatmentAdictionsRad,
                eatingDisordersRad: datosSalud.eatingDisordersRad,
                otherPatRad: datosSalud.otherPatRad,
                disabilityCertRad: datosSalud.disabilityCertRad,
            });
            setDateInputs({
                dateSurgery: datosSalud.dateSurgery,
                prosthesisDate: datosSalud.prosthesisDate,
                psychhospitalizationDate: datosSalud.psychhospitalizationDate,
                hospitalizationDate: datosSalud.hospitalizationDate,
                medicalStudiesDate: datosSalud.medicalStudiesDate,
                bloodTransDate: datosSalud.bloodTransDate,
                treatmentDate: datosSalud.treatmentDate,
                formDate: datosSalud.formDate,
            });
            setcheckInputs({
                accept: datosSalud.accept,
            });

            setErrors((errors) => ({
                ...errors,
                textErrors: validator(
                    {
                        completeName: datosSalud.completeName,
                        typeSurgery: datosSalud.typeSurgery,
                        surgeryDiagnosis: datosSalud.surgeryDiagnosis,
                        typeProsthesis: datosSalud.typeProsthesis,
                        psychDiagnosis: datosSalud.psychDiagnosis,
                        psychhospitalization: datosSalud.psychhospitalization,
                        hospitalizationReason: datosSalud.hospitalizationReason,
                        otherT: datosSalud.otherT,
                        otherTDiagnosis: datosSalud.otherTDiagnosis,
                        otherTMedic: datosSalud.otherTMedic,
                        studiesDiagnostic: datosSalud.studiesDiagnostic,
                        hereditaryDiseases: datosSalud.hereditaryDiseases,
                        bloodTransReason: datosSalud.bloodTransReason,
                        studiesSixMonthsD: datosSalud.studiesSixMonthsD,
                        VHDetail: datosSalud.VHDetail,
                        adictionsDetail: datosSalud.adictionsDetail,
                        eatingDisordersD: datosSalud.eatingDisordersD,
                        disabilityCertRad: datosSalud.disabilityCertRad,
                        otherPatD: datosSalud.otherPatD,
                    },
                    'text'
                ),
                textMixErrors: validator(
                    {
                        psychMeds: datosSalud.psychMeds,
                        VHDiagnostic: datosSalud.VHDiagnostic,
                    },
                    'mix'
                ),
                textNumErrors: validator(
                    {
                        dni: datosSalud.dni,
                        otherTNumber: datosSalud.otherTNumber,
                        childrens: datosSalud.childrens,
                        weight: datosSalud.weight,
                        height: datosSalud.height,
                    },
                    'number'
                ),
                dateErrors: validator(
                    {
                        dateSurgery: datosSalud.dateSurgery,
                        prosthesisDate: datosSalud.prosthesisDate,
                        psychhospitalizationDate:
                            datosSalud.psychhospitalizationDate,
                        hospitalizationDate: datosSalud.hospitalizationDate,
                        medicalStudiesDate: datosSalud.medicalStudiesDate,
                        bloodTransDate: datosSalud.bloodTransDate,
                        treatmentDate: datosSalud.treatmentDate,
                        formDate: datosSalud.formDate,
                    },
                    'date'
                ),
                radioErrors: validator(
                    {
                        surgeryRad: datosSalud.surgeryRad,
                        paceMakerRad: datosSalud.paceMakerRad,
                        prosthesisRad: datosSalud.prosthesisRad,
                        psychiatricRad: datosSalud.psychiatricRad,
                        psychActuallyRad: datosSalud.psychActuallyRad,
                        hospitalizationRad: datosSalud.hospitalizationRad,
                        otherTreatmentsRad: datosSalud.otherTreatmentsRad,
                        medicalResultsRad: datosSalud.medicalResultsRad,
                        hereditaryDiseasesRad: datosSalud.hereditaryDiseasesRad,
                        bloodTransRad: datosSalud.bloodTransRad,
                        pregnantRad: datosSalud.pregnantRad,
                        studiesSixMonthsRad: datosSalud.studiesSixMonthsRad,
                        visionHearingRad: datosSalud.visionHearingRad,
                        diabetesRad: datosSalud.diabetesRad,
                        adictionsRad: datosSalud.adictionsRad,
                        treatmentAdictionsRad: datosSalud.treatmentAdictionsRad,
                        eatingDisordersRad: datosSalud.eatingDisordersRad,
                        otherPatRad: datosSalud.otherPatRad,
                    },
                    'radio'
                ),
                checkErrors: { accept: datosSalud.accept },
            }));
        }
    }, []);
    function saveInLocalStorage() {
        localStorage.setItem(
            'datosSalud',
            JSON.stringify({
                ...textInputs,
                ...textInputsNum,
                ...textInputsMix,
                ...dateInputs,
                ...radioInputs,
                ...checkInputs,
            })
        );
        localStorage.setItem('errorsSalud', JSON.stringify({ ...errors }));
    }
    const handleTextChange = (e) => {
        setTextInputs({ ...textInputs, [e.target.name]: e.target.value });

        setErrors({
            ...errors,
            textErrors: validator(
                { ...textInputs, [e.target.name]: e.target.value },
                'text'
            ),
        });
    };
    const handleTextNumberChange = (e) => {
        setInputsTextNum({ ...textInputsNum, [e.target.name]: e.target.value });

        setErrors({
            ...errors,
            textNumErrors: validator(
                { ...textInputsNum, [e.target.name]: e.target.value },
                'number'
            ),
        });
    };
    const handleTextMixChange = (e) => {
        setInputsTextMix({ ...textInputsMix, [e.target.name]: e.target.value });

        setErrors({
            ...errors,
            textMixErrors: validator(
                { ...textInputsMix, [e.target.name]: e.target.value },
                'mix'
            ),
        });
    };

    const handleRadioInputs = (e) => {
        SetRadioInputs((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
        setErrors({
            ...errors,
            radioErrors: validator(
                { ...radioInputs, [e.target.name]: e.target.value },
                'radio'
            ),
        });
    };
    const handleDate = (e) => {
        setDateInputs((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
        setErrors({
            ...errors,
            dateErrors: validator(
                { ...dateInputs, [e.target.name]: e.target.value },
                'date'
            ),
        });
    };
    useEffect(() => {
        if (radioInputs.surgeryRad === 'No') {
            setTextInputs({
                ...textInputs,
                typeSurgery: 'hide',
                surgeryDiagnosis: 'hide',
            });
            setDateInputs({ ...dateInputs, dateSurgery: 'hide' });
        }
    }, [radioInputs.surgeryRad]);

    useEffect(() => {
        if (radioInputs.prosthesisRad === 'No') {
            setTextInputs({ ...textInputs, typeProsthesis: 'hide' });
            setDateInputs({ ...dateInputs, prosthesisDate: 'hide' });
        }
    }, [radioInputs.prosthesisRad]);

    useEffect(() => {
        if (radioInputs.psychActuallyRad === 'No') {
            setTextInputs({
                ...textInputs,
                psychhospitalization: 'hide',
                psychDiagnosis: 'hide',
            });
            setInputsTextMix({ ...textInputsMix, psychMeds: 'hide' });
            setDateInputs({ ...dateInputs, psychhospitalizationDate: 'hide' });
        }
    }, [radioInputs.psychActuallyRad]);

    useEffect(() => {
        if (radioInputs.hospitalizationRad === 'No') {
            setTextInputs({ ...textInputs, hospitalizationReason: 'hide' });
            setDateInputs({ ...dateInputs, hospitalizationDate: 'hide' });
        }
    }, [radioInputs.hospitalizationRad]);

    useEffect(() => {
        if (radioInputs.otherTreatmentsRad === 'No') {
            setTextInputs({
                ...textInputs,
                otherT: 'hide',
                otherTDiagnosis: 'hide',
                otherTMedic: 'hide',
            });
            setInputsTextNum({ ...textInputsNum, otherTNumber: 'hide' });
        }
    }, [radioInputs.otherTreatmentsRad]);

    useEffect(() => {
        if (radioInputs.hereditaryDiseasesRad === 'No') {
            setTextInputs({ ...textInputs, hereditaryDiseases: 'hide' });
        }
    }, [radioInputs.hereditaryDiseasesRad]);

    useEffect(() => {
        if (radioInputs.bloodTransRad === 'No') {
            setTextInputs({ ...textInputs, bloodTransReason: 'hide' });
            setDateInputs({ ...dateInputs, bloodTransDate: 'hide' });
        }
    }, [radioInputs.bloodTransRad]);

    useEffect(() => {
        if (radioInputs.studiesSixMonthsRad === 'No') {
            setTextInputs({ ...textInputs, studiesSixMonthsD: 'hide' });
        }
    }, [radioInputs.studiesSixMonthsRad]);

    useEffect(() => {
        if (radioInputs.visionHearingRad === 'No') {
            setTextInputs({ ...textInputs, VHDetail: 'hide' });
            setInputsTextMix({ ...textInputsMix, VHDiagnostic: 'hide' });
        }
    }, [radioInputs.visionHearingRad]);

    useEffect(() => {
        if (radioInputs.adictionsRad === 'No') {
            setTextInputs({ ...textInputs, adictionsDetail: 'hide' });
        }
    }, [radioInputs.adictionsRad]);

    useEffect(() => {
        if (radioInputs.treatmentAdictionsRad === 'No') {
            setDateInputs({ ...dateInputs, treatmentDate: 'hide' });
        }
    }, [radioInputs.treatmentAdictionsRad]);

    useEffect(() => {
        if (radioInputs.adictionsRad === 'No') {
            setTextInputs({ ...textInputs, adictionsDetail: 'hide' });
        }
    }, [radioInputs.adictionsRad]);

    useEffect(() => {
        if (radioInputs.eatingDisordersRad === 'No') {
            setTextInputs({ ...textInputs, eatingDisordersD: 'hide' });
        }
    }, [radioInputs.eatingDisordersRad]);

    useEffect(() => {
        if (radioInputs.otherPatRad === 'No') {
            setTextInputs({ ...textInputs, otherPatD: 'hide' });
        }
    }, [radioInputs.otherPatRad]);

    return (
        <div className={styles.conteiner}>
            <div>
                <h4> Declaracion jurada de antecedentes de salud </h4>
                <TextField
                    name='completeName'
                    label='Nombre y Apeliido'
                    variant='outlined'
                    value={textInputs.completeName}
                    onChange={handleTextChange}
                    onBlur={saveInLocalStorage}
                    {...(errors.textErrors.completeName && {
                        error: errors.textErrors.completeName,
                        helperText: errors.textErrors.completeName,
                    })}
                />
                <TextField
                    name='dni'
                    label='DNI'
                    type='number'
                    variant='outlined'
                    value={textInputsNum.dni}
                    onChange={handleTextNumberChange}
                    onBlur={saveInLocalStorage}
                    inputProps={{
                        min: 0,
                    }}
                />
            </div>
            <div classsname={styles.pocho}>
                <FormLabel component='legend'>
                    {' '}
                    1¿Posee antecedentes de cirugías?{' '}
                </FormLabel>
                <RadioGroup
                    aria-label='Surgery'
                    name='surgeryRad'
                    value={radioInputs.surgeryRad}
                    onChange={handleRadioInputs}
                    onBlur={saveInLocalStorage}
                >
                    <FormControlLabel
                        value='No'
                        control={<Radio />}
                        label='No'
                    />
                    <FormControlLabel
                        value='Si'
                        control={<Radio />}
                        label='Si'
                    />
                </RadioGroup>
                {radioInputs.surgeryRad === 'Si' ? (
                    <div>
                        <TextField
                            name='typeSurgery'
                            label='Tipo de Cirugia'
                            variant='outlined'
                            value={textInputs.typeSurgery}
                            onChange={handleTextChange}
                            onBlur={saveInLocalStorage}
                            {...(errors.textErrors.typeSurgery && {
                                error: errors.textErrors.typeSurgery,
                                helperText: errors.textErrors.typeSurgery,
                            })}
                        />
                        <TextField
                            name='dateSurgery'
                            label='Fecha'
                            variant='outlined'
                            type='date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleDate}
                            value={dateInputs.dateSurgery}
                            onBlur={saveInLocalStorage}
                        />
                        <TextField
                            name='surgeryDiagnosis'
                            label='Diagnostico'
                            variant='outlined'
                            value={textInputs.surgeryDiagnosis}
                            onChange={handleTextChange}
                            onBlur={saveInLocalStorage}
                            {...(errors.textErrors.surgeryDiagnosis && {
                                error: errors.textErrors.surgeryDiagnosis,
                                helperText: errors.textErrors.surgeryDiagnosis,
                            })}
                        />
                    </div>
                ) : null}
            </div>
            <FormLabel component='legend'>
                {' '}
                2- ¿Tiene colocado un marcapasos o cardiodesfibrilador?{' '}
            </FormLabel>
            <RadioGroup
                aria-label='paceMaker'
                name='paceMakerRad'
                value={radioInputs.paceMakerRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>
            <FormLabel component='legend'>
                {' '}
                3- ¿Tiene colocada una prótesis traumatológica?{' '}
            </FormLabel>
            <RadioGroup
                aria-label='prosthesis'
                name='prosthesisRad'
                value={radioInputs.prosthesisRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>
            {radioInputs.prosthesisRad === 'Si' ? (
                <div>
                    <TextField
                        name='prosthesisDate'
                        label='Fecha'
                        variant='outlined'
                        value={dateInputs.prosthesisDate}
                        type='date'
                        InputLabelProps={{ shrink: true }}
                        onChange={handleDate}
                        onBlur={saveInLocalStorage}
                    />
                    <TextField
                        name='typeProsthesis'
                        label='Tipo de prótesis:'
                        variant='outlined'
                        value={textInputs.typeProsthesis}
                        onChange={handleTextChange}
                        onBlur={saveInLocalStorage}
                        {...(errors.textErrors.typeProsthesis && {
                            error: errors.textErrors.typeProsthesis,
                            helperText: errors.textErrors.typeProsthesis,
                        })}
                    />
                </div>
            ) : null}

            <FormLabel component='legend'>
                4-¿Cuenta con antecedentes de enfermedades psiquiátricas?{' '}
            </FormLabel>
            <RadioGroup
                aria-label='psych'
                name='psychiatricRad'
                value={radioInputs.psychiatricRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>
            <FormLabel component='legend'>
                ¿Está actualmente en tratamiento psiquiátrico?
            </FormLabel>
            <RadioGroup
                aria-label='psychActually'
                name='psychActuallyRad'
                value={radioInputs.psychActuallyRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>
            {radioInputs.psychActuallyRad === 'Si' ? (
                <div>
                    <TextField
                        name='psychDiagnosis'
                        label='Diagnóstico'
                        variant='outlined'
                        value={textInputs.psychDiagnosis}
                        onChange={handleTextChange}
                        onBlur={saveInLocalStorage}
                        {...(errors.textErrors.psychDiagnosis && {
                            error: errors.textErrors.psychDiagnosis,
                            helperText: errors.textErrors.psychDiagnosis,
                        })}
                    />
                    <TextField
                        name='psychMeds'
                        label='Medicación'
                        variant='outlined'
                        value={textInputsMix.psychMeds}
                        onChange={handleTextMixChange}
                        onBlur={saveInLocalStorage}
                    />
                    <TextField
                        name='psychhospitalization'
                        label='Internaciones Psiquiátricas'
                        variant='outlined'
                        value={textInputs.psychhospitalization}
                        onChange={handleTextChange}
                        onBlur={saveInLocalStorage}
                        {...(errors.textErrors.psychhospitalization && {
                            error: errors.textErrors.psychhospitalization,
                            helperText: errors.textErrors.psychhospitalization,
                        })}
                    />
                    <TextField
                        name='psychhospitalizationDate'
                        label='Fecha'
                        variant='outlined'
                        value={dateInputs.psychhospitalizationDate}
                        type='date'
                        InputLabelProps={{ shrink: true }}
                        onChange={handleDate}
                        onBlur={saveInLocalStorage}
                    />
                </div>
            ) : null}

            <FormLabel component='legend'>
                5- ¿Tiene antecedentes de internaciones clínicas?
            </FormLabel>
            <RadioGroup
                aria-label='hospitalization'
                name='hospitalizationRad'
                value={radioInputs.hospitalizationRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>
            {radioInputs.hospitalizationRad === 'Si' ? (
                <div>
                    <TextField
                        name='hospitalizationReason'
                        label='Motivo'
                        variant='outlined'
                        value={textInputs.hospitalizationReason}
                        onChange={handleTextChange}
                        onBlur={saveInLocalStorage}
                        {...(errors.textErrors.hospitalizationReason && {
                            error: errors.textErrors.hospitalizationReason,
                            helperText: errors.textErrors.hospitalizationReason,
                        })}
                    />
                    <TextField
                        name='hospitalizationDate'
                        label='Fecha'
                        variant='outlined'
                        value={dateInputs.hospitalizationDate}
                        type='date'
                        InputLabelProps={{ shrink: true }}
                        onChange={handleDate}
                        onBlur={saveInLocalStorage}
                    />
                </div>
            ) : null}

            <FormLabel component='legend'>
                6- ¿Se encuentra realizando algún tratamiento (fonoaudiología,
                psicomotricidad, kinesiología, terapia ocupacional, otros)?
            </FormLabel>
            <RadioGroup
                aria-label='otherTreatments'
                name='otherTreatmentsRad'
                value={radioInputs.otherTreatmentsRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>
            {radioInputs.otherTreatmentsRad === 'Si' ? (
                <div>
                    <TextField
                        name='otherT'
                        label='¿Cuál/es?'
                        variant='outlined'
                        value={textInputs.otherT}
                        onChange={handleTextChange}
                        onBlur={saveInLocalStorage}
                        {...(errors.textErrors.otherT && {
                            error: errors.textErrors.otherT,
                            helperText: errors.textErrors.otherT,
                        })}
                    />
                    <TextField
                        name='otherTDiagnosis'
                        label='Diagnóstico'
                        variant='outlined'
                        value={textInputs.otherTDiagnosis}
                        onChange={handleTextChange}
                        onBlur={saveInLocalStorage}
                        {...(errors.textErrors.otherTDiagnosis && {
                            error: errors.textErrors.otherTDiagnosis,
                            helperText: errors.textErrors.otherTDiagnosis,
                        })}
                    />
                    <TextField
                        name='otherTMedic'
                        label='Médico Tratante'
                        variant='outlined'
                        value={textInputs.otherTMedic}
                        onChange={handleTextChange}
                        onBlur={saveInLocalStorage}
                        {...(errors.textErrors.otherTMedic && {
                            error: errors.textErrors.otherTMedic,
                            helperText: errors.textErrors.otherTMedic,
                        })}
                    />
                    <TextField
                        name='otherTNumber'
                        label='Teléfono'
                        type='number'
                        variant='outlined'
                        value={textInputsNum.otherTNumber}
                        onChange={handleTextNumberChange}
                        onBlur={saveInLocalStorage}
                    />
                </div>
            ) : null}

            <FormLabel component='legend'>
                7- Fecha de la última vez que se realizó estudios - análisis
            </FormLabel>
            <TextField
                name='medicalStudiesDate'
                variant='outlined'
                value={dateInputs.medicalStudiesDate}
                type='date'
                InputLabelProps={{ shrink: true }}
                onChange={handleDate}
                onBlur={saveInLocalStorage}
            />
            <FormLabel component='legend'>¿El resultado fue normal?</FormLabel>
            <RadioGroup
                aria-label='medicalResults'
                name='medicalResultsRad'
                value={radioInputs.medicalResultsRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>

            {radioInputs.medicalResultsRad === 'No' ? (
                <div>
                    <TextField
                        name='studiesDiagnostic'
                        label='Diagnóstico'
                        variant='outlined'
                        value={textInputs.studiesDiagnostic}
                        onChange={handleTextChange}
                        onBlur={saveInLocalStorage}
                        {...(errors.textErrors.studiesDiagnostic && {
                            error: errors.textErrors.studiesDiagnostic,
                            helperText: errors.textErrors.studiesDiagnostic,
                        })}
                    />
                </div>
            ) : null}

            <FormLabel component='legend'>
                8- ¿Padece enfermedades congénitas o hereditarias?
            </FormLabel>
            <RadioGroup
                aria-label='hereditaryDiseases'
                name='hereditaryDiseasesRad'
                value={radioInputs.hereditaryDiseasesRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>
            {radioInputs.hereditaryDiseasesRad === 'Si' ? (
                <div>
                    <TextField
                        name='hereditaryDiseases'
                        label='¿Cuál/es?'
                        variant='outlined'
                        value={textInputs.hereditaryDiseases}
                        onChange={handleTextChange}
                        onBlur={saveInLocalStorage}
                        {...(errors.textErrors.hereditaryDiseases && {
                            error: errors.textErrors.hereditaryDiseases,
                            helperText: errors.textErrors.hereditaryDiseases,
                        })}
                    />
                </div>
            ) : null}

            <FormLabel component='legend'>
                9- ¿Ha recibido transfusiones de sangre?
            </FormLabel>
            <RadioGroup
                aria-label='bloodTrans'
                name='bloodTransRad'
                value={radioInputs.bloodTransRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>
            {radioInputs.bloodTransRad === 'Si' ? (
                <div>
                    <TextField
                        name='bloodTransReason'
                        label='Causa'
                        variant='outlined'
                        value={textInputs.bloodTransReason}
                        onChange={handleTextChange}
                        onBlur={saveInLocalStorage}
                        {...(errors.textErrors.bloodTransReason && {
                            error: errors.textErrors.bloodTransReason,
                            helperText: errors.textErrors.bloodTransReason,
                        })}
                    />
                    <TextField
                        name='bloodTransDate'
                        label='Fecha'
                        variant='outlined'
                        value={dateInputs.bloodTransDate}
                        type='date'
                        InputLabelProps={{ shrink: true }}
                        onChange={handleDate}
                        onBlur={saveInLocalStorage}
                    />
                </div>
            ) : null}
            <FormLabel component='legend'>10- ¿Está embarazada?</FormLabel>
            <RadioGroup
                aria-label='pregnant'
                name='pregnantRad'
                value={radioInputs.pregnantRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>
            <FormLabel component='legend'>11-Cantidad de hijos</FormLabel>
            <TextField
                name='childrens'
                label=''
                type='number'
                variant='outlined'
                value={textInputsNum.childrens}
                onChange={handleTextNumberChange}
                onBlur={saveInLocalStorage}
            />
            <FormLabel component='legend'>
                12- ¿Padece actualmente alguna enfermedad o alteración física
                que requiera estudios, cirugías o internaciones en los próximos
                6 meses?
            </FormLabel>
            <RadioGroup
                aria-label='StudiesSixMonths'
                name='studiesSixMonthsRad'
                value={radioInputs.studiesSixMonthsRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>
            {radioInputs.studiesSixMonthsRad === 'Si' ? (
                <div>
                    <TextField
                        name='studiesSixMonthsD'
                        label='¿Cuál/es?'
                        variant='outlined'
                        value={textInputs.studiesSixMonthsD}
                        onChange={handleTextChange}
                        onBlur={saveInLocalStorage}
                        {...(errors.textErrors.studiesSixMonthsD && {
                            error: errors.textErrors.studiesSixMonthsD,
                            helperText: errors.textErrors.studiesSixMonthsD,
                        })}
                    />
                </div>
            ) : null}

            <FormLabel component='legend'>
                13-¿Tiene dificultades en la visión y/o en la audición?
            </FormLabel>
            <RadioGroup
                aria-label='visionHearing'
                name='visionHearingRad'
                value={radioInputs.visionHearingRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
                {radioInputs.visionHearingRad === 'Si' ? (
                    <div>
                        <TextField
                            name='VHDetail'
                            label='¿Cuál/es?'
                            variant='outlined'
                            value={textInputs.VHDetail}
                            onChange={handleTextChange}
                            onBlur={saveInLocalStorage}
                            {...(errors.textErrors.VHDetail && {
                                error: errors.textErrors.VHDetail,
                                helperText: errors.textErrors.VHDetail,
                            })}
                        />
                        <TextField
                            name='VHDiagnostic'
                            label='Diagnostico'
                            variant='outlined'
                            value={textInputsMix.VHDiagnostic}
                            onChange={handleTextMixChange}
                            onBlur={saveInLocalStorage}
                        />
                    </div>
                ) : null}
            </RadioGroup>

            <FormLabel component='legend'>
                14- ¿Ha presentado o presenta alguna de estas patologías:
                diabetes tipo 1 o 2, VIH, hepatitis B, hepatitis C,
                tuberculosis, mal de Chagas?
            </FormLabel>
            <RadioGroup
                aria-label='diabetes'
                name='diabetesRad'
                value={radioInputs.diabetesRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>

            <FormLabel component='legend'>
                {' '}
                15- ¿Padece o padeció adicciones (drogas, alcohol, etc.)?{' '}
            </FormLabel>
            <RadioGroup
                aria-label='adictions'
                name='adictionsRad'
                value={radioInputs.adictionsRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>
            {radioInputs.adictionsRad === 'Si' ? (
                <div>
                    <TextField
                        name='adictionsDetail'
                        label='¿Cuál/es?'
                        variant='outlined'
                        value={textInputs.adictionsDetail}
                        onChange={handleTextChange}
                        onBlur={saveInLocalStorage}
                        {...(errors.textErrors.adictionsDetail && {
                            error: errors.textErrors.adictionsDetail,
                            helperText: errors.textErrors.adictionsDetail,
                        })}
                    />
                </div>
            ) : null}

            <FormLabel component='legend'>
                {' '}
                ¿Está o estuvo en tratamiento?{' '}
            </FormLabel>
            <RadioGroup
                aria-label='treatmentAdictions'
                name='treatmentAdictionsRad'
                value={radioInputs.treatmentAdictionsRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>
            {radioInputs.treatmentAdictionsRad === 'Si' && (
                <div>
                    <TextField
                        name='treatmentDate'
                        label='Fecha del tratamiento'
                        variant='outlined'
                        value={dateInputs.treatmentDate}
                        type='date'
                        InputLabelProps={{ shrink: true }}
                        onChange={handleDate}
                        onBlur={saveInLocalStorage}
                    />
                </div>
            )}

            <FormLabel component='legend'>
                {' '}
                16- ¿Presenta trastornos de la alimentación (bulimia,
                anorexia,obesidad)?{' '}
            </FormLabel>
            <RadioGroup
                aria-label='eatingDisorders'
                name='eatingDisordersRad'
                value={radioInputs.eatingDisordersRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>
            {radioInputs.eatingDisordersRad === 'Si' && (
                <div>
                    <TextField
                        name='eatingDisordersD'
                        label='¿Cuál/es?'
                        variant='outlined'
                        value={textInputs.eatingDisordersD}
                        onChange={handleTextChange}
                        onBlur={saveInLocalStorage}
                        {...(errors.textErrors.eatingDisordersD && {
                            error: errors.textErrors.eatingDisordersD,
                            helperText: errors.textErrors.eatingDisordersD,
                        })}
                    />
                </div>
            )}

            <FormLabel component='legend'>17-Peso </FormLabel>
            <TextField
                name='weight'
                variant='outlined'
                type='number'
                value={textInputsNum.weight}
                InputProps={{
                    inputProps: {
                        min: 0,
                    },
                    endAdornment: (
                        <InputAdornment position='start'>Kg</InputAdornment>
                    ),
                }}
                onChange={handleTextNumberChange}
                onBlur={saveInLocalStorage}
            />
            <FormLabel component='legend'>18- Altura </FormLabel>
            <TextField
                name='height'
                type='number'
                variant='outlined'
                value={textInputsNum.height}
                InputProps={{
                    inputProps: {
                        min: 0,
                    },
                    endAdornment: (
                        <InputAdornment position='start'>cm</InputAdornment>
                    ),
                }}
                onChange={handleTextNumberChange}
                onBlur={saveInLocalStorage}
            />

            <FormLabel component='legend'>
                {' '}
                19- ¿Tiene, tuvo o está tramitando un certificado de
                discapacidad?{' '}
            </FormLabel>
            <RadioGroup
                aria-label='disabilityCert'
                name='disabilityCertRad'
                value={radioInputs.disabilityCertRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
            </RadioGroup>

            <FormLabel component='legend'>
                {' '}
                20- ¿Padece o padeció alguna patología aparte de las mencionadas
                en los puntos anteriores ?{' '}
            </FormLabel>
            <RadioGroup
                aria-label='otherPat'
                name='otherPatRad'
                value={radioInputs.otherPatRad}
                onChange={handleRadioInputs}
                onBlur={saveInLocalStorage}
            >
                <FormControlLabel value='No' control={<Radio />} label='No' />
                <FormControlLabel value='Si' control={<Radio />} label='Si' />
                {radioInputs.otherPatRad === 'Si' ? (
                    <div>
                        <TextField
                            name='otherPatD'
                            label='¿Cuál/es?'
                            variant='outlined'
                            value={textInputs.otherPatD}
                            onChange={handleTextChange}
                            onBlur={saveInLocalStorage}
                            {...(errors.textErrors.otherPatD && {
                                error: errors.textErrors.otherPatD,
                                helperText: errors.textErrors.otherPatD,
                            })}
                        />
                    </div>
                ) : null}
            </RadioGroup>
            <TextField
                name='formDate'
                label='Fecha de Formulario'
                variant='outlined'
                value={dateInputs.formDate}
                type='date'
                InputLabelProps={{ shrink: true }}
                onChange={handleDate}
                onBlur={saveInLocalStorage}
            />
            <div>
                <Checkbox
                    name='accept'
                    color='primary'
                    checked={checkInputs.accept}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    onChange={(e) => {
                        setcheckInputs({
                            [e.target.name]: e.target.checked,
                        });
                        setErrors({
                            ...errors,
                            checkErrors: { [e.target.name]: e.target.checked },
                        });
                    }}
                    onBlur={saveInLocalStorage}
                />

                <FormLabel component='legend'>
                    "Declaro bajo juramento que en la presente informé la
                    totalidad de mis antecedentes de salud y/o de cada uno de
                    los integrantes de mi grupo familiar, no habiendo omitido
                    dato alguno, estando por lo tanto INTEGRA facultado para
                    resolver el vínculo en caso de falsedad en los términos del
                    Dec. Reg. 1993/11, art. 9, inc. b, el que también declaro
                    conocer. Autorizo expresamente a INTEGRA a requerir
                    información médica referida a mi persona y/o grupo familiar
                    a cualquier prestador y/o institución de salud."
                </FormLabel>
            </div>
        </div>
    );
};
export default DatosSalud;
