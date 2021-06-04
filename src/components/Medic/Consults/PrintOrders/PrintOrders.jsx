import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    List,
    ListItem,
} from '@material-ui/core';
import styles from './PrintOrders.module.css';

export default function PrintOrders({ info }) {
    let { date, patient, diagnosis, doctor } = info;
    let orders = JSON.parse(localStorage.getItem('orders'));

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                className={styles.addmed}
                size='small'
                variant='outlined'
                color='primary'
                onClick={handleClickOpen}
            >
                Imprimir
            </Button>
            <Dialog
                className={styles.container}
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
            >
                <DialogContent className={styles.cont_presc}>
                    {patient && (
                        <DialogContentText>
                            <p>
                                Paciente: {patient.name.toUpperCase()}{' '}
                                {patient.lastname.toUpperCase()}{' '}
                            </p>
                            <p>Obra Social: Integra </p>
                            <p>
                                Plan: {patient.plan}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nº de
                                afiliado: {patient.affiliate_number}
                            </p>
                            <hr className={styles.line}></hr>
                            <h1 className={styles.t_center}>
                                Pedido de estudios{' '}
                            </h1>
                        </DialogContentText>
                    )}
                    <List>
                        {orders &&
                            orders.map((ord, index) => (
                                <ListItem button key={index} name={ord}>
                                    {ord}
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
                {/*  */}
                <DialogActions className={styles.actions}>
                    <Button
                        name='cancelar'
                        onClick={handleClose}
                        size='small'
                        variant='contained'
                        color='primary'
                    >
                        Cancelar
                    </Button>
                    <Button 
                        name='guardar' 
                        onClick={handleSave} 
                        size='small'
                        variant='outlined'
                        color='primary'
                    >
                        Imprimir
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
