import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { lighten, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    p: {
        fontWeight: 'bold',
        fontSize: '1rem',
        color: '#2c7f7b',
        textAlign: 'rigth',
    },
    popup: {
        color: '#fafafa',
        backgroundColor: '#2c7f7b',
        fontWeight: 'bold',
        fontSize: '30px',
    },
    popupBtn: {
        color: '#fafafa',
        padding: theme.spacing(0.5),
        border: '3px solid #2c7f7b',
        backgroundColor: '#2c7f7b',
        fontWeight: 'bold',
        fontSize: '15px',
        '&:hover': {
            backgroundColor: lighten('#fafafa', 0.2),
            color: '#2c7f7b',
            padding: theme.spacing(0.5),
        },
    },
    formControl: {
        width: '177px',
    },
}));
export default function FormDialog({ open, handleClose, handleEdit }) {
    const classes = useStyles();
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='form-dialog-title'
            >
                <form onSubmit={(e) => handleEdit(e)}>
                    <DialogTitle
                        id='form-dialog-title'
                        className={classes.popup}
                    >
                        EDITAR ESPECIALIDAD
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`Si desea modificar esta especialidad por favor ingrese el nuevo nombre en el campo de texto.
            De lo contrario presione cancelar.`}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='name'
                            label='Espacialidad'
                            type='string'
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                            className={classes.popupBtn}
                        >
                            Cancelar
                        </Button>
                        <Button type='submit' className={classes.popupBtn}>
                            Editar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
