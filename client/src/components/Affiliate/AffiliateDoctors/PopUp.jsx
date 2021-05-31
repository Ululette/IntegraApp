import React, { useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const PopUp = (props) => {
    const descriptionElementRef = useRef(null);
    const { name, lastname, email, phone_number, profilePic, address } =
        props.doctor;
    const { closePopup } = props;
    const { show } = props;
    useEffect(() => {
        if (show) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [show]);

    return (
        <Dialog
            open={show}
            onClose={closePopup}
            scroll='paper'
            aria-labelledby='scroll-dialog-title'
            aria-describedby='scroll-dialog-description'
        >
            <img src={profilePic} alt='Foto medico.' />
            <DialogTitle id='scroll-dialog-title'>Nombre: {name}</DialogTitle>

            <DialogTitle id='scroll-dialog-title'>
                Apellido: {lastname}
            </DialogTitle>
            <DialogTitle id='scroll-dialog-title'>email: {email}</DialogTitle>
            <DialogTitle id='scroll-dialog-title'>
                Teléfono: {phone_number}
            </DialogTitle>
            <DialogTitle id='scroll-dialog-title'>
                Dirección: {address}
            </DialogTitle>

            <DialogActions>
                <Button onClick={closePopup} color='primary'>
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PopUp;
