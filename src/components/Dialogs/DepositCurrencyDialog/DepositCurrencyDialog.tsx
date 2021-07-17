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
  const [depositAmount, setDepositAmount] = useState<number | undefined>(0);
  const { currenciesDispatch, currenciesState } = useContext(GlobalContext);

  const [error, setError] = useState("");

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    setDepositAmount(0);
    setError("");
    return () => {};
  }, [open]);
  useEffect(() => {
    handleClose();
    return () => {};
  }, [currenciesState?.currencies]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (depositAmount) {
      depositCurrency(selectedValue, depositAmount)(currenciesDispatch);
      setError("");
    }else{
      setError("No amount to deposit");
    }
  };
  return (
    <Dialog onClose={handleClose} maxWidth="sm" fullWidth={true} open={open}>
      <div className="container">
        <DialogTitle id="simple-dialog-title">
          <div>
            <Typography variant="h4" data-testid="dialog-title">
              Deposit
            </Typography>
            <p className="error-text">{error}</p>
          </div>
        </DialogTitle>
        <DialogContent>
          <form
            data-testid="submit-form"
            onSubmit={handleSubmit}
            className="d-flex row"
            autoComplete="off"
          >
            <TextField
              data-testid="deposit-amount"
              label="How Much"
              className="my-2"
              required={true}
              type="number"
              value={depositAmount}
              onChange={(event) => {
                if (parseInt(event.target.value)) {
                  setDepositAmount(parseInt(event.target.value));
                  setError("");
                } else {
                  setDepositAmount(0);
                }
              }}
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
