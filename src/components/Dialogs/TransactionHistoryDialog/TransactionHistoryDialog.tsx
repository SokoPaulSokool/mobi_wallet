import { Dialog, DialogTitle } from "@material-ui/core";
import React from "react";
import { DialogProps } from "../../../interfaces/DialogInterfaces";

const TransactionHistoryDialog: React.FC<DialogProps> = ({ onClose, open }) => {
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        TransactionHistoryDialog
      </DialogTitle>
    </Dialog>
  );
};

export default TransactionHistoryDialog;
