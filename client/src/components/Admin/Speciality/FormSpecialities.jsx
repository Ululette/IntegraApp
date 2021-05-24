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

const FormSpecialities = () => {
    //---STATES
    const [inputValue, setInputValue] = useState('');
    const [rows, setRows] = useState([]);
    const medic_specialities = useSelector(
        (state) => state.specialities.medic_specialities
    );
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        dispatch(getMedicSpecialities());
        setRows(medic_specialities);
        //eslint-disable-next-line
    }, [medic_specialities]);

    const handlerChangeInput = (event) => {
        setInputValue(event.target.value);
    };
    const handlerButtonClick = () => {
        //verificar si existe
        let buscado = medic_specialities.find(
            (item) => item.name === inputValue
        );
        if (!buscado) {
            dispatch(addSpeciality(inputValue));
            dispatch(getMedicSpecialities());
            setInputValue('');
            MySwal({
                title: `La especialidad ${inputValue} se agrego con exito.`,
                icon: 'success',
                timer: 2000,
            }).then(() => window.location.reload());
        } else
            MySwal.fire({
                title: `La especialidad ${inputValue} ya existe.`,
                icon: 'info',
            });
    };

    return (
        <div>
            <TextField
                size='small'
                id='outlined-basic'
                label='speciality'
                variant='outlined'
                onChange={handlerChangeInput}
                value={inputValue}
            />
            <Button
                variant='contained'
                color='primary'
                onClick={handlerButtonClick}
                disabled={!inputValue}
            >
                +
            </Button>
            {rows.length === 0 ? (
                <CircularProgress/>
            ) : (
                <TableSpecialities rows={rows} />
            )}
        </div>
    );
};

export default FormSpecialities;
