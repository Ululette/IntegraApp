import React, { useState, useEffect } from 'react';
import supabase from '../../supabase.config.js';
import 'firebase/auth';

//styles
import styles from './AdminAffiliate.module.css';

//icons
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
// functions
import calculateAge from '../../functions/calculateAge.js';

function AdminAffiliate() {
    const [listAffiliates, setListAffiliates] = useState([]);
    const [editActive, setEditActive] = useState(false);
    const [affData, setAffData] = useState(null);

    const fetchAffiliate = async () => {
        const { data: affiliates, error: errorFetchAffiliate } = await supabase
            .from('partners')
            .select('*, medical_specialities (id, name)');
        if (errorFetchAffiliate) return console.log(errorFetchAffiliate);
        setListAffiliates(affiliates);
    };

    useEffect(() => {
        fetchAffiliate();
    }, []);

    const handleEdit = (affiliateData) => {
        setAffData(affiliateData);
        setEditActive(true);
        if (editActive) setEditActive(false);
    };

    const handleDelete = async (affiliateData) => {
        const confirm = window.confirm(
            `Desea eliminar al medico ${affiliateData.name} ${affiliateData.lastname} de la obra social? (Esta accion no se puede deshacer)`
        );
        if (confirm) {
            try {
                await supabase
                    .from('medics')
                    .delete()
                    .eq('dni', affiliateData.dni);
            } catch (error) {
                console.log(error);
            }
        }
    };

    if (listAffiliates.length === 0) return <h2>Cargando...</h2>;
    console.log(listAffiliates);

    return (
        <div className={styles.container}>
            <h2>Lista de medicos</h2>
            <ul>
                {listAffiliates.map((el, index) => (
                    <li
                        key={`affiliate-${index}`}
                        className={styles.affContainer}
                    >
                        <button
                            disabled={editActive}
                            className={styles.editAff}
                            onClick={() => handleEdit(el)}
                        >
                            <CreateIcon />
                        </button>
                        <button
                            disabled={editActive}
                            className={styles.editAff}
                            onClick={() => handleDelete(el)}
                        >
                            <DeleteIcon />
                        </button>
                        {el.profilePic ? (
                            <img
                                className={styles.profilePic}
                                src={el.profilePic}
                                alt='Medic profile pic'
                            />
                        ) : null}
                        <p>DNI: {el.dni}</p>
                        <p>Nombre: {el.name}</p>
                        <p>Apellido: {el.lastname}</p>
                        <p>Matricula: {el.medic_license}</p>
                        <p>Edad: {calculateAge(el.birthdate)}</p>
                        <p className={styles.email}>Email: {el.email}</p>
                        <p>Estado: {el.state}</p>
                        <p>Especialidades:</p>
                    </li>
                ))}
            </ul>
            {/* {editActive ? (
                <AdminMedicEdit
                    medicData={medicData}
                    medicSpecialities={medicSpecialities}
                    setEditActive={setEditActive}
                />
            ) : null}
            <AdminMedicAdd medicSpecialities={medicSpecialities} /> */}
        </div>
    );
}

export default AdminAffiliate;
