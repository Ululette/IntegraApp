import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { setMedicines } from '../../../../actions/consult.action';

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

export default function FormDialog() {

  let dispatch = useDispatch();

  const classes = useStyles();

  // Estado de apertura del diálogo
  const [open, setOpen] = React.useState(false);

  // Función que al hacer click abre el diálogo
  let handleClickOpen = (e) => {
    setOpen(true);
  };

  let [newmed, setNewmed] = useState('');
  let [medicines, setMedicines] = useState([]);
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

  const handleSave = () => {
    console.log('acá:',medicines);
    localStorage.setItem('medicines',JSON.stringify(medicines))
    setNewmed('');
    setMedicines([]);
    setOk(false);
    setOpen(false);
  };


  return (
    <div>
      <Button variant="outlined" size="large" color="primary" onClick={handleClickOpen}>
        Medicamentos
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Medicamentos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Agregue a continuación los medicamentos indicados al paciente.
          </DialogContentText>
          <List>
            {medicines.map((med, index) => (
              <ListItem
                button
                onClick={() => handleItemRemove(med)}
                key={index}
                name={med}>
                {med}
              </ListItem>

            ))}
            {/* {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))} */}

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
            //disabled = {!validate()}
            color="primary">
            Guardar
          </Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
