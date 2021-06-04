/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAffiliates } from '../../../actions/getter.action';
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

const useStyles = makeStyles((theme) => ({
    title2: {
        width: '100%',
        background: lighten('#34a7a1', 0.6),
        fontWeight: 'bold',
        fontSize: '1.4rem',
        color: '#fafafa',
        textAlign: 'center',
        backgroundColor: 'rgb(112, 193, 189)',
        padding: '10px',
    },
    title: {
        color: '#212121',
        fontWeight: 'bold',
        backgroundColor: lighten('#34a7a1', 0.6),
    },
    rowColor: {
        backgroundColor: lighten('#e0e0e0', 0.3),
    },
    table: {
        minWidth: 'min-content',
        top: theme.spacing(0),
    },
    formControl: {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: 'rgb(112, 193, 189)',
        padding: '0px 0px 0px 0px',
    },
    selectEmpty: {
        width: '200px',
        height: '40px',
        position: 'relative',
        display: 'flex',
        backgroundColor: 'white',
        margin: '10px 0px 0px 0px',
        borderRadius: '5px',
        textAlign: 'left',
        padding: "'0px 0px 0px 0px'",
    },
    paper: {
        width: '100%',
        position: 'relative',
    },
    root: {
        backgroundColor: 'rgb(112, 193, 189)',
        width: '100%',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: '5px',
    },
    content: {
        padding: "'10px 10px 10px 10px'",
    },
    selectTitle: {
        color: 'white',
        fontWeight: 'bold',
    },
}));

async function getData(query) {
    let { selection, param } = query;
    let column = selection === 'orders' ? 'study_name' : 'drug_name';
    try {
        const { data, error: dataError } = await supabase
            .from(selection)
            .select(
                `*, medical_consultations(medic_dni, partner: partner_dni(name, lastname))`
            )
            .ilike(`${column}`, `%${param}%`);
        return data ? data : dataError;
    } catch (err) {
        console.error(err);
    }
}

export default function PrescriptionsAndOrders() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState(data);
    const [query, setQuery] = useState({
        param: '',
        selection: 'prescriptions',
    });
    const [name, setName] = useState('');
    const partners = useSelector((state) => state.affiliates.allAffiliates);
    const allAffiliates = partners.filter((e) =>
        data.find((d) => d.medical_consultations.partner.lastname == e.lastname)
    );
    const medicData = JSON.parse(localStorage.getItem('medicdata'));

    const handleChange = (event) => {
        setQuery({ ...query, [event.target.name]: event.target.value });
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    useEffect(() => {
        dispatch(getAffiliates());
        getData(query).then(
            (r) => setData(r.filter(e => e.medical_consultations.medic_dni === medicData.dni )),
            (err) => console.log(err)
        );
    }, [query]);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    useEffect(() => {
        let newData = data;
        if (name.length)
            newData = newData.filter(
                (e) => e.medical_consultations.partner.lastname == name
            );
        if (!newData.length) newData = data;
        setFilteredData(newData);
    }, [name, data]);

    return (
        <div className={classes.root}>
            <div className={classes.formControl}>
                <FormControl className={classes.formControl}>
                    <div className={classes.selectTitle}>
                        <p className={classes.content}>Selección</p>
                        <Select
                            className={classes.selectEmpty}
                            variant='outlined'
                            /* labelId='demo-simple-select-label'
                            id='demo-simple-select-label' */
                            value={query.selection}
                            onChange={handleChange}
                            name='selection'
                            size='small'
                            type='text'
                        >
                            <MenuItem value='orders'>Ordenes</MenuItem>
                            <MenuItem value='prescriptions'>Recetas</MenuItem>
                        </Select>
                    </div>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <div className={classes.selectTitle}>
                        <p className={classes.content}>Paciente</p>
                        <Select
                            className={classes.selectEmpty}
                            variant='outlined'
                            /*  labelId='demo-simple-select-label-1'
                        id='demo-simple-select-label-1' */
                            value={name}
                            onChange={handleChangeName}
                            name='name'
                            size='small'
                            type='text'
                            name='selection'
                        >
                            <MenuItem value='Paciente...' aria-label='None' />
                            {allAffiliates.map((e) => (
                                <MenuItem value={e.lastname}>
                                    {e.lastname}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField
                        className={classes.input}
                        onChange={handleChange}
                        name='param'
                        id='outlined-basic'
                        label={
                            query.selection === 'orders'
                                ? 'Estudio...'
                                : 'Medicamento...'
                        }
                        variant='outlined'
                        size='small'
                    />
                </FormControl>
            </div>
            <div style={{ display: 'flex' }}>
                <TableContainer component={Paper} className={classes.paper}>
                    <h3 className={classes.title2}>
                        {query.selection === 'orders' ? 'ORDENES' : 'RECETAS'}
                    </h3>
                    <Table className={classes.table} aria-label='simple table'>
                        <TableHead className={classes.title}>
                            <TableRow>
                                <TableCell size='small'>
                                    {query.selection === 'orders'
                                        ? 'ORDEN Nº'
                                        : 'RECETA Nº'}
                                </TableCell>
                                <TableCell align='left' size='small'>
                                    CONSULTA
                                </TableCell>
                                <TableCell align='left' size='small'>
                                    FECHA
                                </TableCell>
                                <TableCell align='left' size='small'>
                                    {query.selection === 'orders'
                                        ? 'ESTUDIO'
                                        : 'MEDICAMENTO'}
                                </TableCell>
                                {query.selection === 'orders' ? (
                                    <TableCell align='left' size='small'>
                                        ESTADO
                                    </TableCell>
                                ) : null}
                                <TableCell align='left' size='small'>
                                    PACIENTE
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.length > 0
                                ? filteredData.map((row, index) => (
                                      <TableRow
                                          size='small'
                                          key={row.name}
                                          className={
                                              index % 2 === 1
                                                  ? classes.rowColor
                                                  : null
                                          }
                                      >
                                          <TableCell
                                              component='th'
                                              scope='row'
                                              size='small'
                                          >
                                              {row.id}
                                          </TableCell>
                                          <TableCell align='left' size='small'>
                                              {row.medical_consultation_id}
                                          </TableCell>
                                          <TableCell align='left' size='small'>
                                              {row.date}
                                          </TableCell>
                                          <TableCell align='left' size='small'>
                                              {query.selection === 'orders'
                                                  ? row.study_name
                                                  : row.drug_name}
                                          </TableCell>
                                          {query.selection === 'orders' ? (
                                              <TableCell
                                                  align='left'
                                                  size='small'
                                              >
                                                  {row.status}
                                              </TableCell>
                                          ) : null}
                                          <TableCell align='left' size='small'>
                                              {row.medical_consultations.partner
                                                  .name +
                                                  ' ' +
                                                  row.medical_consultations
                                                      .partner.lastname}
                                          </TableCell>
                                      </TableRow>
                                  ))
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
