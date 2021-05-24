import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

//-----------------
// const emails = ['username@gmail.com', 'user02@gmail.com'];
// const useStyles = makeStyles({
//   avatar: {
//     backgroundColor: blue[100],
//     color: blue[600],
//   },
// });

// function SimpleDialog(props) {
//   const classes = useStyles();
//   const { onClose, selectedValue, open } = props;

//   const handleClose = () => {
//     onClose(selectedValue);
//   };

//   const handleListItemClick = (value) => {
//     onClose(value);
//   };

//   return (
//     <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
//       <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
//       <List>
//         {emails.map((email) => (
//           <ListItem button onClick={() => handleListItemClick(email)} key={email}>
//             <ListItemAvatar>
//               <Avatar className={classes.avatar}>
//                 <PersonIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ListItemText primary={email} />
//           </ListItem>
//         ))}

//         <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
//           <ListItemAvatar>
//             <Avatar>
//               <AddIcon />
//             </Avatar>
//           </ListItemAvatar>
//           <ListItemText primary="Add account" />
//         </ListItem>
//       </List>
//     </Dialog>
//   );
// }
//-----------------
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


  const [open, setOpen] = React.useState(false);



  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (value) => {
    // onClose(value);
  };

  let [newmed, setNewmed] = useState('');
  let [medicines, setMedicines] = useState([]);
  let [ok, setOk] = useState(false);
  let [mederror, setMederror] = useState('');

  let handleChange = (e) => {
    console.log(e.target.value);
    let med = e.target.value;
    setNewmed(med);
  };

  useEffect(() => {
    if (newmed) {
      console.log(newmed);
    }
  }, [newmed]);

  let handlePlus = (e) => {
    setMedicines([...medicines, newmed])
    console.log(medicines);
    setNewmed('');
    //limpie el imput
  };
  useEffect(() => {
    if (medicines.length) {
      console.log(medicines);
    }
  }, [medicines]);

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
            {medicines.map((med, index) => (
              <ListItem
                button
                onClick={() => handleListItemClick(med)}
                key={index}>
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
              //Controlar que no sea vacío
              />
              {/* <ListItemAvatar> */}
              <Avatar className={classes.avatar}>
                <CheckIcon onClick={() => handlePlus('addAccount')} />
              </Avatar>
              {/* </ListItemAvatar> */}
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          {/* <Button onClick={handleClose} color="primary">
            Guardar
          </Button> */}
          {ValidityState() && <Button onClick={handleClose} color="primary">
            Guardar
          </Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
