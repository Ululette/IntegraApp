import React from "react";
import { withStyles } from "@material-ui/core/styles";
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
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
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

export default function CustomizedDialogs({open, handleClose, rows}) {
 

  return (
    <div>
  
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="form-dialog-title">{`Autorización para el paciente: ${rows.partners.name} ${rows.partners.lastname}`}</DialogTitle>
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
                rows.results.results.results ? rows.results.results.results : "Aun no hay resultados"
              }`}
              fullWidth
            />  
          </List>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
Cerrar          </Button>
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
