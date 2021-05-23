import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import supabase from '../../../supabase.config';
import { Button, CircularProgress } from '@material-ui/core';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useFirestoreDocDataOnce } from 'reactfire';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function FamilyMembersList() {
    const classes = useStyles();
    const MySwal = withReactContent(Swal);
    const [familyGroup, setFamilyGroup] = useState([]);
    const [titular, setTitular] = useState(false);
    const [loading, setLoading] = useState(true);
    const titularDni = JSON.parse(localStorage.getItem('userdata')).dni;

    useEffect(() => {
        async function getAffiliate() {
            try {
                const { data: user } = await supabase
                    .from('partners')
                    .select('*')
                    .eq('dni', JSON.parse(localStorage.getItem('userdata')).dni)
                    .eq('family_bond', 'titular');

                const { data: family } = await supabase
                    .from('partners')
                    .select('*')
                    .eq('family_group', user[0].family_group)
                    .neq('dni', user[0].dni);

                setFamilyGroup(family);
                setTitular(true);
                console.log(family);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }
        getAffiliate();
    }, []);

    const handleDownFamiliar = async (familiar) => {
        const { value: formValues } = await MySwal.fire({
            title: `Dar de baja a ${familiar.name} ${familiar.lastname}`,
            text: `DNI: ${familiar.dni}`,
            input: 'textarea',
            inputPlaceholder: 'Motivo de la baja...',
            inputAttributes: {
                'aria-label': 'Motivo de la baja...',
            },
            showCancelButton: true,
            showConfirmButton: true,
            reverseButtons: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
        });
        if (formValues) {
            MySwal.fire({
                title: 'Esta seguro/a de solicitar la baja?',
                text: `Familiar a dar de baja:\nDNI: ${familiar.dni}\nNombre: ${familiar.name}\nApellido: ${familiar.lastname}\nMotivo: ${formValues}`,
                reverseButtons: true,
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: 'Estoy seguro',
                cancelButtonText: 'Cancelar',
            }).then(async (res) => {
                const { error: errorSendingRequest } = await supabase
                    .from('familiar_downs_request')
                    .insert([
                        {
                            titular_dni: titularDni,
                            familiar_dni: familiar.dni,
                            familiar_name: familiar.name,
                            familiar_lastname: familiar.lastname,
                            familiar_birthdate: familiar.birthdate,
                            reason: formValues,
                        },
                    ]);
                if (errorSendingRequest) {
                    return MySwal.fire({
                        title: 'Error al enviar la solicitud',
                        icon: 'error',
                        text: `${
                            errorSendingRequest.message ===
                            'duplicate key value violates unique constraint "familiar_downs_request_familiar_dni_key"'
                                ? 'Ya se envio la solicitud para este socio'
                                : errorSendingRequest.message
                        }`,
                        showConfirmButton: true,
                        confirmButtonText: 'Salir',
                    });
                }
                if (res.isConfirmed) {
                    MySwal.fire({
                        title: 'Se solicito la baja con exito, un administrador se comunicara con usted en los proximos dias.',
                        icon: 'success',
                        showConfirmButton: true,
                        confirmButtonText: 'Perfecto!',
                    });
                } else {
                    MySwal.fire({
                        title: 'Solicitud cancelada',
                        icon: 'warning',
                        showConfirmButton: true,
                        confirmButtonText: 'Salir',
                    });
                }
            });
        }
    };

    if (loading) return <CircularProgress />;

    if (!titular)
        return <p>Solo el titular puede verificar esta información</p>;

    return (
        <TableContainer component={Paper}>
            <Table
                className={classes.table}
                size='small'
                aria-label='a dense table'
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>Last Name</TableCell>
                        <TableCell align='right'>Birthdate</TableCell>
                        <TableCell align='right'>Family Bond</TableCell>
                        <TableCell align='right'>Gender</TableCell>
                        <TableCell align='right'>DNI</TableCell>
                        <TableCell align='right'>E-Mail</TableCell>
                        <TableCell align='right'>Phone Number</TableCell>
                        <TableCell align='right'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {familyGroup.map((row, idx) => (
                        <TableRow key={`${row.name}-${idx}`}>
                            <TableCell component='th' scope='row'>
                                {row.name}
                            </TableCell>
                            <TableCell align='right'>{row.lastname}</TableCell>
                            <TableCell align='right'>{row.birthdate}</TableCell>
                            <TableCell align='right'>
                                {row.family_bond}
                            </TableCell>
                            <TableCell align='right'>{row.gender}</TableCell>
                            <TableCell align='right'>{row.dni}</TableCell>
                            <TableCell align='right'>{row.email}</TableCell>
                            <TableCell align='right'>
                                {row.phone_number}
                            </TableCell>
                            <TableCell align='right'>
                                <Button
                                    variant='outlined'
                                    size='small'
                                    onClick={() => handleDownFamiliar(row)}
                                >
                                    Dar de baja
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
