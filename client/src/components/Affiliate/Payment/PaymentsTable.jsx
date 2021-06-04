import React, { useEffect, useState } from 'react';
import { makeStyles,lighten } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import supabase from '../../../supabase.config';
import { Button, CircularProgress } from '@material-ui/core';

import PaymentButton from './PaymentButton.jsx';

import styles from './PaymentsTable.module.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: '0px 0px 0px 0px',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 650,
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
        backgroundColor: 'rgb(112, 193, 189)',
    },
    rowColor: {
        backgroundColor: lighten('#e0e0e0', 0.3),
    },
    btn: {
        margin: theme.spacing(1),
        paddingLeft:theme.spacing(2),
        backgroundColor: '#2c7f7b',
        border:'2px solid #2c7f7b',
        size:'small',
        fontWeight:'bold',
        '&:hover':{
            backgroundColor: '#2c7f7b',
            border:'2px solid #fafafa'
        }
    }
}));

export default function PaymentsTable({ paymentStatus }) {
    const classes = useStyles();
    const [debt, setDebt] = useState([]);
    const [titular, setTitular] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getTitularDebts() {
            try {
                const { data: user } = await supabase
                    .from('partners')
                    .select('*')
                    .eq('dni', JSON.parse(localStorage.getItem('userdata')).dni)
                    .eq('family_bond', 'titular');

                const { data: debts } = await supabase
                    .from('payments')
                    .select('*')
                    .eq('partner_dni', user[0].dni)
                    .eq('payed', paymentStatus);

                setDebt(
                    debts.sort(function (a, b) {
                        if (a.concept < b.concept) {
                            return 1;
                        }
                        if (a.concept > b.concept) {
                            return -1;
                        }
                        return 0;
                    })
                );
                setTitular(true);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }
        getTitularDebts();
        //eslint-disable-next-line
    }, []);

    if (loading) return <CircularProgress />;

    if (!titular) {
        if (paymentStatus === 'true')
            return <p>Solo el titular puede visualizar pagos realizados.</p>;
        return <p>Solo el titular puede realizar pagos.</p>;
    }
    return (
        <TableContainer component={Paper}>
            <Table
                className={classes.table}
                size='small'
                aria-label='a dense table'
            >
                <TableHead className={classes.title}>
                    <TableRow>
                        <TableCell>CONCEPTO</TableCell>
                        <TableCell align='left'>FECHA EMISIÓN</TableCell>
                        <TableCell align='left'>
                            FECHA VENCIMIENTO
                        </TableCell>
                        <TableCell align='left'>MONTO</TableCell>
                        <TableCell align='left'>ESTADO</TableCell>
                        <TableCell align='left'>ACCIONES</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {debt.map((row,index) => (
                        <TableRow key={row.concept}>
                            <TableCell 
                            className={
                                index % 2 === 1
                                    ? classes.rowColor
                                    : null
                            }
                            component='th' scope='row'>
                                {row.concept}
                            </TableCell>
                            <TableCell 
                                className={
                                    index % 2 === 1
                                        ? classes.rowColor
                                        : null
                                }
                                align='left'>
                                {row.emission_date}
                            </TableCell>
                            <TableCell 
                                className={
                                    index % 2 === 1
                                        ? classes.rowColor
                                        : null
                                }
                                align='left'>
                                {row.expiration_date}
                            </TableCell>
                            <TableCell 
                                className={
                                    index % 2 === 1
                                        ? classes.rowColor
                                        : null
                                }
                                align='left'>{row.amount}</TableCell>
                            <TableCell 
                                className={
                                    index % 2 === 1
                                        ? classes.rowColor
                                        : null
                                }
                                align='left'>
                                {row.payed ? 'Pagado' : 'Pendiente de pago'}
                            </TableCell>
                            <TableCell 
                                className={
                                    index % 2 === 1
                                        ? classes.rowColor
                                        : null
                                }
                                align='center' id={row.id}>
                                {row.payed ? (
                                    <Button
                                        variant='contained'
                                        className={classes.btn}
                                       
                                    >
                                        Ver detalle
                                    </Button>
                                ) : (
                                    <PaymentButton product={row} />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
