import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import supabase from '../../../supabase.config.js';
import './UserProfile.css';
import {
    Button,
    FormControl,
    Input,
    TextField,
    FormHelperText,
    InputLabel,
    Select,
    FilledInput,
    OutlinedInput,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const useStyles = makeStyles({
    root: {
        //className={classes.root}
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    modButton: {
        height: 40,
        backgroundColor: '#41aea9',
        color: '#000000',
        fontWeight: 600,
        alignSelf: 'flex-end',
        marginRight: 30,
    },
    modInput: {
        marginBottom: 15,
        width: '100%',
    },
});

export default function UserProfile() {
    const classes = useStyles();
    const MySwal = withReactContent(Swal);
    let [user, setUser] = useState([]);

    let fetchUserData = async (document) => {
        let { data: userInfo, error: errorFetchUser } = await supabase
            .from('partners')
            .select(
                'dni, name, lastname, birthdate, phone_number, email, gender, plans (id, name), address (street, street_number, floor, department, localities (name, postal_code, states (name)))'
            )
            .eq('dni', document);
        if (errorFetchUser) return console.log(errorFetchUser);
        setUser(userInfo[0]);
    };

    useEffect(() => {
        let userDni = JSON.parse(localStorage.getItem('userdata')).dni;
        console.log(userDni);
        fetchUserData(userDni);
    }, []);
    // Estado de modificación del perfil del usuario
    let [modify, setModify] = useState(false);

    function handleclick(e) {
        // Cuando hace click en modificar ...
        if (!modify) {
            setModify(true);

            // Cuando hace click en guardar (modificación)...
        } else {
            // Guardar datos en supabase
            MySwal.fire({
                title: 'Se actualizaron los datos!',
                icon: 'success',
            });
            setModify(false);
            // limpia inputs de datos a modificar
            setmodInfo({
                address: '',
                phone: '',
                email: '',
                state: '',
                city: '',
                postal_code: '',
            });
        }
    }

    function getAge(date) {
        var today = new Date();
        var birthdate = new Date(date);
        var age = today.getFullYear() - birthdate.getFullYear();
        var m = today.getMonth() - birthdate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }

        return age;
    }

    // Estados a mostrar en el selector de provincias
    let [allstates, setAllstates] = useState([]);

    async function getStates() {
        try {
            let { data: states } = await supabase
                .from('states')
                .select('id,name');
            console.log(states);
            setAllstates(states);
            //[ {id: 14, name: "Cordoba"},{id: 18, name: "Corrientes"}, {} ,{}]
        } catch (err) {
            console.error(err);
        }
        return;
    }

    useEffect(() => {
        getStates();
    }, []);

    useEffect(() => {
        // if (allstates.length) {
        //   console.log(allstates);
        // }
    }, [allstates]);

    // Estados con posibilidad de modificación:
    let [modInfo, setmodInfo] = useState({
        street: '',
        street_number: '',
        floor: '',
        department: '',
        phone: '',
        email: '',
        postal_code: '',
    });
    useEffect(() => {
        if (user.length !== 0) {
            console.log(user);
            // setea los datos que puede modificar
            setmodInfo({
                ...modInfo,
                street: user.address[0].street,
                street_number: user.address[0].street_number,
                floor: user.address[0].floor,
                department: user.address[0].department,
                phone: user.phone_number,
                email: user.email,
                state: user.address[0].localities.states.name,
                city: user.address[0].localities.name,
                postal_code: user.address[0].localities.postal_code,
            });
        }
    }, []);

    useEffect(() => {
        if (modInfo.street) {
            console.log(modInfo);
        }
    }, [modInfo]);

    // let [textInputs, setTextInputs] = useState({})
    let [errors, setErrors] = useState({
        textErrors: {
            first_name: '',
            last_name: '',
            dni: '',
            cuil: '',
            phone_number: '',
            occupation: '',
            street_name: '',
            number: '',
            apartment: '',
        },
    });

    // let handleSelect = (e) => {
    //   setTextInputs({ ...textInputs, [e.target.name]: e.target.value })
    //   setErrors({ ...errors, })
    // }

    let fetchbyPC = async (codigoPostal) => {
        let { data: PCInfo, error: errorFetchPC } = await supabase
            .from('localities')
            .select('id,name,states(name)')
            .eq('postal_code', codigoPostal);
        console.log(PCInfo);

        if (errorFetchPC) return console.log(errorFetchPC);
    };

    let handlechange = (e) => {
        console.log(e.target.name, e.target.value);
        setmodInfo({ ...modInfo, [e.target.name]: e.target.value });
        // setErrors({ ...errors, })
        if (e.target.name === 'postal_code') {
        }
    };
    console.log(user);

    if (user.length === 0) return <h1>Cargando...</h1>;

    return (
        <div className='ProfilePage_Cont'>
            {/* <div> */}

            {/* </div> */}
            {user && (
                <div className='info_cont'>
                    {!modify ? (
                        // <p>modify en false</p>
                        <div className='input_info'>
                            <h1 className='title'>Mi Perfil</h1>
                            <div className='on_line_cont'>
                                <div className='one_info_cont'>
                                    <p className='profile_title'>Plan:</p>
                                    <p className='profile_info'>
                                        {user.plans.name}
                                    </p>
                                </div>
                            </div>
                            <div className='on_line_cont'>
                                <div className='one_info_cont'>
                                    <p className='profile_title'>Nombre:</p>
                                    <p className='profile_info'>{user.name}</p>
                                </div>
                                <div className='one_info_cont'>
                                    <p className='profile_title'>Apellido:</p>
                                    <p className='profile_info'>
                                        {user.lastname}
                                    </p>
                                </div>
                                <div className='one_info_cont'>
                                    <p className='profile_title'>Edad:</p>
                                    <p className='profile_info'>
                                        {getAge(user.birthdate)}
                                    </p>
                                </div>
                            </div>
                            <div className='on_line_cont'>
                                <div className='one_info_cont'>
                                    <p className='profile_title'>
                                        F. Nacimiento:
                                    </p>
                                    <p className='profile_info'>
                                        {user.birthdate}
                                    </p>
                                </div>
                            </div>
                            <div className='on_line_cont'>
                                <div className='one_info_cont'>
                                    <p className='profile_title'>email:</p>
                                    <p className='profile_info'>{user.email}</p>
                                </div>
                                <div className='one_info_cont'>
                                    <p className='profile_title'>Teléfono:</p>
                                    <p className='profile_info'>
                                        {user.phone_number}
                                    </p>
                                </div>
                            </div>
                            <div className='on_line_cont'>
                                <div className='one_info_cont'>
                                    <p className='profile_title'>Calle:</p>
                                    <p className='profile_info'>
                                        {' '}
                                        {user.address[0].street}
                                    </p>
                                </div>
                                <div className='one_info_cont'>
                                    <p className='profile_title'>Número:</p>
                                    <p className='profile_info'>
                                        {' '}
                                        {user.address[0].street_number}
                                    </p>
                                </div>
                                <div className='one_info_cont'>
                                    <p className='profile_title'>Piso:</p>
                                    <p className='profile_info'>
                                        {' '}
                                        {user.address[0].floor}
                                    </p>
                                </div>
                                <div className='one_info_cont'>
                                    <p className='profile_title'>Dto:</p>
                                    <p className='profile_info'>
                                        {user.address[0].department}
                                    </p>
                                </div>
                            </div>
                            <div className='on_line_cont'>
                                <div className='one_info_cont'>
                                    <p className='profile_title'>Ciudad:</p>
                                    <p className='profile_info'>
                                        {user.address[0].localities.name}
                                    </p>
                                </div>
                                <div className='one_info_cont'>
                                    <p className='profile_title'>
                                        Código Postal:
                                    </p>
                                    <p className='profile_info'>
                                        {user.address[0].localities.postal_code}
                                    </p>
                                </div>
                            </div>
                            <div className='on_line_cont'>
                                <div className='one_info_cont'>
                                    <p className='profile_title'>Provincia:</p>
                                    <p className='profile_info'>
                                        {user.address[0].localities.states.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='modif_info'>
                            <form
                                className='mod_form_cont'
                                noValidate
                                autoComplete='off'
                            >
                                <div className='form_left_col'>
                                    <TextField
                                        name='street'
                                        id='cityInput'
                                        className={classes.modInput}
                                        label='Calle'
                                        defaultValue={modInfo.street}
                                        variant='outlined'
                                        onChange={handlechange}
                                    />
                                    <TextField
                                        name='street_number'
                                        className={classes.modInput}
                                        label='Número'
                                        defaultValue={modInfo.street_number}
                                        variant='outlined'
                                        onChange={handlechange}
                                    />
                                    <TextField
                                        name='floor'
                                        className={classes.modInput}
                                        defaultValue={modInfo.floor}
                                        label='Piso'
                                        variant='outlined'
                                        onChange={handlechange}
                                    />
                                    <TextField
                                        name='department'
                                        className={classes.modInput}
                                        defaultValue={modInfo.department}
                                        label='Departamento'
                                        variant='outlined'
                                        onChange={handlechange}
                                    />
                                    <TextField
                                        name='email'
                                        className={classes.modInput}
                                        defaultValue={modInfo.email}
                                        label='email'
                                        variant='outlined'
                                        onChange={handlechange}
                                    />
                                </div>

                                <div className='form_right_col'>
                                    <TextField
                                        name='phone'
                                        className={classes.modInput}
                                        defaultValue={modInfo.phone}
                                        label='Teléfono'
                                        variant='outlined'
                                        onChange={handlechange}
                                    />

                                    {/* Verifique por código postal la provincia */}
                                    <TextField
                                        name='state'
                                        className={classes.modInput}
                                        defaultValue={modInfo.state}
                                        label='Provincia'
                                        disabled
                                        variant='outlined'
                                    />
                                    {/* <FormControl variant="outlined" className={classes.modInput}>
                  <InputLabel htmlFor="marital_status-select">Provincia</InputLabel>
                  <Select
                    value={selectInputs.state}
                    onChange={(e) => handleSelect(e)}
                    label="Provincia"
                    name='state'
                  >
                    <option defaultValue></option>
                    {allstates.length && allstates.map((state, index) => (
                      <option
                        key={index}
                        value={state.id}
                      //hacer que cambie la forma del cursor on hover
                      >{state.name}</option>
                    ))}
                  </Select>
                </FormControl> */}

                                    {/* Verifique por código postal la ciudad */}

                                    <TextField
                                        name='city'
                                        className={classes.modInput}
                                        value={modInfo.city}
                                        disabled
                                        label='Ciudad'
                                        variant='outlined'
                                    />
                                    <TextField
                                        name='postal_code'
                                        className={classes.modInput}
                                        defaultValue={modInfo.postal_code}
                                        label='Código Postal'
                                        variant='outlined'
                                        onChange={handlechange}
                                    />
                                </div>
                                {/* <TextField id="outlined-basic" label="Nombre" variant="outlined" />
              <TextField id="outlined-basic" label="Apellido" variant="outlined" /> */}
                                {/* <TextField id="outlined-basic" label="F. Nacimiento" variant="outlined" /> */}
                            </form>
                        </div>
                    )}
                    <Button
                        variant='contained'
                        className={classes.modButton}
                        onClick={handleclick}
                    >
                        {!modify ? 'Modificar' : 'Guardar'}
                    </Button>
                </div>
            )}
            {/* <div className="info_cont">
        <form noValidate autoComplete="off">
          <legend htmlFor="my-input">Nombre</legend>
          {user && <TextField id="outlined-basic" label={user.name} variant="outlined" />}
        </form>
      </div>
      <div >

        <form noValidate autoComplete="off">
          <legend htmlFor="my-input">Nombre</legend>
          {user && <TextField id="outlined-basic" label={user.name} variant="outlined" />}
        </form>

      </div>
      <FormControl>
        <p>Nombre:</p>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>

      </FormControl>

      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>

      </FormControl>

      <form noValidate autoComplete="off">
        <legend htmlFor="my-input">Email address</legend>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </form>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Standard" />
        <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </form>
      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
      </FormControl> */}
        </div>
    );
}
