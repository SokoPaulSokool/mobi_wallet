import { Dialog, DialogTitle, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { DialogProps } from "../../../interfaces/DialogInterfaces";
import { DialogContent, TextField } from "@material-ui/core";
import { AppButton } from "../../common/AppButton/AppButton";
import Currency from "../../../interfaces/CurrencyInterfaces";
import { useState, useEffect } from "react";
import { Autocomplete } from "@material-ui/lab";
import { exchangeCurrency } from "../../../helpers/generalHelpers";
import { currencyExchange } from "../../../context/actions/currenciesActions";
import { GlobalContext } from "../../../context/provider";

const ExchangeCurrencyDialog: React.FC<DialogProps> = ({
  onClose,
  open,
  selectedValue,
  currencies,
}) => {
  const [selectedCurrency, setselectedCurrency] = useState<
    Currency | undefined
  >(undefined);

  const [selectedExchangeCurrency, setSelectedExchangeCurrency] =
    useState<Currency | null>(null);

  const [exchangeAmount, setExchangeAmount] = useState<number | undefined>(
    undefined
  );

  const [convertedAmount, setConvertedAmount] = useState<number | undefined>(
    undefined
  );

  const { currenciesDispatch, currenciesState } = useContext(GlobalContext);

  const handleClose = () => {
    onClose();
  };
  useEffect(() => {
    if (selectedValue) {
      setselectedCurrency(selectedValue);
    }
    return () => {};
  }, [selectedValue]);

  useEffect(() => {
    if (open) {
      setExchangeAmount(undefined);
      setConvertedAmount(undefined);
    }
    return () => {};
  }, [open]);

  const handleCurrencyChange = (currency: Currency | null) => {
    if (currency) {
      setSelectedExchangeCurrency(currency);
      if (exchangeAmount && selectedCurrency) {
        setConvertedAmount(
          exchangeCurrency(exchangeAmount, selectedCurrency, currency)
        );
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (exchangeAmount && selectedCurrency && selectedExchangeCurrency) {
      currencyExchange(
        exchangeAmount,
        selectedCurrency,
        selectedExchangeCurrency
      )(currenciesDispatch);
    }
  };

  return (
    <Dialog onClose={handleClose} maxWidth="sm" fullWidth={true} open={open}>
      <div className="container">
        <DialogTitle id="simple-dialog-title">
          <div>
            <Typography variant="h4">Exchange Currency</Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit}
            className="d-flex row"
            autoComplete="off"
          >
            <h3 className="my-1">{selectedCurrency?.units}</h3>
            <TextField
              label="How Much"
              className=" w-100"
              required={true}
              type="number"
              value={exchangeAmount}
              onChange={(event) =>
                setExchangeAmount(parseInt(event.target.value))
              }
            />
            <h3 className="my-2">To</h3>
            <Autocomplete
              className="my-2 w-100 px-0"
              options={currencies ? currencies : []}
              getOptionLabel={(option) => option.units}
              onChange={(event, newValue) => handleCurrencyChange(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Currency" />
              )}
            />
            <h3 className="my-2">{convertedAmount}</h3>
            <AppButton
              className="app-bg-accent app-clr-white"
              text="Exchange"
              type="submit"
            ></AppButton>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default ExchangeCurrencyDialog;
