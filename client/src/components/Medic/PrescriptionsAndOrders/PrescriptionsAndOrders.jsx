import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAffiliates } from '../../../actions/getter.action'
import supabase from '../../../supabase.config';
import { lighten, makeStyles } from '@material-ui/core/styles';
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
import './PrescriptionsAndOrder.module.css'
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    title2: {
        width: '100%',
        background: lighten('#34a7a1', 0.6),
        flex: '1 1 100%',
        fontWeight: 'bold',
        fontSize: '1.4rem',
        color: '#fafafa',
        textAlign: 'center'
    },
    title: {
        color: '#212121',
        fontWeight: 'bold',
        backgroundColor: lighten('#34a7a1', 0.6)
    },
    rowColor: {
        backgroundColor: lighten('#e0e0e0', 0.3),
    },
    table: {
        minWidth: 'min-content',
        top: theme.spacing(3),
    },
    formControl: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    selectEmpty: {
        width: '177px',
        position: 'relative',
        display: 'flex',
    },
    paper: {
        width: '100%',
        position: 'relative',
    },
    root: {
        top: theme.spacing(3),
        width: '100%'
    }
}));

async function getData(query) {
    let { selection, param } = query;
    let column = selection === 'orders' ? 'study_name' : 'drug_name';
    try {
        console.log('queryParams', selection, param);
        const { data, error: dataError } = await supabase
            .from(selection)
            .select(`*, medical_consultations(partner: partner_dni(name, lastname))`)
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
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState(data)
    const [query, setQuery] = useState({ param: '', selection: 'prescriptions' });
    const [name, setName] = useState('')
    const partners = useSelector(state => state.affiliates.allAffiliates)
    const allAffiliates = partners.filter(e => data.find(d => d.medical_consultations.partner.lastname == e.lastname))

    const handleChange = (event) => {
        setQuery({ ...query, [event.target.name]: event.target.value });
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    useEffect(() => {
        dispatch(getAffiliates())
        getData(query).then(
            (r) => setData(r),
            (err) => console.log(err)
        );
    }, [query]);

    useEffect(() => {
        setFilteredData(data)
    }, [data]);


    useEffect(() => {
        let newData = data;
        if(name.length) newData = newData.filter(e => e.medical_consultations.partner.lastname == name);
        if(!newData.length) newData = data;
        setFilteredData(newData)
    }, [name])

    return (
        <div className={classes.root}>
            <div className={classes.formControl}>
                <FormControl className={classes.selectEmpty}>
                    <Select
                        variant='outlined'
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
                </FormControl>
                <FormControl className={classes.selectEmpty}>
                    <Select
                        variant='outlined'
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={name}
                        onChange={handleChangeName}
                        name='name'
                    >
                        <MenuItem value='Paciente...' aria-label='None' />
                        {allAffiliates.map(e => (
                            <MenuItem value={e.lastname}>{e.lastname}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        onChange={handleChange}
                        name='param'
                        id='outlined-basic'
                        label={query.selection === 'orders' ? 'Estudio...' : 'Medicamento...'}
                        variant='outlined'
                        className={classes.selectEmpty}
                        disabled={!query.selection}
                    />
                </FormControl>
            </div>
            <div style={{ display: 'flex' }} >
                <TableContainer component={Paper} className={classes.paper}>
                    <h3 className={classes.title2}>Recetas y ordenes</h3>
                    <Table className={classes.table} aria-label='simple table'>
                        <TableHead className={classes.title}>
                            <TableRow>
                                <TableCell>
                                    {query.selection === 'orders'
                                        ? 'Orden Nº'
                                        : 'Receta Nº'}
                                </TableCell>
                                <TableCell align='left'>Consulta</TableCell>
                                <TableCell align='left'>Fecha</TableCell>
                                <TableCell align='left'>
                                    {query.selection === 'orders'
                                        ? 'Estudio'
                                        : 'Medicamento'}
                                </TableCell>
                                {query.selection === 'orders' ? <TableCell align='left'>Estado</TableCell> : null}
                                <TableCell align='left'>Paciente</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.length > 0 ? filteredData.map((row, index) => (
                                <TableRow key={row.name} className={index % 2 === 1 ? classes.rowColor : null}>
                                    <TableCell component='th' scope='row'>
                                        {row.id}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {row.medical_consultation_id}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {row.date}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {query.selection === 'orders'
                                            ? row.study_name
                                            : row.drug_name}
                                    </TableCell>
                                    {query.selection === 'orders' ? <TableCell align='left'>
                                        {row.status}
                                    </TableCell> : null}
                                    <TableCell align='left'>
                                        {row.medical_consultations.partner.name + ' ' + row.medical_consultations.partner.lastname}
                                    </TableCell>
                                </TableRow>
                            )) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
