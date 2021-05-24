import React, { useEffect, useState } from 'react';
import supabase from '../../../supabase.config'
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
        paddingLeft:400,
        paddingRight:400,
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
        marginTop: 100,
        marginTop: theme.spacing(5),
    },
}));

async function getData(query) {
    let { selection, user } = query

    try {
        console.log('queryParams', selection, user)
        const { data: data, error: dataError } = await supabase
            .from(selection)
            .select(`*, medical_consultations(partner_dni,partners:partner_dni(name))`)
            .eq('partner_dni', parseInt(user.dni))
        data && console.log(data)
        dataError && console.log(dataError)
        return data ? data : dataError
    }
    catch (err) { return err }
}




export default function AffiliateOrdersAndPrescriptions() {

    const classes = useStyles();
    const [data, setData] = useState([])
    const user = JSON.parse(localStorage.getItem('userdata'))
    const [query, setQuery] = useState({selection: '', user})

    const handleChange = (event) => {
        setQuery({ ...query, selection:event.target.value })
    };

    useEffect(() => {
        if (query.selection.length) getData(query).then(r => setData(r), err => console.log(err))
    }, [query]);

    return (
        <>
            <div style={{ display: 'flex' }}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Ver</InputLabel>
                    <Select
                        className={classes.selectEmpty}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={query.selection}
                        onChange={handleChange}
                    >
                        <MenuItem value='selecionar' aria-label="None" />
                        <MenuItem value='orders'>Ordenes</MenuItem>
                        <MenuItem value='prescriptions'>Recetas</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{ display: 'flex' }}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{query.selection === 'orders' ? 'Orden Nº' : 'Receta Nº'}</TableCell>
                                <TableCell align="right">Consulta</TableCell>
                                <TableCell align="right">Fecha</TableCell>
                                <TableCell align="right">{query.selection === 'orders' ? 'Estudio' : 'Medicamento/s'}</TableCell>
                                <TableCell align="right">Paciente</TableCell>
                                <TableCell align="right">DNI Paciente</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length ?data.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.medical_consultation_id}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    {query.selection === 'orders' ? 
                                    <TableCell align="right">{row.study_name}</TableCell>
                                    :
                                    <TableCell align="right">{ row.drug_name_2 ? `${row.drug_name} ${row.drug_name_2}`: row.drug_name}</TableCell>}
                                    <TableCell align="right">{row.medical_consultations.partners.name}</TableCell>
                                    <TableCell align="right">{row.medical_consultations.partner_dni}</TableCell>
                                </TableRow>
                            ))
                        :
                        <p>y eiaaaa??</p>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );

}

