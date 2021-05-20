import React, { useState, useEffect } from 'react';
import supabase from '../../../supabase.config.js';
import styles from './MedicPatients.module.css';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function MedicPatients() {
    const [listPatients, setListPatients] = useState([]);
    const medicData = JSON.parse(localStorage.getItem('medicdata'));
    const dniPatients = medicData.my_patients.map((el) => el.partner_dni);
    const MySwal = withReactContent(Swal);

    const fetchPatients = async () => {
        let hasError = false;
        const patients = [];
        for (let dni of dniPatients) {
            const { data: patientsData, error: errorFetchPatients } =
                await supabase.from('partners').select('*').eq('dni', dni);
            if (errorFetchPatients) {
                hasError = true;
                break;
            }
            patients.push(patientsData);
        }
        if (hasError) {
            return MySwal.fire({
                title: 'Error con el fetch de pacientes.',
                icon: 'error',
            });
        }
        setListPatients(patients);
    };
    useEffect(() => {
        fetchPatients();
        // eslint-disable-next-line
    }, []);
    if (!listPatients) return <h1>Cargando...</h1>;
    console.log(listPatients);

    return (
        <div className={styles.container}>
            <h1>Mis pacientes</h1>
        </div>
    );
}

export default MedicPatients;
