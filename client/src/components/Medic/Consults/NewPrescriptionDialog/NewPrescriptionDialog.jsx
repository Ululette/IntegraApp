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
import styles from './NewPrescriptionDialog.module.css';

export default function NewPrescriptionDialog({ info }) {
    let { date, patient, diagnosis, doctor } = info;
    let medicines = JSON.parse(localStorage.getItem('medicines'));

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        console.log('NewPrescriptionDialog: ' + medicines);
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
                variant='outlined'
                size='large'
                color='primary'
                onClick={handleClickOpen}
            >
                Imprimir receta
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
                            Prescripción de medicamentos{' '}
                        </h1>
                    </DialogContentText>
                    {/* <TextField
          autoFocus
          margin="dense"
          id="med1"
          label="medicación 1"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="med2"
          label="medicación 2"
          type="text"
          fullWidth
        /> */}
                    <List>
                        {medicines &&
                            medicines.map((med, index) => (
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
                {/*  */}
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
