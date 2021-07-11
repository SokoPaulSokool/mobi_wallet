import { Dialog, DialogTitle } from "@material-ui/core";
import React from "react";
import { DialogProps } from "../../../interfaces/DialogInterfaces";

const AddCurrencyDialog: React.FC<DialogProps> = ({ onClose, open }) => {
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">AddCurrencyDialog</DialogTitle>
    </Dialog>
  );
};

export default AddCurrencyDialog;
