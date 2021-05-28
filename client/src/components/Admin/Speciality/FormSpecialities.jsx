import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TextField, Button, CircularProgress } from '@material-ui/core';

import TableSpecialities from './TableSpecialities.jsx';
import {
    getMedicSpecialities,
    addSpeciality,
} from '../../../actions/specialities.actions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(0.5),
        backgroundColor: '#2c7f7b',
        size:'small',
        '&:hover':{
            backgroundColor: '#34ccc4',
        }
    }
}));

const FormSpecialities = () => {
    //---STATES
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    const [rows, setRows] = useState([]);
    const medic_specialities = useSelector(
        (state) => state.specialities.medic_specialities
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMedicSpecialities());
        setRows(medic_specialities);
        //eslint-disable-next-line
    }, [medic_specialities]);

    const handlerChangeInput = (event) => {
        setInputValue(event.target.value);
    };
    const handlerButtonClick = () => {
        //verificar que sean solo letras
        if (!/^[A-Za-z\s]+$/g.test(inputValue)){
            Swal.fire({
                title: `La especialidad no puede ser un numero.`,
                icon: 'error',
            });
        } else {
        //verificar si existe
        let buscado = medic_specialities.find(
            (item) => item.name === inputValue
        );
        if (!buscado) {
            dispatch(addSpeciality(inputValue));
            dispatch(getMedicSpecialities());
            setInputValue('');
            Swal.fire({
                title: `La especialidad ${inputValue} se agrego con exito.`,
                icon: 'success',
                timer: 2000,
            })
        } else
            Swal.fire({
                title: `La especialidad ${inputValue.toUpperCase()} ya existe.`,
                icon: 'info',
            });
        }
        
    };

    return (
        <div>
            <TextField
                size='small'
                id='outlined-basic'
                label='Nueva Especialidad'
                variant='outlined'
                onChange={handlerChangeInput}
                value={inputValue}
            />
            <Button
                className={classes.fab}
                variant='contained'
                color='primary'
                onClick={handlerButtonClick}
                disabled={!inputValue}
            >
                Agregar
            </Button >
            {rows.length === 0 ? (
                <CircularProgress/>
            ) : (
                <TableSpecialities rows={rows} />
            )}
        </div>
    );
};

export default FormSpecialities;
