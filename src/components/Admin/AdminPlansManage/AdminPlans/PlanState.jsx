import React from 'react';
import { Button, makeStyles, lighten } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import supabase from '../../../../supabase.config';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '360px',
    },
    p: {
        fontSize: '1.3rem',
        color: '#000000',
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
}));

function PlanState({ open, handleSubmit, handleCloseModal, planState }) {
    const classes = useStyles();

    const changeState = async (e, plan) => {
        e.preventDefault();
        if (plan.active) {
            await supabase
                .from('plans')
                .update({ active: false })
                .eq('id', plan.id_plan);
        } else {
            await supabase
                .from('plans')
                .update({ active: true })
                .eq('id', plan.id_plan);
        }
        window.location.reload();
    };

    return (
        <Dialog
            open={open}
            onClose={handleCloseModal}
            aria-labelledby='form-dialog-title'
            className={classes.root}
        >
            <DialogTitle id='form-dialog-title' className={classes.popup}>
                CAMBIAR ESTADO DEL PLAN
            </DialogTitle>
            <form onSubmit={(e) => handleSubmit(e)}>
                <DialogContent className={classes.root}>
                    <DialogContentText
                        id='alert-dialog-description'
                        className={classes.root}
                    >
                        {/* Are you sure you want to */}
                        Esta seguro que quiere{' '}
                        {planState.active ? 'desactivar' : 'activar'} este plan?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseModal}
                        className={classes.popupBtn}
                    >
                        Cancelar
                    </Button>
                    <Button
                        className={classes.popupBtn}
                        onClick={(e) => changeState(e, planState)}
                        type='submit'
                    >
                        Cambiar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default PlanState;
