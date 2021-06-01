import React from "react";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import supabase from "../../../supabase.config";

function PlanState({ open, handleSubmit, handleCloseModal, planState }) {
  const changeState = async (e, plan) => {
    e.preventDefault();
    if (plan.active) {
      const { data, error } = await supabase
        .from("plans")
        .update({ active: false })
        .eq("id", plan.id_plan);
    } else {
      const { data, error } = await supabase
        .from("plans")
        .update({ active: true })
        .eq("id", plan.id_plan);
    }
    window.location.reload();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Change Plan State</DialogTitle>
      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to{" "}
            {planState.active ? "deactivate" : "activate"} this plan?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(e) => changeState(e, planState)}
            type="submit"
            color="primary"
          >
            Change
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default PlanState;
