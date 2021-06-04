import React from "react";
import { withStyles,lighten, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


const useStyles = makeStyles((theme) => ({
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

export default function CustomizedDialogs({open, handleClose, rows}) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle 
        className={classes.popup}
        id="form-dialog-title">{`Autorización para el paciente: ${rows.partners.name.toUpperCase()} ${rows.partners.lastname.toUpperCase()}`}</DialogTitle>
        <DialogContent>
          <List>
        <ListItemText primary={`Fecha: ${rows.date}`} fullWidth />
        <ListItemText primary={`Nombre del estudio o medicamento: ${rows.study_name}`} fullWidth />
        <ListItemText primary={`Estado: ${rows.order_status.name}`} fullWidth />
            <ListItemText
              primary={`Nombre y apellido del paciente: ${rows.partners.name} ${rows.partners.lastname}`}
              fullWidth
            />
            <ListItemText
              primary={`DNI del paciente: ${rows.partners.dni}`}
              fullWidth
            />
            <ListItemText
              primary={`Nombre y apellido del médico: ${rows.medics.name} ${rows.medics.lastname}`}
              fullWidth
            />
            <ListItemText
              primary={`Numero de consulta: ${rows.medical_consultations.id}`}
              fullWidth
            />
       <ListItemText
              primary={`Resultados: ${
                rows.results? rows.results.results.results : "Aun no hay resultados"
              }`}
              fullWidth
            />  
          </List>
        </DialogContent>
        <DialogActions>
          <Button 
          className={classes.popupBtn}
          autoFocus onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

{
  /* <Dialog
aria-labelledby='form-dialog-title'
>
<DialogTitle id='form-dialog-title'>
    Eliminar socio
</DialogTitle>
<DialogContent>
    <List>
        <ListItemText
            primary={`Fecha: ${rows.date}`}
            fullWidth
        />
        <ListItemText
            primary={`Nombre y apellido del paciente: ${rows.partners.name} ${rows.partners.lastname}`}
            fullWidth
        />
        <ListItemText
            primary={`DNI del paciente: ${rows.partners.dni}`}
            fullWidth
        />
        <ListItemText
            primary={`Nombre y apellido del médico ${rows.medics.name} ${rows.medics.lastname}`}
            fullWidth
        />
           <ListItemText
            primary={`Nombre y apellido del médico ${rows.medics.name} ${rows.medics.lastname}`}
            fullWidth
        />
           <ListItemText
            primary={`Numero de consulta ${rows.medical_consultation_id}`}
            fullWidth
        />
              <ListItemText
            primary={`Estudio o tratamiento requerido ${rows.study_name}`}
            fullWidth
        />
         <ListItemText
            primary={`Resultados: ${rows.result ? rows.result : 'Aun no hay resultados'}`}
            fullWidth
        />
  
    </List>
</DialogContent>

</Dialog>  */
}
