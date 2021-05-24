import React, { useEffect, useState } from 'react';
import supabase from '../../../supabase.config';
import { makeStyles } from '@material-ui/core/styles';
import {
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
        paddingLeft: 400,
        paddingRight: 400,
        marginLeft: 500,
        marginTop: 200,
        width: 200,
    },
    formControl: {
        marginTop: 100,
        position: 'absolute',
        display: 'flex',
        left: '400px',
        margin: theme.spacing(5),
        marginLeft: theme.spacing(5),
        minWidth: 120,
    },
    selectEmpty: {
        position: 'relative',
        display: 'flex',
        top: 1,
        marginTop: theme.spacing(5),
    },
}));

export default function AffiliateOrdersAndPrescriptions() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const user = JSON.parse(localStorage.getItem('affiliatedata'));
    const [query, setQuery] = useState({ user });

    async function getData() {
        try {
            const { data: prescriptions, error: dataError } = await supabase
                .from('prescriptions')
                .select(`*, partners(dni, name, lastname, family_group)`);

            console.log(prescriptions);
            console.log(dataError, 'error');
            setData(
                prescriptions.filter(
                    (el) => el.partners.family_group === user.family_group
                )
            );
        } catch (err) {
            return err;
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div style={{ display: 'flex' }}>
                <p>Recetas</p>
            </div>
            <div style={{ display: 'flex' }}>
                <TableContainer component={Paper}>
                    <Table
                        className={classes.table}
                        size='small'
                        aria-label='a dense table'
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Receta Nro</TableCell>
                                <TableCell align='center'>Fecha</TableCell>
                                <TableCell align='center'>
                                    Medicamentos
                                </TableCell>
                                <TableCell align='center'>Familiar</TableCell>
                                <TableCell align='center'>DNI</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length ? (
                                data.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component='th' scope='row'>
                                            {row.id}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.date}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.drug_name_2
                                                ? `${row.drug_name} ${row.drug_name_2}`
                                                : row.drug_name}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {`${row.partners.name} ${row.partners.lastname}`}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {row.partners.dni}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <p>No hay nada para mostrar.</p>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
