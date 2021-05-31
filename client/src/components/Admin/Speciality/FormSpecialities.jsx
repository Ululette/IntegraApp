import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import TableSpecialities from './TableSpecialities.jsx';
import {
    getMedicSpecialities,
    addSpeciality,
} from '../../../actions/specialities.actions';
import Swal from 'sweetalert2';



const FormSpecialities = () => {
    //---STATES
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

    const handlerButtonClick = (inputValue) => {
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
            {rows.length === 0 ? (
                <CircularProgress/>
            ) : (

                <TableSpecialities rows={rows} handlerButtonClick={handlerButtonClick}/>
            )}
        </div>
    );
};

export default FormSpecialities;
