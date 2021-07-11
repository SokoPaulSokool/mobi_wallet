import { Dialog, DialogTitle } from "@material-ui/core";
import React, { useState } from "react";
import { DialogProps } from "../../../interfaces/DialogInterfaces";
import { DialogContent, TextField, Typography } from "@material-ui/core";
import { AppButton } from "../../common/AppButton/AppButton";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../../context/provider";
import { Autocomplete } from "@material-ui/lab";
import Currency from "../../../interfaces/CurrencyInterfaces";
import { changeDefaultCurrency } from "../../../context/actions/currenciesActions";

const SetDefaultCurrencyDialog: React.FC<DialogProps> = ({
  onClose,
  open,
  currencies,
}) => {
  const { currenciesDispatch, currenciesState } = useContext(GlobalContext);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null
  );
  const [defaultCurrency, setDefaultCurrency] = useState<Currency | null>(null);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (open) {
      if (currenciesState?.defaultCurrency) {
        setDefaultCurrency(currenciesState.defaultCurrency);
      }
    }
    return () => {};
  }, [open]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedCurrency) {
      changeDefaultCurrency(selectedCurrency)(currenciesDispatch);
    }
  };
  const handleCurrencyChange = (currency: Currency | null) => {
    setSelectedCurrency(currency);
  };
  return (
    <Dialog onClose={handleClose} maxWidth="sm" fullWidth={true} open={open}>
      <div className="container">
        <DialogTitle id="simple-dialog-title">
          <div>
            <Typography variant="h4">Set Default Currency</Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit}
            className="d-flex row"
            autoComplete="off"
          >
            <h3 className="my-1">{defaultCurrency?.units}</h3>

            <Autocomplete
              className="my-2 w-100 px-0"
              options={currencies ? currencies : []}
              getOptionLabel={(option) => option.units}
              onChange={(event, newValue) => handleCurrencyChange(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Currency" />
              )}
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

export default SetDefaultCurrencyDialog;
