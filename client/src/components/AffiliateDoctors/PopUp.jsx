import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

  
const PopUp = (props) => {
    const descriptionElementRef = useRef(null);
    const { name, lastname, email, phone_number, profilePic, address } = props.doctors;
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
console.log(props)
    return (
        <Dialog
            open={show}
            onClose={closePopup}
            scroll='paper'
            aria-labelledby='scroll-dialog-title'
            aria-describedby='scroll-dialog-description'
        >
            <DialogTitle id='scroll-dialog-title'>{props.doctors.map(d =>  d.name)}</DialogTitle>
        
            <DialogTitle id='scroll-dialog-title'>{props.doctors.lastname}</DialogTitle>
                <DialogTitle id='scroll-dialog-title'>{props.doctors.email}</DialogTitle>
                <DialogTitle id='scroll-dialog-title'>{props.doctors.phone_number}</DialogTitle>
                <DialogTitle id='scroll-dialog-title'>{props.doctors.profilePic}</DialogTitle>
                <DialogTitle id='scroll-dialog-title'>{props.doctors.address}</DialogTitle>

            <DialogActions>
                <Button onClick={closePopup} color='primary'>
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PopUp;


