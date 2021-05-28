import React, { useEffect, useState } from 'react';
import supabase from '../../../supabase.config';
import { makeStyles } from '@material-ui/core/styles';
import {
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
    TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
        marginLeft: 500,
        marginTop: 400,
        width: 500,
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
        top: '100px',
        marginTop: theme.spacing(5),
    },
}));

async function getData(query) {
    let { selection, param } = query;
    let column = selection === 'orders' ? 'study_name' : 'drug_name';
    try {
        console.log('queryParams', selection, param);
        const { data, error: dataError } = await supabase
            .from(selection)
            .select(`*, medical_consultations(partner: partner_dni(name))`)
            .ilike(`${column}`, `%${param}%`);
        data && console.log(data);
        dataError && console.log(dataError);
        return data ? data : dataError;
    } catch (err) {
        console.error(err);
    }
}

export default function PrescriptionsAndOrders() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [query, setQuery] = useState({ param: '', selection: '' });

    const handleChange = (event) => {
        setQuery({ ...query, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        if (query.param && query.selection)
            getData(query).then(
                (r) => setData(r),
                (err) => console.log(err)
            );
    }, [query]);

    return (
        <>
            <div style={{ display: 'flex' }}>
                <FormControl className={classes.formControl}>
                    <InputLabel id='demo-simple-select-label'>Ver</InputLabel>
                    <Select
                        className={classes.selectEmpty}
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={query.selection}
                        onChange={handleChange}
                        name='selection'
                    >
                        <MenuItem value='selecionar' aria-label='None' />
                        <MenuItem value='orders'>Ordenes</MenuItem>
                        <MenuItem value='prescriptions'>Recetas</MenuItem>
                    </Select>
                    <TextField
                        onChange={handleChange}
                        name='param'
                        id='outlined-basic'
                        label='Nombre'
                        variant='outlined'
                        className={classes.formControl}
                    />
                </FormControl>
            </div>
            <div style={{ display: 'flex' }}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    {query.selection === 'orders'
                                        ? 'Orden Nº'
                                        : 'Receta Nº'}
                                </TableCell>
                                <TableCell align='right'>Consulta</TableCell>
                                <TableCell align='right'>Fecha</TableCell>
                                <TableCell align='right'>
                                    {query.selection === 'orders'
                                        ? 'Estudio'
                                        : 'Medicamento'}
                                </TableCell>
                                <TableCell align='right'>Estado</TableCell>
                                <TableCell align='right'>Paciente</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length > 0 ? data.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component='th' scope='row'>
                                        {row.id}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {row.medical_consultation_id}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {row.date}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {query.selection === 'orders'
                                            ? row.study_name
                                            : row.drug_name}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {row.status}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {row.medical_consultations.partner.name}
                                    </TableCell>
                                </TableRow>
                            )): null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
