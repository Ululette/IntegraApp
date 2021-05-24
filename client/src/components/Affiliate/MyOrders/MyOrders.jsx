import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import supabase from '../../../supabase.config.js';
import styles from './MyOrders.module.css';

import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'DNI', width: 160 },
    { field: 'firstname', headerName: 'Nombre', width: 160 },
    { field: 'lastname', headerName: 'Apellido', width: 160 },
    {
        field: 'studyname',
        headerName: 'Estudio',
        sortable: true,
        width: 160,
    },
    {
        field: 'date',
        headerName: 'Fecha',
        sortable: true,
        width: 160,
    },
    {
        field: 'medicfullname',
        headerName: 'Medico',
        sortable: false,
        width: 160,
    },
    {
        field: 'status',
        headerName: 'Estado',
        sortable: true,
        width: 160,
    },
];

function MyOrders({ affiliateData }) {
    const [family, setFamily] = useState([]);

    const fetchOrders = async () => {
        const { data: orders, error: errorFetchOrders } = await supabase
            .from('orders')
            .select(
                'study_name, date, status, partners(dni, name, lastname, family_group), medics(name, lastname, medical_specialities(name))'
            );
        if (errorFetchOrders) return alert(errorFetchOrders.message);
        setFamily(
            orders.filter(
                (el) => el.partners.family_group === affiliateData.family_group
            )
        );
    };

    useEffect(() => {
        fetchOrders();
        //eslint-disable-next-line
    }, []);

    if (family.length === 0) return <CircularProgress />;

    const rows = family.map((el) => {
        return {
            id: el.partners.dni,
            firstname: el.partners.name,
            lastname: el.partners.lastname,
            studyname: el.study_name,
            date: el.date,
            medicfullname: `${el.medics.name} ${el.medics.lastname}`,
            status: el.status,
        };
    });

    return (
        <div className={styles.container}>
            <h1>Mis autorizaciones</h1>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                className={styles.datagrid}
            />
        </div>
    );
}

export default MyOrders;
