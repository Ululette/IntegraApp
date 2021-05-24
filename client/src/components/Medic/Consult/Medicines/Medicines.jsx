import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import {
  Button,
  List,
  ListItem,
  Avatar,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[300],
    color: blue[100],
    "&:hover": {
      backgroundColor: blue[800],
    }
  }
});

export default function Medicines() {

  const classes = useStyles();

  // Estado de apertura del diálogo
  const [open, setOpen] = React.useState(false);

  // Función que al hacer click abre el diálogo
  let handleClickOpen = (e) => {
    setOpen(true);
  };

  // Cuando abre el diálogo de mostrar medicamentos se fija si hay
  // algo cargado en el localstorage (por si anteriormente
  // lo había cargado y vuelto a cerrar)
  let meds = JSON.parse(localStorage.getItem('medicines')) || [];

  let [newmed, setNewmed] = useState('');
  let [medicines, setMedicines] = useState(meds);
  let [ok, setOk] = useState(false);
  // let [mederror, setMederror] = useState('');

  let handleChange = (e) => {
    console.log(e.target.value);
    //no puede quedar vacío ni ser solo espacios
    let med = e.target.value;
    let medregex = /[0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+[ ]?[0-9a-z A-ZÀ-ÿ\u00f1\u00d1]*$/;
    if ((medregex).test(med)) { // si no está vacío
      setOk(true); // deja agregarlo
      // setMederror('');
    } else {
      // setMederror('No puede quedar incompleto o en blanco.');
      setOk(false);
    }
    setNewmed(med);
  };

  useEffect(() => {
    if (newmed) {
      console.log(newmed);
    }
  }, [newmed]);

  let handleItemRemove = (value) => {

    // console.log('clickeaste ',value);
    let newmeds = medicines.filter(e => e !== value);
    setMedicines(newmeds);
    return;
  }

  let handlePlus = (e) => {
    setMedicines([...medicines, newmed])
    console.log(medicines);
    setNewmed('');
    setOk(false);
    //limpie el imput
  };
  useEffect(() => {
    if (medicines.length) {
      console.log(medicines);
    }
  }, [medicines]);

  const handleClose = () => {
    setNewmed('');
    setMedicines([]);
    setOk(false);
    setOpen(false);
  };

  // Cuando doy "guardar" en el diálogo de cargar medicamentos
  const handleSave = () => {
    console.log('acá:', medicines);
    localStorage.setItem('medicines', JSON.stringify(medicines))
    setNewmed('');
    setOk(false);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Medicamentos
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Medicamentos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Agregue a continuación los medicamentos indicados al paciente.
          </DialogContentText>
          <List>
            {medicines && medicines.map((med, index) => (
              <ListItem
                button
                onClick={() => handleItemRemove(med)}
                key={index}
                name={med}>
                {med}
              </ListItem>

            ))}
            <ListItem autoFocus button >

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="nueva medicación"
                type="text"
                fullWidth
                onChange={handleChange}
                value={newmed}
              />
              {ok && <Avatar className={classes.avatar}>
                <CheckIcon onClick={() => handlePlus()} />
              </Avatar>}
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          {!!medicines.length && <Button onClick={handleSave}
            color="primary">
            Guardar
          </Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
