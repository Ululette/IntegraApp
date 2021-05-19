import React, { useState } from 'react';
import { statesMedic } from '../../../functions/states.js';
import styles from './AdminMedicEdit.module.css';
import supabase from '../../../supabase.config.js';
import CloseIcon from '@material-ui/icons/Close';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function AdminMedicEdit({ medicData, medicSpecialities, setEditActive }) {
    const MySwal = withReactContent(Swal);
    let [input, setInput] = useState({
        name: medicData.name,
        lastname: medicData.lastname,
        email: medicData.email,
        phoneNumber: medicData.phone_number,
        specialitiesA: medicData.medical_specialities[0].id,
        // specialitiesB: medicData.medical_specialities[1]
        //     ? medicData.medical_specialities[1].id
        //     : null,
        specialitiesAname: medicData.medical_specialities[0].name,
        // specialitiesBname: medicData.medical_specialities[1]
        //     ? medicData.medical_specialities[1].name
        //     : null,
        state: medicData.state,
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        MySwal.fire({
            title: 'Esta seguro de actualizar estos campos?',
            icon: 'question',
            showCloseButton: true,
            showCancelButton: true,
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    await supabase
                        .from('medics_medical_specialities')
                        .update({
                            medic_dni: medicData.dni,
                            speciality_id: input.specialitiesA,
                        })
                        .eq('medic_dni', medicData.dni);
                    // if (input.specialitiesB) {
                    //     if (medicData.medical_specialities[1]) {
                    //         await supabase
                    //             .from('medics_medical_specialities')
                    //             .update({
                    //                 medic_dni: medicData.dni,
                    //                 speciality_id: input.specialitiesB,
                    //             })
                    //             .eq('medic_dni', medicData.dni);
                    //     } else {
                    //         await supabase
                    //             .from('medics_medical_specialities')
                    //             .insert([
                    //                 {
                    //                     medic_dni: medicData.dni,
                    //                     speciality_id: input.specialitiesB,
                    //                 },
                    //             ]);
                    //     }
                    // }
                } catch (error) {
                    console.log(error);
                }

                try {
                    await supabase
                        .from('medics')
                        .update([
                            {
                                name: input.name,
                                lastname: input.lastname,
                                email: input.email,
                                phone_number: input.phoneNumber,
                                state: input.state,
                            },
                        ])
                        .eq('dni', medicData.dni);
                } catch (error) {
                    console.log(error);
                }
                MySwal.fire({
                    title: 'Se edito al medico con exito!',
                    icon: 'success',
                    timer: 2000,
                }).then(() => window.location.reload());
            }
        });
    };

    const handleClose = () => {
        setEditActive(false);
    };

    if (!medicData) return <h2>Cargando...</h2>;

    console.log(input.specialitiesA);
    console.log(input.specialitiesB);

    return (
        <form className={styles.formEdit} onSubmit={handleSubmit}>
            <label htmlFor='dni'>DNI</label>
            <input type='text' id='dni' value={medicData.dni} disabled />
            <label htmlFor='name'>Nombre</label>
            <input
                type='text'
                name='name'
                id='name'
                value={input.name}
                onChange={handleChange}
            />
            <label htmlFor='lastname'>Apellido</label>
            <input
                type='text'
                name='lastname'
                id='lastname'
                value={input.lastname}
                onChange={handleChange}
            />
            <label htmlFor='email'>Email</label>
            <input
                type='text'
                name='email'
                id='email'
                value={input.email}
                onChange={handleChange}
            />
            <label htmlFor='phoneNumber'>Nro de telefono</label>
            <input
                type='text'
                name='phoneNumber'
                id='phoneNumber'
                value={input.phoneNumber}
                onChange={handleChange}
            />
            <label htmlFor='specialitiesA'>Especialidad 1</label>
            <select
                name='specialitiesA'
                id='specialitiesA'
                onChange={handleChange}
            >
                {medicSpecialities.map((spec, index) => (
                    <option
                        selected={spec.name === input.specialitiesAname}
                        key={`spec-${index}`}
                        value={`${spec.id}`}
                    >
                        {spec.name}
                    </option>
                ))}
            </select>
            {/* <label htmlFor='specialitiesB'>Especialidad 2</label> */}
            {/* <select
                name='specialitiesB'
                id='specialitiesB'
                onChange={handleChange}
            >
                <option value={null}>No hay especialidad 2</option>
                {medicSpecialities.map((spec, index) => (
                    <option
                        selected={spec.name === input.specialitiesBname}
                        key={`spec-${index + 100}`}
                        value={`${spec.id}`}
                    >
                        {spec.name}
                    </option>
                ))}
            </select> */}
            <label htmlFor='state'>Estado</label>
            <select
                name='state'
                id='state'
                onChange={handleChange}
                value={input.state}
            >
                {statesMedic.map((state, index) => (
                    <option
                        selected={state === input.state}
                        key={`state-${index}`}
                    >
                        {state}
                    </option>
                ))}
            </select>
            <input type='submit' value='Actualizar' />
            <CloseIcon onClick={handleClose} />
        </form>
    );
}

export default AdminMedicEdit;
