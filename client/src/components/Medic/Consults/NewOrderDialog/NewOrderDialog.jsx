import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    List,
    ListItem,
} from '@material-ui/core';
import styles from '../NewPrescriptionDialog/NewPrescriptionDialog.module.css';

export default function NewOrderDialog({ info }) {
    let { date, patient, diagnosis, doctor } = info;
    let orders = JSON.parse(localStorage.getItem('orders'));

    //eslint-disable-next-line
    let [newOrder, setNewOrder] = useState('');
    //eslint-disable-next-line
    let [order, setOrder] = useState([]);
    //eslint-disable-next-line
    let [ok, setOk] = useState(false);

    const [open, setOpen] = React.useState(false);

    const handleSave = () => {
        console.log('acá:', orders);
        localStorage.setItem('orders', JSON.stringify(orders));
        setNewOrder('');
        setOrder([]);
        setOk(false);
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant='outlined'
                size='large'
                color='primary'
                onClick={handleClickOpen}
            >
                Imprimir orden
            </Button>
            <Dialog
                className={styles.container}
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
            >
                {/* <DialogTitle id="form-dialog-title">Nueva receta</DialogTitle>  */}
                <DialogContent
                    className={styles.cont_presc}
                    // className={styles.cont_presc}
                >
                    <DialogContentText>
                        <p>
                            Paciente: {patient.name.toUpperCase()}{' '}
                            {patient.lastname.toUpperCase()}{' '}
                        </p>
                        <p>Obra Social: Integra </p>
                        <p>
                            Plan: {patient.plan}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nº de afiliado:{' '}
                            {patient.affiliate_number}
                        </p>
                        <hr className={styles.line}></hr>
                        <h1 className={styles.t_center}>
                            Ordenes de practica:{' '}
                        </h1>
                    </DialogContentText>

                    <List>
                        {orders &&
                            orders.map((med, index) => (
                                <ListItem button key={index} name={med}>
                                    {med}
                                </ListItem>
                            ))}
                    </List>
                    <DialogContentText className={styles.last}>
                        <div className={styles.p_left}>
                            <p className={styles.date}>Fecha: {date} </p>
                            <p>Diagnóstico: {diagnosis} </p>
                            <p className={styles.signature}>Firma: </p>
                            <div className={styles.docdetail}>
                                <p>
                                    Prof: {doctor.name} {doctor.lastname}{' '}
                                </p>
                                <p>{doctor.medic_license}</p>
                                <p>
                                    {doctor.medical_specialities
                                        .map((e) => e.name)
                                        .join('/ ')}
                                </p>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={styles.actions}>
                    <Button
                        name='cancelar'
                        onClick={handleClose}
                        color='primary'
                    >
                        Cancelar
                    </Button>
                    <Button name='guardar' onClick={handleSave} color='primary'>
                        Imprimir
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
