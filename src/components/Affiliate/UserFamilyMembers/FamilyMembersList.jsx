import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import supabase from '../../../supabase.config';
import { Button, CircularProgress } from '@material-ui/core';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'NOMBRE' },
    {
        id: 'lastname',
        numeric: false,
        disablePadding: false,
        label: 'APELLIDO',
    },
    {
        id: 'birthdate',
        numeric: false,
        disablePadding: false,
        label: 'FECHA DE NACIMIENTO',
    },
    {
        id: 'family-bond',
        numeric: false,
        disablePadding: false,
        label: 'PARENTESCO',
    },
    {
        id: 'gender',
        numeric: false,
        disablePadding: false,
        label: 'SEXO',
    },
    {
        id: 'dni',
        numeric: true,
        disablePadding: false,
        label: 'DNI',
    },
    {
        id: 'email',
        numeric: true,
        disablePadding: false,
        label: 'E-MAIL',
    },
    {
        id: 'phone-number',
        numeric: true,
        disablePadding: false,
        label: 'PHONE NUMBER',
    },
    {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'ACTIONS',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        position: 'relative',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    title: {
        color: '#212121',
        fontWeight: 'bold',
        backgroundColor: lighten('#34a7a1', 0.6),
    },
    titleDos: {
        flex: '1 1 100%',
        fontWeight: 'bold',
        fontSize: '1.4rem',
        color: '#D9DCDF',
        textAlign: 'center',
    },
    rowColor: {
        backgroundColor: lighten('#e0e0e0', 0.3),
        ':checked': {
            color: blue[500],
        },
    },
    iconFilter: {
        color: 'rgba(0, 0, 0, 0.47)',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: lighten('#34a7a1', 0.8),
        },
    },
}));

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;

    return (
        <TableHead className={classes.title}>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={`${headCell.id}-${index}`}
                        align='left'
                        padding='default'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <span className={classes.visuallyHidden}>
                                {order === 'desc'
                                    ? 'sorted descending'
                                    : 'sorted ascending'}
                            </span>
                        ) : null}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        // paddingLeft: theme.spacing(0),
        // paddingRight: theme.spacing(0),
        backgroundColor: lighten('#34a7a1', 0.3),
        padding: '0px 0px 0px 0px',
        //color barra superior '
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                  color: '#fafafa',
                  backgroundColor: lighten(blue[500], 0.5), //color barra superior cuando selecciono item
                  fontWeight: 'bold',
                  fontSize: '30px',
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: lighten('#34a7a1', 0.3),
              },
    title: {
        flex: '1 1 100%',
        fontWeight: 'bold',
        fontSize: '1.4rem',
        color: '#fafafa',
        textAlign: 'center',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, setToShowRows, rows } = props;
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <Typography
                className={classes.title}
                variant='h6'
                id='tableTitle'
                component='div'
            >
                GRUPO FAMILIAR
            </Typography>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

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
                    .eq('state', 'aceptado')
                    .neq('dni', user[0].dni);

                setFamilyGroup(family);
                setTitular(true);
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
        <>
            <EnhancedTableToolbar />
            <TableContainer component={Paper}>
                <Table
                    className={classes.table}
                    size='small'
                    aria-label='a dense table'
                >
                    <EnhancedTableHead classes={classes} />
                    <TableBody>
                        {familyGroup.map((row, idx) => (
                            <TableRow key={`${row.name}-${idx}`}>
                                <TableCell component='th' scope='row'>
                                    {row.name}
                                </TableCell>
                                <TableCell align='left'>
                                    {row.lastname}
                                </TableCell>
                                <TableCell align='left'>
                                    {row.birthdate}
                                </TableCell>
                                <TableCell align='left'>
                                    {row.family_bond}
                                </TableCell>
                                <TableCell align='left'>{row.gender}</TableCell>
                                <TableCell align='left'>{row.dni}</TableCell>
                                <TableCell align='left'>{row.email}</TableCell>
                                <TableCell align='left'>
                                    {row.phone_number}
                                </TableCell>
                                <TableCell align='left'>
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
        </>
    );
}
