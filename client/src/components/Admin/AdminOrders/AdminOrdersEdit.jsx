import React, { useState } from 'react';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { statesMedic } from '../../../functions/states.js';
/* import styles from './AdminOrdersEdit.css';
 */import supabase from '../../../supabase.config.js';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

function AdminMedicEdit({
    status,
 data,
    setEditActive,
    editActive,
}) {
    const classes = useStyles();
    const MySwal = withReactContent(Swal);
    let [input, setInput] = React.useState('');


    const handleClose = () => {
        setEditActive(false);
    };
 
  

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEditActive(false);
        console.log(data)
        console.log(input,'input')
    MySwal.fire({
            title: `Esta seguro que desea actualizar el estado de la orden del paciente: ${data.partners.name} ${data.partners.lastname} con DNI: ${data.partners.dni}?`,
            icon: 'question',
            showCloseButton: true,
            showCancelButton: true,
        }).then(async (res) => { 
        if (res.isConfirmed) {
              
                try  {
                    await supabase
                    .from('orders')
                    .update({ status: input.status.id })
                    .eq('id', data.id)
                    MySwal.fire({
                        title: 'Se edito el estado con exito!',
                        icon: 'success',
                        timer: 2000,
                    }).then(() => window.location.reload()); 
                } catch (error) {
                    console.log(error);
                    MySwal.fire({
                        title: 'Hubo un error al editar el.',
                        text: `Error: ${error}`,
                        icon: 'error',
                    });
                }
            }
        }); 
    };

    if (!data) return <CircularProgress />;
    console.log(status, 'status')
    return (
        <Dialog open={editActive} onClose={handleClose} onSubmit={handleSubmit}>
            <DialogTitle>Editar estado</DialogTitle>
            <DialogContent>
             {/*    <DialogContentText>
                    Formulario para editar medico.
                </DialogContentText> */}
                <InputLabel htmlFor='status'>Estado</InputLabel>
                <Select
                    name='status'
                    onChange={handleChange}
                    value={input}
               >
                    {status.map((el, index) => (
                        <MenuItem key={`state-${index}`} value={el.name}>
                            {el.name}
                        </MenuItem>
                    ))}
                </Select>
  

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='primary'>
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} type='submit' color='primary'>
                    Editar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AdminMedicEdit;
