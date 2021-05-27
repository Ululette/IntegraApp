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
  Typography,
} from "@material-ui/core";

export default function PlanDetails({ open, handleCloseModal, planDetail }) {
  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Details</DialogTitle>
      <DialogContent>
        <DialogContentText>Name: {planDetail.name}</DialogContentText>
        <DialogContentText>Price: ${planDetail.price}</DialogContentText>
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
              {planDetail.benefits.map((benefit) => (
                <TableRow>
                  <TableCell>{benefit.title}</TableCell>
                  <TableCell>{benefit.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
