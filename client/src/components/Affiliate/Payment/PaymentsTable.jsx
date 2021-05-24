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

import PaymentButton from './PaymentButton.jsx';

import styles from './PaymentsTable.module.css';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

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

                setDebt(debts);
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
                <TableHead>
                    <TableRow>
                        <TableCell>Concepto</TableCell>
                        <TableCell align='right'>Fecha de Emisión</TableCell>
                        <TableCell align='right'>
                            Fecha de Vencimiento
                        </TableCell>
                        <TableCell align='right'>Monto</TableCell>
                        <TableCell align='right'>Estado</TableCell>
                        <TableCell align='right'>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {debt.map((row) => (
                        <TableRow key={row.concept}>
                            <TableCell component='th' scope='row'>
                                {row.concept}
                            </TableCell>
                            <TableCell align='right'>
                                {row.emission_date}
                            </TableCell>
                            <TableCell align='right'>
                                {row.expiration_date}
                            </TableCell>
                            <TableCell align='right'>{row.amount}</TableCell>
                            <TableCell align='right'>
                                {row.payed ? 'Pagado' : 'Pendiente de pago'}
                            </TableCell>
                            <TableCell align='right' id={row.id}>
                                {row.payed ? (
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        className={styles.prueba}
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
