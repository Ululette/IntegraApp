import React, { useState } from 'react';
import states from '../../functions/states.js';
import styles from './AdminMedicEdit.module.css';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import supabase from '../../supabase.config.js';

function AdminMedicEdit({ medicData, medicSpecialities }) {
    let [input, setInput] = useState({
        name: medicData.name,
        lastname: medicData.lastname,
        email: medicData.email,
        phoneNumber: medicData.phone_number,
        specialities: [],
        state: medicData.state,
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });
    };

    const handleCheck = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        if (checked) {
            input.specialities.push(value);
        } else {
            input.specialities = input.specialities.filter(
                (el) => el !== value
            );
        }
        console.log(input.specialities);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm('Esta seguro de actualizar estos campos?')) {
            if (input.specialities.length > 0) {
                try {
                    for (let id_speciality of input.specialities) {
                        await supabase
                            .from('medics_medical_specialities')
                            .insert([
                                {
                                    medic_dni: medicData.dni,
                                    speciality_id: id_speciality,
                                },
                            ]);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
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
        alert('agregadas');
        window.location.reload();
    };

    if (!medicData) return <h2>Cargando...</h2>;

    return (
        <form className={styles.formEdit} onSubmit={handleSubmit}>
            <input type='text' value={medicData.dni} disabled />
            <input
                type='text'
                name='name'
                value={input.name}
                onChange={handleChange}
            />
            <input
                type='text'
                name='lastname'
                value={input.lastname}
                onChange={handleChange}
            />
            <input
                type='text'
                name='email'
                value={input.email}
                onChange={handleChange}
            />
            <input
                type='text'
                name='phoneNumber'
                value={input.phoneNumber}
                onChange={handleChange}
            />
            {medicSpecialities.map((spec, index) => {
                return (
                    <FormControlLabel
                        className={styles.switchSpec}
                        control={
                            <Switch
                                value={spec.id}
                                name={String(index)}
                                onChange={handleCheck}
                                disabled={
                                    medicData.medical_specialities.find(
                                        (el) => el.name === spec.name
                                    )
                                        ? true
                                        : false
                                }
                            />
                        }
                        label={spec.name}
                        key={`speciality-${index}`}
                    />
                );
            })}
            <select name='state' onChange={handleChange} value={input.state}>
                {states.map((state, index) => (
                    <option key={`state-${index}`}>{state}</option>
                ))}
            </select>
            <input type='submit' value='Actualizar' />
        </form>
    );
}

export default AdminMedicEdit;
