import React, { useEffect, useState } from "react";
import { lighten, makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
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
  TextField,
  Typography,
} from "@material-ui/core";

//------------------------makeStyle1---------------------------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  iconFilter: {
      color: '#fafafa',
      fontWeight: 'bold',
      '&:hover': {
          backgroundColor: '#34a7a1',
      }
  },
  p: {
      //fontWeight: 'bold',
      fontSize: '1.3rem',
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

export default function DeletePlan({
  open,
  handleSubmit,
  handleCloseModal,
  deletePlan,
  password,
}) {
  const classes = useStyles();

  if (deletePlan.users !== 0) {
    return (
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={(e) => handleSubmit(e, deletePlan.id_plan)}>
          <DialogTitle id="form-dialog-title" className={classes.popup}>BORRAR PLAN</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.p}>
             {/*  {`You cannot delete a plan that is assigned to ${deletePlan.users} people. First change this people to another plan and then delete this plan.`} */}
              {`No se puede eliminar un plan si este tiene asignado a socios (${deletePlan.users}). Antes debe cambiar de plan a estos socios, luego podra eliminar el plan.` }
            </DialogContentText>
            <Box margin={1}>
              <Typography variant="h8" gutterBottom component="div" className={classes.p}>
                BENEFICIOS
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell >NOMBRE</TableCell>
                    <TableCell >DESCRIPCION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deletePlan.benefits.map((benefit) => (
                    <TableRow>
                      <TableCell >{benefit.title.toUpperCase()}</TableCell>
                      <TableCell>{benefit.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseModal} color="primary" className={classes.popupBtn}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={(e) => handleSubmit(e, deletePlan.id_plan)}>
        <DialogTitle id="form-dialog-title">Delete Plan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to delete ${deletePlan.name} ?`}
          </DialogContentText>
          <Box margin={1}>
            <Typography variant="h8" gutterBottom component="div">
              Benefits
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deletePlan.benefits.map((benefit) => (
                  <TableRow>
                    <TableCell>{benefit.title}</TableCell>
                    <TableCell>{benefit.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <TextField
            error={password.error}
            id="outlined-password-input"
            label="Password"
            type="password"
            helperText="Incorrect Password."
            autoComplete="current-password"
            variant="outlined"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Delete
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
