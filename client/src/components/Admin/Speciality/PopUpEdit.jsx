import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({ open, handleClose, handleEdit }) {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
            >
                <form onSubmit={(e) => handleEdit(e)}>
                    <DialogTitle id='form-dialog-title'>Edit</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`Si desea modificar la especialidad X por favor ingrese el nuevo nombre en el campo de texto.
            De lo constrario presione Cancelar.`}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='name'
                            label='Speciality'
                            type='string'
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button type='submit' color='primary'>
                            Edit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
