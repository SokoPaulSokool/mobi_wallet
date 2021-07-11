import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { addCurrency } from "../../../context/actions/currenciesActions";
import Currency from "../../../interfaces/CurrencyInterfaces";
import { DialogProps } from "../../../interfaces/DialogInterfaces";
import { AppButton } from "../../common/AppButton/AppButton";
import { GlobalContext } from "../../../context/provider";

const AddCurrencyDialog: React.FC<DialogProps> = ({
  onClose,
  open,
  currencies,
}) => {
  const { currenciesDispatch, currenciesState } = useContext(GlobalContext);

  const [currencyUnits, setCurrencyUnits] = useState<string | null>("");
  const [error, setError] = useState("");
  const [currencyExchangeRate, setCurrencyExchangeRate] = useState<
    number | null
  >(0);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (open) {
      setError("");
      setCurrencyUnits("");
      setCurrencyExchangeRate(1);
    }
    return () => {};
  }, [open]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (currencyUnits && currencyExchangeRate && currencies) {
      const check = currencies?.filter((curr) => curr.units === currencyUnits);
      if (check.length === 0) {
        const newCurrency: Currency = {
          amount: 0,
          exchangeRate: currencyExchangeRate,
          units: currencyUnits,
        };
        addCurrency(newCurrency)(currenciesDispatch);
      } else {
        setError("Currency already exists");
      }
    }
  };

  useEffect(() => {
    if (currenciesState?.currencies) {
      handleClose();
    }
    return () => {};
  }, [currenciesState?.currencies]);

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
              data-testid="currency-units"
              label="Currency Units"
              className="my-2"
              required={true}
              value={currencyUnits}
              onChange={(event) => {
                const value = event.target.value;
                if (value) {
                  setCurrencyUnits(value.toUpperCase());
                } else {
                  setCurrencyUnits(value);
                }
              }}
            />
            <TextField
              data-testid="currency-exchange-rate"
              label="Euro Exchange Rate"
              className="my-2"
              required={true}
              type="number"
              value={currencyExchangeRate}
              onChange={(event) => {
                if (parseFloat(event.target.value)) {
                  setCurrencyExchangeRate(parseFloat(event.target.value));
                } else {
                  setCurrencyExchangeRate(0);
                }
              }}
            />
            <AppButton
              data-testid="submit-btn"
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

export default AddCurrencyDialog;
