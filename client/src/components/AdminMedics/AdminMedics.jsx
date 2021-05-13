import React, { useState, useEffect } from 'react';
import supabase from '../../supabase.config.js';
import 'firebase/auth';

//styles
import styles from './AdminMedic.module.css';

//icons
import CreateIcon from '@material-ui/icons/Create';

function AdminMedic() {
    const [listMedics, setListMedics] = useState([]);
    const [editActive, setEditActive] = useState(false);

    const fetchMedics = async () => {
        const { data: medics, error: errorFetchMedics } = await supabase
            .from('medics')
            .select(
                'dni, name, age, lastname, medic_license, email, phone_number, age, profilePic, medical_specialities (name)'
            );
        if (errorFetchMedics) return console.log(errorFetchMedics);
        setListMedics(medics);
    };

    const listPlans = async () => {
        const { data: plans, error } = await supabase
            .from('plans')
            .select(
                'name, price, benefits (title), benefits_descriptions (benefit_id, plan_id)'
            );
        if (error) return console.log(error);
        console.log(plans);
    };

    useEffect(() => {
        fetchMedics();
        listPlans();
        console.log('useRender activated');
    }, []);

    const handleSubmit = (e) => {};

    if (listMedics.length === 0) return <h2>Cargando...</h2>;
    console.log(listMedics);

    return (
        <div className={styles.container}>
            <h2>Lista de medicos</h2>
            <ul>
                {listMedics.map((el, index) => (
                    <li
                        key={`medic-${index}`}
                        className={styles.medicContainer}
                    >
                        <CreateIcon className={styles.editMedic} />
                        <p>DNI: {el.dni}</p>
                        <p>Nombre: {el.name}</p>
                        <p>Apellido: {el.lastname}</p>
                        <p>Matricula: {el.medic_license}</p>
                        <p>Edad {el.age}</p>
                        <p className={styles.email}>Email: {el.email}</p>
                        <p>Especialidades:</p>
                        <ul>
                            {el.medical_specialities.map(
                                (speciality, index) => (
                                    <li key={`speciality-${index}`}>
                                        {speciality.name}
                                    </li>
                                )
                            )}
                        </ul>
                    </li>
                ))}
            </ul>
            <form className={styles.formEdit} onSubmit={handleSubmit}>
                <input type='text' value={'Jorge Juan Cruz'} disabled />
                <input type='text' value={'Perez'} disabled />
                <input type='text' value={'MN102030'} disabled />
                <input type='text' value={'40'} disabled />
                <input
                    type='text'
                    value={'jorgitonosoyunalfajor@gmail.Com'}
                    disabled
                />
                <input type='text' value={'Perez'} disabled />
            </form>
        </div>
    );
}

export default AdminMedic;
