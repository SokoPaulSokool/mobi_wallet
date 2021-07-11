import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { DialogProps } from "../../../interfaces/DialogInterfaces";
import AppButton from "../../common/AppButton/AppButton";
import { GlobalContext } from "../../../context/provider";
import { depositCurrency } from "../../../context/actions/currenciesActions";

const DepositCurrencyDialog: React.FC<DialogProps> = ({
  onClose,
  open,
  selectedValue,
}) => {
  const [depositAmount, setDepositAmount] = useState<number | undefined>(
    undefined
  );
  const { currenciesDispatch, currenciesState } = useContext(GlobalContext);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    setDepositAmount(undefined);
    return () => {};
  }, [open]);
  useEffect(() => {
    handleClose();
    return () => {};
  }, [currenciesState?.currrencies]);

  const handleSubmmit = (e: any) => {
    e.preventDefault();
    if (depositAmount) {
      depositCurrency(selectedValue, depositAmount)(currenciesDispatch);
    }
  };
  return (
    <Dialog onClose={handleClose} maxWidth="sm" fullWidth={true} open={open}>
      <div className="container">
        <DialogTitle id="simple-dialog-title">
          <Typography variant="h4">Deposit</Typography>
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmmit}
            className="d-flex row"
            autoComplete="off"
          >
            <TextField
              label="How Much"
              className="my-2"
              required={true}
              type="number"
              value={depositAmount}
              onChange={(event) =>
                setDepositAmount(parseInt(event.target.value))
              }
            />
            <AppButton
              className="app-bg-accent app-clr-white"
              text="Submit"
              type="submit"
            ></AppButton>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default DepositCurrencyDialog;
