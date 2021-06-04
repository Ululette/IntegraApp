import React from 'react';
import { Box, Button, makeStyles, lighten } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './ModifyPlans.css';

//------------------------makeStyle1---------------------------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
    iconFilter: {
        color: '#fafafa',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#34a7a1',
        },
    },
    p: {
        //fontWeight: 'bold',
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
    chip: {
        margin: theme.spacing(0.5),
        backgroundColor: '#3db7b1',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '15px',
    },
}));

export default function ModifyPlan({
    open,
    handleSubmit,
    handleChangeModal,
    handleCloseModal,
    handleAutoComplete,
    modalPlan,
    allBenefits,
}) {
    const classes = useStyles();
    return (
        <Dialog
            open={open}
            onClose={handleCloseModal}
            aria-labelledby='form-dialog-title'
        >
            <DialogTitle id='form-dialog-title' className={classes.popup}>
                MODIFICAR PLAN
            </DialogTitle>
            <form onSubmit={(e) => handleSubmit(e)}>
                <DialogContent>
                    <DialogContentText>
                        Editar los detalles del plan seleccionado.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='plan-description'
                        label='Name'
                        type='string'
                        name='name'
                        value={modalPlan.name}
                        onChange={(e) => handleChangeModal(e)}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        id='plan-price'
                        label='Price'
                        type='number'
                        name='price'
                        InputProps={{ inputProps: { min: 1 } }} // https://stackoverflow.com/questions/47798104/set-min-max-on-textfield-type-number
                        value={modalPlan.price}
                        onChange={(e) => handleChangeModal(e)}
                        fullWidth
                    />
                    {/* m={2} https://material-ui.com/es/system/spacing/ */}
                    <Box m={2} className='holaquetal'>
                        <Autocomplete
                            multiple
                            limitTags={2}
                            id='multiple-limit-tags'
                            options={allBenefits}
                            getOptionLabel={(option) => option.title}
                            // Tuve que trabajar con el mismo array que tengo en options porque de otra forma no funciona correctamente. Al parecer la posición de las opciones es relevante.
                            defaultValue={allBenefits.filter((benefit) =>
                                modalPlan.benefits.includes(benefit.title)
                            )}
                            onChange={(event, value) =>
                                handleAutoComplete(value)
                            } // es la forma de mostrar los valores https://stackoverflow.com/questions/58666189/getting-the-value-in-the-react-material-ui-autocomplete
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant='outlined'
                                    label='Beneficios'
                                    placeholder='Select'
                                    className='soyelchip'
                                />
                            )}
                        />
                    </Box>
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
                        type='submit'
                        color='primary'
                    >
                        Modificar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
