import React from "react";
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

export default function DeletePlan({
  open,
  handleSubmit,
  handleCloseModal,
  deletePlan,
  password,
}) {
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
            Are you sure you want to delete {deletePlan.name} ?
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
