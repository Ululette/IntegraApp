import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStates, getLocalities} from '../../actions/getter.action';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import styles from './DatosTitular.module.css'
import validator from './Validator'

const DatosTitular = () =>{
	const allStates = useSelector((state) => state.plans.allStates);
	const allLocalities = useSelector((state) => state.plans.allLocalities);
    const dispatch = useDispatch();
	//---CODIGO SEBA
	const [textInputs,setTextInputs] = useState({
		first_name: '',
		last_name:'',
		occupation:''
	});
	const [textInputsNum,setInputsTextNum]= useState({
		dni: '',
		cuil:'',
        phone_number: '',
		number:''
	})
	const [textInputsMix,setInputsTextMix] = useState({
		apartment:'',
		street_name:''
	})
	const [dateInputs,setDateInputs] = useState({
		birth_date: ''
	});
	const [selectInputs,setSelectInputs] = useState({
		marital_status:'',
		gender:'',
		state:'',
		locality:''
		
	});
	const [emailInputs, setEmailInputs] = useState({email: ''})
	const [errors,setErrors]=useState({
		textErrors:{
			first_name: '',
			last_name:'',
			occupation:'',
			street_name:'',
			apartment:''
		},
		textNumErrors:{
			dni: '',
			cuil:'',
			phone_number: '',
			number:''
		},
		textMixErrors:{
			apartment:'',
			street_name:''
		},
		dateErrors:{birth_date: ''},
		selectErrors:{
			marital_status:'',
			gender:'',
			locality:'',//falta
			state:''
		},
		emailErrors:{email:''}
	})

	useEffect(() => {
        let datosTitular = JSON.parse(localStorage.getItem('datosTitular')) 
        if(datosTitular){
            setTextInputs({
                first_name: datosTitular.first_name,
				last_name:datosTitular.last_name,
				occupation:datosTitular.occupation
            })
            setInputsTextNum({
                dni: datosTitular.dni,
				cuil:datosTitular.cuil,
				phone_number: datosTitular.phone_number,
				number:datosTitular.number
            })
            setInputsTextMix({
                apartment:datosTitular.apartmen,
				street_name:datosTitular.street_name
            })
            setEmailInputs({
				email:datosTitular.email
            })
			setDateInputs({
				birth_date:datosTitular.birth_date
			})
			setSelectInputs({
				marital_status:datosTitular.marital_status,
				gender:datosTitular.gender,
				locality:datosTitular.locality,//falta
				state:datosTitular.state
			})
        }
    }, []);

	function saveInLocalStorage(){
        localStorage
        .setItem('datosTitular', 
                JSON.stringify({
                    ...textInputs,
                    ...textInputsNum,
                    ...textInputsMix,
                    ...dateInputs,
					...emailInputs,
					...selectInputs
        }))
    }

	const handleTextChange = (e) => {
		setTextInputs(
			{...textInputs,
			[e.target.name]: e.target.value
			})
		
		setErrors({...errors,textErrors:validator({...textInputs,[e.target.name]: e.target.value},"text")})
	};
	  const handleTextNumberChange = (e) => {
		setInputsTextNum(
			{...textInputsNum,
			[e.target.name]: e.target.value
			})
		
		setErrors({...errors,textNumErrors:validator({...textInputsNum,[e.target.name]: e.target.value},"number")})
	};
	  const handleTextMixChange = (e) => {
		setInputsTextMix(
			{...textInputsMix,
			[e.target.name]: e.target.value
			})
		
		setErrors({...errors,textMixErrors:validator({...textInputsMix,[e.target.name]: e.target.value},"mix")})
	};

	const handleDateChange = (e) => {
		setDateInputs(
			{...dateInputs,
			[e.target.name]: e.target.value
			})
		
		setErrors({...errors,dateErrors:validator({...dateInputs,[e.target.name]: e.target.value},"date")})
	};

	const handleSelectChange = (e) => {
		setSelectInputs(
			{...selectInputs,
			[e.target.name]: e.target.value
			})
		
		setErrors({...errors,selectErrors:validator({...selectInputs,[e.target.name]: e.target.value},"select")})
	};

	const handleEmailChange = (e) => {
		setEmailInputs({
			...emailInputs,
			[e.target.name]: e.target.value,
		});
		setErrors({...errors,emailErrors:validator({...emailInputs,[e.target.name]: e.target.value},"email")})
	};

	useEffect(()=>{
		dispatch(getStates());
		dispatch(getLocalities());
	},[])
	
	useEffect(()=>{
		//console.log('useEffect '+input.state)
		dispatch(getLocalities(selectInputs.state));
	},[selectInputs.state])

	
	const states = allStates.map((s)=>{
		return(
			<option value={s.id}>{s.name}</option>
			)
		})
		
	const localities = 
	allLocalities
	.filter(l=>l.state_id == selectInputs.state)
	.map((l)=>{
		return(
			<option value={l.id}>{l.name}</option>
			)
		})

	return (
		<div className={styles.form}>
			<div className={styles.personalData}>
				<div className={styles.firstColumn}>
					<label htmlFor="">Datos del titular</label>
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
						<FormControl variant="outlined" error={!selectInputs.gender&&true}>
							<InputLabel htmlFor="gender-select">Sexo</InputLabel>
							<Select
								native
								value={selectInputs.gender}
								onChange={(e) => handleSelectChange(e)}
								label="Genero"
								inputProps={{
									name: "gender",
									id: "gender-select",
									style:{width:'177px'}
								}}
								onBlur={saveInLocalStorage}
							>
								<option aria-label="None" value="" />
								<option value={"male"}>Masculino</option>
								<option value={"female"}>Femenino</option>
								<option value={"other"}>Otro</option>
						
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
							value={setEmailInputs.email}
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
						<FormControl variant="outlined" error={!selectInputs.marital_status}>
							<InputLabel htmlFor="marital_status-select">Estado civil</InputLabel>
							<Select
								native
								value={selectInputs.marital_status}
								onChange={(e) => handleSelectChange(e)}
								label="Estado civil"
								
								inputProps={{
									name: 'marital_status',
									id: 'marital_status-select',
									style:{width:'177px'}
								}}
								onBlur={saveInLocalStorage}
							>
								<option aria-label="None" value="" />
								<option value={"married"}>Casado/a</option>
								<option value={"single"}>Soltero/a</option>
							</Select>
						</FormControl>
					</div>
					<div className={styles.input}>
						<TextField
							id="birth"
							label="Birthday"
							name='birth_date'
							type="date"
							variant='outlined'
							// style={{width:'177px'}}
							InputLabelProps={{
								shrink: true,
							}}
							onChange={handleDateChange}
							value={dateInputs.birth_date}
							error={!!errors.dateErrors.birth_date}
							helperText = {errors.dateErrors.birth_date&&errors.dateErrors.birth_date}
							onBlur={saveInLocalStorage}
						/>
					</div>
				</div>
			</div>
			<div className={styles.addressData}>
				<label htmlFor="">Dirección</label>
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
							error: !!errors.textMixErrors.street_name ,
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
						id='apartment-input'
						label='Piso/Depto'
						type='text'
						name='apartment'
						autoComplete='off'
						value={textInputsMix.apartment}
						variant='outlined'
						onChange={(e) => handleTextMixChange(e)}
						{...(errors.textMixErrors.apartment && {
							error: !!errors.textMixErrors.apartment,
							helperText: 'Piso/Depto invalido',
						})}
						onBlur={saveInLocalStorage}
					/>
				</div>
				<div className={styles.input}>
					<FormControl variant="outlined" >
						<InputLabel htmlFor="marital_status-select">Provincia</InputLabel>
						<Select
							native
							value={selectInputs.state}
							onChange={(e) => handleSelectChange(e)}
							label="Provincia"
							name='state'
							inputProps={{
								id: 'state-select',
								style:{width:'177px'}
							}}
							onBlur={saveInLocalStorage}
						>
							<option aria-label="None" value="" />
							{states}
						</Select>
					</FormControl>
				</div>
				<div className={styles.input}>
					<FormControl variant="outlined" >
						<InputLabel htmlFor="locality-select">Localidad</InputLabel>
						<Select
							native
							value={selectInputs.locality}
							onChange={(e) => handleSelectChange(e)}
							label="Localidad"
							name= 'locality'
							inputProps={{
								id: 'locality-select',
								style:{width:'177px'}
							}}
							onBlur={saveInLocalStorage}
						>
							<option aria-label="None" value="" />
							{localities}
						</Select>
					</FormControl>
				</div>
			</div>
		</div>
	)
}
export default DatosTitular