import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStates, getLocalities} from '../../actions/getter.action';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import styles from './DatosTitular.module.css'

const DatosTitular = () =>{
	const allStates = useSelector((state) => state.allStates);
	const allLocalities = useSelector((state) => state.allLocalities);
    const dispatch = useDispatch();

	const [input, setInput] = useState({
        first_name: '',
		last_name:'',
        birth_date: '',
		gender:'',
        dni: '',
		cuil:'',
        phone_number: '',
		occupation:'',
		marital_status:'',
        mail: '',

		street_name:'',
		number:'',
		apartment:'',
		locality:'',//falta
		state:null
    });
    const [errors, setErrors] = useState({
        first_name: false,
		last_name:false,
        dni: false,
		cuil:false,
        phone_number: false,
		occupation:false,
        mail: false,
		street_name:false,
		number:false,
		apartment:false
    });

	useEffect(()=>{
		dispatch(getStates());
		dispatch(getLocalities());
	},[])
	
	// useEffect(()=>{
	// 	console.log('useEffect '+input.state)
	// 	dispatch(getLocalities(input.state));
	// },[input.state])

	
	const states = allStates.map((s)=>{
		return(
			<option value={s.id}>{s.name}</option>
			)
		})
		
	const localities = 
	allLocalities
	.filter(l=>l.state_id == input.state)
	.map((l)=>{
		return(
			<option value={l.id}>{l.name}</option>
			)
		})

	const handleInputChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validate(e.target.name, e.target.value)
		);
	};
			
    function validate(inputName,value) {
        const mailPattern =
            /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
        const namePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
		const streetPattern = /^[A-Za-z0-9\s]+$/g;
        const numberPattern = /^[0-9\b]+$/;
        let errors = {};

        switch(inputName){
            case 'first_name':{
                if (!namePattern.test(value) && value.length>0) {
                    errors.first_name = true;
                } else {
                    errors.first_name = false;
                }
                break;
            }
            case 'last_name':{
                if (!namePattern.test(value) && value.length>0) {
                    errors.last_name = true;
                } else {
                    errors.last_name = false;
                }
                break;
            }
            case 'dni':{
                if (!numberPattern.test(value) || value.length === 8) {
                    errors.dni = true;
                } else {
                    errors.dni = false;
                }  
                break;     
            }
            case 'cuil':{
                if (!numberPattern.test(value) || (value.length === 11)) {
                    errors.cuil = true;
                } else {
                    errors.cuil = false;
                }  
                break;     
            }
            case 'phone_number':{
                if (
                    !numberPattern.test(value) || (value.length < 10 && value.length>7)
                ) {
                    errors.phone_number = true;
                } else {
                    errors.phone_number = false;
                } 
                break;     
            }
			case 'occupation':{
                if (!namePattern.test(value) && value.length>0) {
                    errors.occupation = true;
                } else {
                    errors.occupation = false;
                }
                break;
            }
            case 'mail':{
                if (!mailPattern.test(value) && value.length>0) {
                    errors.mail = true;
                } else {
                    errors.mail = false;
                }
                break;     
            }
			case 'street_name':{
                if (!streetPattern.test(value) && value.length>0) {
                    errors.street_name = true;
                } else {
                    errors.street_name = false;
                }
                break;
            }
			case 'number':{
				if (!numberPattern.test(value) && (value.length>0 && value.length<8)) {
					errors.number = true;
                } else {
					errors.number = false;
                }
                break;
            }
			case 'apartment':{
				if (!streetPattern.test(value) && value.length>0) {
					errors.apartment = true;
				} else {
					errors.apartment = false;
				}
				break;
			}
      default:  }
        return errors;
    }

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
							value={input.first_name}
							variant='outlined'
							onChange={(e) => handleInputChange(e)}
							{...(errors.first_name && {
								error: errors.first_name,
								helperText: 'Nombre invalido',
							})}
						/>
					</div>
					<div className={styles.input}>
						<TextField
							id='last_name-input'
							label='Apellido'
							type='text'
							name='last_name'
							autoComplete='off'
							value={input.last_name}
							variant='outlined'
							onChange={(e) => handleInputChange(e)}
							{...(errors.last_name && {
								error: errors.last_name,
								helperText: 'Nombre invalido',
							})}
						/>
					</div>
					<div className={styles.input}>
						<FormControl variant="outlined" >
							<InputLabel htmlFor="gender-select">Sexo</InputLabel>
							<Select
								native
								value={input.gender}
								onChange={(e) => handleInputChange(e)}
								label="Sexo"
								inputProps={{
									name: "gender",
									id: "gender-select",
									style:{width:'177px'}
								}}
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
							type='tel'
							name='dni'
							autoComplete='off'
							value={input.dni}
							variant='outlined'
							onChange={(e) => handleInputChange(e)}
							{...(errors.dni && {
								error: true,
								helperText: 'Dni invalido',
							})}
							inputProps={{ maxLength: 8 }}
						/>
					</div>
					<div className={styles.input}>
						<TextField
							id='cuil-input'
							label='Cuil'
							type='tel'
							name='cuil'
							autoComplete='off'
							value={input.cuil}
							variant='outlined'
							onChange={(e) => handleInputChange(e)}
							{...(errors.cuil && {
								error: true,
								helperText: 'Edad invalido',
							})}
						/>
					</div>
					<div className={styles.input}>
						<TextField
							id='phone-input'
							label='Teléfono'
							type='tel'
							name='phone_number'
							autoComplete='off'
							value={input.phone_number}
							variant='outlined'
							onChange={(e) => handleInputChange(e)}
							{...(errors.phone_number && {
								error: true,
								helperText: 'Teléfono invalido',
							})}
							inputProps={{ maxLength: 12 }}
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
							name='mail'
							autoComplete='off'
							value={input.mail}
							variant='outlined'
							onChange={(e) => handleInputChange(e)}
							{...(errors.mail && {
								error: true,
								helperText: 'Mail invalido',
							})}
						/>
					</div>
					<div className={styles.input}>
						<TextField
							id='occupation-input'
							label='Ocupacion'
							type='text'
							name='ocupation'
							autoComplete='off'
							value={input.occupation}
							variant='outlined'
							onChange={(e) => handleInputChange(e)}
							{...(errors.occupation && {
								error: true,
								helperText: 'Ocupación invalida',
							})}
						/>
					</div>
					<div className={styles.input}>
						<FormControl variant="outlined" >
							<InputLabel htmlFor="marital_status-select">Estado civil</InputLabel>
							<Select
								native
								value={input.marital_status}
								onChange={(e) => handleInputChange(e)}
								label="Estado civil"
								
								inputProps={{
									name: 'marital_status',
									id: 'marital_status-select',
									style:{width:'177px'}
								}}
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
						value={input.street_name}
						variant='outlined'
						onChange={(e) => handleInputChange(e)}
						{...(errors.street_name && {
							error: true,
							helperText: 'Calle invalida',
						})}
					/>
				</div>
				<div className={styles.input}>
					<TextField
						id='apartment-input'
						label='Piso/Depto'
						type='text'
						name='apartment'
						autoComplete='off'
						value={input.apartment}
						variant='outlined'
						onChange={(e) => handleInputChange(e)}
						{...(errors.apartment && {
							error: true,
							helperText: 'Piso/Depto invalido',
						})}
					/>
				</div>
				<div className={styles.input}>
					<TextField
						id='number-input'
						label='Numero'
						type='text'
						name='number'
						autoComplete='off'
						value={input.number}
						variant='outlined'
						onChange={(e) => handleInputChange(e)}
						{...(errors.number && {
							error: true,
							helperText: 'Numero invalido',
						})}
					/>
				</div>
				<div className={styles.input}>
					<FormControl variant="outlined" >
						<InputLabel htmlFor="marital_status-select">Provincia</InputLabel>
						<Select
							native
							value={input.state}
							onChange={(e) => handleInputChange(e)}
							label="Provincia"
							name='state'
							inputProps={{
								id: 'state-select',
								style:{width:'177px'}
							}}
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
							value={input.locality}
							onChange={(e) => handleInputChange(e)}
							label="Localidad"
							name= 'locality'
							inputProps={{
								id: 'locality-select',
								style:{width:'177px'}
							}}
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