import React from "react";
import { Box, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ModifyPlan({
  open,
  handleSubmit,
  handleChangeModal,
  handleCloseModal,
  handleAutoComplete,
  modalPlan,
  allBenefits,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Modify Plan</DialogTitle>
      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent>
          <DialogContentText>Edit selected plan details.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="plan-description"
            label="Name"
            type="string"
            name="name"
            value={modalPlan.name}
            onChange={(e) => handleChangeModal(e)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="plan-price"
            label="Price"
            type="number"
            name="price"
            InputProps={{ inputProps: { min: 1 } }} // https://stackoverflow.com/questions/47798104/set-min-max-on-textfield-type-number
            value={modalPlan.price}
            onChange={(e) => handleChangeModal(e)}
            fullWidth
          />
          {/* m={2} https://material-ui.com/es/system/spacing/ */}
          <Box m={2}>
            <Autocomplete
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              options={allBenefits}
              getOptionLabel={(option) => option.title}
              // Tuve que trabajar con el mismo array que tengo en options porque de otra forma no funciona correctamente. Al parecer la posición de las opciones es relevante.
              defaultValue={allBenefits.filter((benefit) =>
                modalPlan.benefits.includes(benefit.title)
              )}
              onChange={(event, value) => handleAutoComplete(value)} // es la forma de mostrar los valores https://stackoverflow.com/questions/58666189/getting-the-value-in-the-react-material-ui-autocomplete
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Benefits"
                  placeholder="Select"
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => console.log("modify button")}
            type="submit"
            color="primary"
          >
            Modify
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
