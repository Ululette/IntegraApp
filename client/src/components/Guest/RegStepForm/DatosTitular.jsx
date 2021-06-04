import React, { useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import styles from './DatosTitular.module.css';
import validator from './Validator';
import useQuery from '../../../hooks/query';
import supabase from '../../../supabase.config';

const DatosTitular = () => {
    const [allStates, setAllStates] = useState([]);
    const [allLocalities, setAllLocalities] = useState([]);

    const provincias = async () => {
        const { data: Prov } = await supabase.from('states').select();
        setAllStates(Prov);
    };
    const localidades = async (provincia) => {
        let idprov = provincia.split('-')[0];
        console.log(idprov);
        const { data: local, error: errorlocal } = await supabase
            .from('localities')
            .select('id, state_id,name')
            .eq('state_id', Number(idprov));
        console.log(errorlocal);
        setAllLocalities(local);
        console.log(local);

        return local;
    };

    useEffect(() => {
        provincias();
    }, []);

    const [textInputs, setTextInputs] = useState({
        first_name: '',
        last_name: '',
        occupation: '',
    });
    const [textInputsNum, setInputsTextNum] = useState({
        dni: '',
        cuil: '',
        phone_number: '',
        number: '',
    });
    const [textInputsMix, setInputsTextMix] = useState({
        street_name: '',
    });
    const [dateInputs, setDateInputs] = useState({
        birth_date: '',
    });
    const [selectInputs, setSelectInputs] = useState({
        marital_status: '',
        gender: '',
        state: '',
        locality: '',
    });
    const [emailInputs, setEmailInputs] = useState({ email: '' });
    const [apartmentInput, setApartmentInput] = useState({ apartment: '' });
    const [errors, setErrors] = useState({
        textErrors: {
            first_name: '',
            last_name: '',
            occupation: '',
        },
        textNumErrors: {
            dni: '',
            cuil: '',
            phone_number: '',
            number: '',
        },
        textMixErrors: {
            street_name: '',
        },
        dateErrors: { birth_date: '' },
        selectErrors: {
            marital_status: '',
            gender: '',
            locality: '',
            state: '',
        },
        emailErrors: { email: '' },
    });
    let dataQuery = {
        name: useQuery().get('first_name'),
        email: useQuery().get('email'),
        dni: useQuery().get('dni'),
        phone: useQuery().get('phone_number'),
    };
    useEffect(() => {
        const datosTitular = JSON.parse(localStorage.getItem('datosTitular'));

        if (dataQuery) {
            setTextInputs({ ...textInputs, first_name: dataQuery.name });
            setInputsTextNum({
                ...textInputsNum,
                dni: dataQuery.dni,
                phone_number: dataQuery.phone_number,
            });
            setEmailInputs({
                email: dataQuery.email,
            });
        }
        if (datosTitular) {
            setTextInputs({
                first_name: datosTitular.first_name,
                last_name: datosTitular.last_name,
                occupation: datosTitular.occupation,
            });
            setInputsTextNum({
                dni: datosTitular.dni,
                cuil: datosTitular.cuil,
                phone_number: datosTitular.phone_number,
                number: datosTitular.number,
            });
            setInputsTextMix({
                street_name: datosTitular.street_name,
            });
            setEmailInputs({
                email: datosTitular.email,
            });
            setDateInputs({
                birth_date: datosTitular.birth_date,
            });
            setSelectInputs({
                marital_status: datosTitular.marital_status,
                gender: datosTitular.gender,
                locality: datosTitular.locality, //falta
                state: datosTitular.state,
            });
            setApartmentInput({ apartment: datosTitular.apartment });

            setErrors((errors) => ({
                ...errors,
                textErrors: validator(
                    {
                        first_name: datosTitular.first_name,
                        last_name: datosTitular.last_name,
                        occupation: datosTitular.occupation,
                    },
                    'text'
                ),
            }));
            setErrors((errors) => ({
                ...errors,
                textNumErrors: validator(
                    {
                        dni: datosTitular.dni,
                        cuil: datosTitular.cuil,
                        phone_number: datosTitular.phone_number,
                        number: datosTitular.number,
                    },
                    'number'
                ),
            }));
            setErrors((errors) => ({
                ...errors,
                textMixErrors: validator(
                    {
                        street_name: datosTitular.street_name,
                    },
                    'mix'
                ),
            }));
            setErrors((errors) => ({
                ...errors,
                dateErrors: validator(
                    {
                        birth_date: datosTitular.birth_date,
                    },
                    'date'
                ),
            }));
            setErrors((errors) => ({
                ...errors,
                emailErrors: validator(
                    {
                        email: datosTitular.email,
                    },
                    'email'
                ),
            }));
            setErrors((errors) => ({
                ...errors,
                selectErrors: validator(
                    {
                        marital_status: datosTitular.marital_status,
                        gender: datosTitular.gender,
                        locality: datosTitular.locality, //falta
                        state: datosTitular.state,
                    },
                    'radio'
                ),
            }));
        }
        //eslint-disable-next-line
    }, []);

    function saveInLocalStorage() {
        localStorage.setItem(
            'datosTitular',
            JSON.stringify({
                ...textInputs,
                ...textInputsNum,
                ...textInputsMix,
                ...dateInputs,
                ...emailInputs,
                ...selectInputs,
                ...apartmentInput,
            })
        );
        localStorage.setItem('errorsTitular', JSON.stringify({ ...errors }));
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

    const handleDateChange = (e) => {
        setDateInputs({ ...dateInputs, [e.target.name]: e.target.value });

        setErrors({
            ...errors,
            dateErrors: validator(
                { ...dateInputs, [e.target.name]: e.target.value },
                'date'
            ),
        });
    };

    const handleSelectChange = (e) => {
        setSelectInputs({ ...selectInputs, [e.target.name]: e.target.value });

        setErrors({
            ...errors,
            selectErrors: validator(
                { ...selectInputs, [e.target.name]: e.target.value },
                'radio'
            ),
        });
    };

    const handleEmailChange = (e) => {
        setEmailInputs({
            ...emailInputs,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            emailErrors: validator(
                { ...emailInputs, [e.target.name]: e.target.value },
                'email'
            ),
        });
    };

    useEffect(() => {
        localidades(selectInputs.state);
    }, [selectInputs.state]);

    const states = allStates.map((s) => {
        return <option value={`${s.id}-${s.name}`}>{s.name}</option>;
    });
    //1-buenos aires
    const localities =
        allLocalities &&
        allLocalities
            //eslint-disable-next-line
            .filter((l) => l.state_id == selectInputs.state.split('-')[0])
            .map((l) => {
                return <option value={`${l.id}-${l.name}`}>{l.name}</option>;
            });
    // console.log("localities", localities);
    return (
        <div className={styles.form}>
            <div className={styles.personalData}>
                <div className={styles.firstColumn}>
                    <label htmlFor=''>Datos del titular</label>
                    <div className={styles.input}>
                        <TextField
                            id='first_name-input'
                            label='Nombre'
                            type='text'
                            name='first_name'
                            autoComplete='off'
                            value={textInputs.first_name}
                            variant='outlined'
                            onChange={(e) => handleTextChange(e)}
                            {...(errors.textErrors.first_name && {
                                error: !!errors.textErrors.first_name,
                                helperText: 'Nombre invalido',
                            })}
                            onBlur={saveInLocalStorage}
                        />
                    </div>
                    <div className={styles.input}>
                        <TextField
                            id='last_name-input'
                            label='Apellido'
                            type='text'
                            name='last_name'
                            autoComplete='off'
                            value={textInputs.last_name}
                            variant='outlined'
                            onChange={(e) => handleTextChange(e)}
                            {...(errors.textErrors.last_name && {
                                error: !!errors.textErrors.last_name,
                                helperText: 'Nombre invalido',
                            })}
                            onBlur={saveInLocalStorage}
                        />
                    </div>
                    <div className={styles.input}>
                        <FormControl
                            variant='outlined'
                            error={errors.selectErrors.gender}
                        >
                            <InputLabel htmlFor='gender-select'>
                                Sexo
                            </InputLabel>
                            <Select
                                native
                                value={selectInputs.gender}
                                onChange={(e) => handleSelectChange(e)}
                                label='Genero'
                                inputProps={{
                                    name: 'gender',
                                    id: 'gender-select',
                                    style: { width: '177px' },
                                }}
                                onBlur={saveInLocalStorage}
                            >
                                <option aria-label='None' value='' />
                                <option value={'Masculino'}>Masculino</option>
                                <option value={'Femenino'}>Femenino</option>
                                <option value={'Otro'}>Otro</option>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={styles.input}>
                        <TextField
                            id='dni-input'
                            label='DNI'
                            type='text'
                            name='dni'
                            autoComplete='off'
                            value={textInputsNum.dni}
                            variant='outlined'
                            onChange={(e) => handleTextNumberChange(e)}
                            {...(errors.textNumErrors.dni && {
                                error: !!errors.textNumErrors.dni,
                                helperText: 'Dni invalido',
                            })}
                            inputProps={{ maxLength: 8 }}
                            onBlur={saveInLocalStorage}
                        />
                    </div>
                    <div className={styles.input}>
                        <TextField
                            id='cuil-input'
                            label='CUIL'
                            type='text'
                            name='cuil'
                            autoComplete='off'
                            value={textInputsNum.cuil}
                            variant='outlined'
                            onChange={(e) => handleTextNumberChange(e)}
                            {...(errors.textNumErrors.cuil && {
                                error: !!errors.textNumErrors.cuil,
                                helperText: 'CUIL invalida.',
                            })}
                            onBlur={saveInLocalStorage}
                        />
                    </div>
                    <div className={styles.input}>
                        <TextField
                            id='phone-input'
                            label='Teléfono'
                            type='text'
                            name='phone_number'
                            autoComplete='off'
                            value={textInputsNum.phone_number}
                            variant='outlined'
                            onChange={(e) => handleTextNumberChange(e)}
                            {...(errors.textNumErrors.phone_number && {
                                error: !!errors.textNumErrors.phone_number,
                                helperText: 'Teléfono invalido',
                            })}
                            inputProps={{ maxLength: 12 }}
                            onBlur={saveInLocalStorage}
                        />
                    </div>
                </div>
                <div className={styles.secondColumn}>
                    <label>{` `}</label>
                    <div className={styles.input}>
                        <TextField
                            id='mail-input'
                            label='Email'
                            type='text'
                            name='email'
                            autoComplete='off'
                            value={emailInputs.email}
                            variant='outlined'
                            onChange={(e) => handleEmailChange(e)}
                            {...(errors.emailErrors.email && {
                                error: !!errors.emailErrors.email,
                                helperText: 'Email invalido',
                            })}
                            onBlur={saveInLocalStorage}
                        />
                    </div>
                    <div className={styles.input}>
                        <TextField
                            id='occupation-input'
                            label='Ocupacion'
                            type='text'
                            name='occupation'
                            autoComplete='off'
                            value={textInputs.occupation}
                            variant='outlined'
                            onChange={(e) => handleTextChange(e)}
                            {...(errors.textErrors.occupation && {
                                error: !!errors.textErrors.occupation,
                                helperText: 'Debe ingresar una ocupacion',
                            })}
                            onBlur={saveInLocalStorage}
                        />
                    </div>
                    <div className={styles.input}>
                        <FormControl
                            variant='outlined'
                            error={errors.selectErrors.marital_status}
                        >
                            <InputLabel htmlFor='marital_status-select'>
                                Estado civil
                            </InputLabel>
                            <Select
                                native
                                value={selectInputs.marital_status}
                                onChange={(e) => handleSelectChange(e)}
                                label='Estado civil'
                                inputProps={{
                                    name: 'marital_status',
                                    id: 'marital_status-select',
                                    style: { width: '177px' },
                                }}
                                onBlur={saveInLocalStorage}
                            >
                                <option aria-label='None' value='' />
                                <option value={'Casado/a'}>Casado/a</option>
                                <option value={'Soltero/a'}>Soltero/a</option>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={styles.input}>
                        <TextField
                            id='birth'
                            label='Birthday'
                            name='birth_date'
                            type='date'
                            variant='outlined'
                            // style={{width:'177px'}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleDateChange}
                            value={dateInputs.birth_date}
                            error={!!errors.dateErrors.birth_date}
                            helperText={
                                errors.dateErrors.birth_date &&
                                errors.dateErrors.birth_date
                            }
                            onBlur={saveInLocalStorage}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.addressData}>
                <label htmlFor=''>Dirección</label>
                <div className={styles.input}>
                    <TextField
                        id='street_name-input'
                        label='Calle'
                        type='text'
                        name='street_name'
                        autoComplete='off'
                        value={textInputsMix.street_name}
                        variant='outlined'
                        onChange={(e) => handleTextMixChange(e)}
                        {...(errors.textMixErrors.street_name && {
                            error: !!errors.textMixErrors.street_name,
                            helperText: 'Calle invalida',
                        })}
                        onBlur={saveInLocalStorage}
                    />
                </div>
                <div className={styles.input}>
                    <TextField
                        id='number-input'
                        label='Numero'
                        type='text'
                        name='number'
                        autoComplete='off'
                        value={textInputsNum.number}
                        variant='outlined'
                        onChange={(e) => handleTextNumberChange(e)}
                        {...(errors.textNumErrors.number && {
                            error: !!errors.textNumErrors.number,
                            helperText: 'Numero invalido',
                        })}
                        onBlur={saveInLocalStorage}
                    />
                </div>
                <div className={styles.input}>
                    <TextField
                        id='floor-input'
                        label='Piso'
                        type='text'
                        name='floor'
                        autoComplete='off'
                        value={apartmentInput.floor}
                        variant='outlined'
                        onChange={(e) =>
                            setApartmentInput({
                                [e.target.name]: e.target.value,
                            })
                        }
                        onBlur={saveInLocalStorage}
                    />
                </div>
                <div className={styles.input}>
                    <TextField
                        id='apartment-input'
                        label='Depto'
                        type='text'
                        name='apartment'
                        autoComplete='off'
                        value={apartmentInput.apartment}
                        variant='outlined'
                        onChange={(e) =>
                            setApartmentInput({
                                [e.target.name]: e.target.value,
                            })
                        }
                        onBlur={saveInLocalStorage}
                    />
                </div>
                <div className={styles.input}>
                    <FormControl variant='outlined'>
                        <InputLabel htmlFor='marital_status-select'>
                            Provincia
                        </InputLabel>
                        <Select
                            native
                            value={selectInputs.state}
                            onChange={(e) => handleSelectChange(e)}
                            label='Provincia'
                            name='state'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                id: 'state-select',
                                style: { width: '177px' },
                            }}
                            onBlur={saveInLocalStorage}
                        >
                            <option aria-label='None' value='' />
                            {states}
                        </Select>
                    </FormControl>
                </div>
                <div className={styles.input}>
                    <FormControl variant='outlined'>
                        <InputLabel htmlFor='locality-select'>
                            Localidad
                        </InputLabel>
                        <Select
                            native
                            value={selectInputs.locality}
                            onChange={(e) => handleSelectChange(e)}
                            label='Localidad'
                            name='locality'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                id: 'locality-select',
                                style: { width: '177px' },
                            }}
                            onBlur={saveInLocalStorage}
                        >
                            <option aria-label='None' value='' />
                            {localities}
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    );
};
export default DatosTitular;
