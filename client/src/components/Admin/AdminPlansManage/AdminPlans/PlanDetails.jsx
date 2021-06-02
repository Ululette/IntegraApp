import React from "react";
import { Button,makeStyles,lighten } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth:'360px'
  },
  p: {
      color: '#000000',
      textAlign: 'rigth'
  },
  popup: {
      color: '#fafafa',
      backgroundColor: '#2c7f7b',
      fontWeight: 'bold',
      fontSize: '30px'
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
      }
  }

}));

export default function PlanDetails({ open, handleCloseModal, planDetail }) {
  
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="form-dialog-title"
      className={classes.root}
    >
      <DialogTitle id="form-dialog-title" className={classes.popup}>
        DETALLES
        </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.p}>NOMBRE: {planDetail.name}</DialogContentText>
        <DialogContentText className={classes.p}>PRECIO: ${planDetail.price}</DialogContentText>
        <Box margin={1} >
          <Typography variant="h8" gutterBottom component="div" className={classes.p}>
            BENEFICIOS
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>NOMBRE</TableCell>
                <TableCell>DESCRIPCION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planDetail.benefits.map((benefit) => (
                <TableRow>
                  <TableCell>{benefit.title.toUpperCase()}</TableCell>
                  <TableCell>{benefit.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} className={classes.popupBtn}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
