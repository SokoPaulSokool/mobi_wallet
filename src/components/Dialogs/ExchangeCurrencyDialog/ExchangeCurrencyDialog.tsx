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

  const [exchangeAmount, setExchangeAmount] = useState<number | undefined>(0);

  const [convertedAmount, setConvertedAmount] = useState<number | undefined>(0);

  const { currenciesDispatch, currenciesState } = useContext(GlobalContext);

  const [error, setError] = useState("");

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
      setError("");
      setExchangeAmount(0);
      setConvertedAmount(0);
    }
    return () => {};
  }, [open]);

  useEffect(() => {
    handleClose();
    return () => {};
  }, [currenciesState?.currencies]);

  useEffect(() => {
    if (exchangeAmount && selectedExchangeCurrency && selectedCurrency) {
      handleAmountChange(exchangeAmount);
      setConvertedAmount(
        exchangeCurrency(exchangeAmount, selectedCurrency, selectedExchangeCurrency)
      );
    }
    return () => {};
  }, [exchangeAmount, selectedExchangeCurrency]);

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
      setError("");
    }else if(exchangeAmount===0){
      setError("No amount to exchange");
    }
  };

  const handleAmountChange = (value: number) => {
    setExchangeAmount(value);
    if (selectedCurrency && value > selectedCurrency?.amount) {
      setError("The amount is greater than the available amount");
    }else{
      setError("");
    }
  };

  return (
    <Dialog onClose={handleClose} maxWidth="sm" fullWidth={true} open={open}>
      <div className="container">
        <DialogTitle id="simple-dialog-title">
          <div>
            <Typography variant="h4" data-testid="dialog-title">
              Exchange Currency
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
            <h3 className="my-1">{selectedCurrency?.units}</h3>
            <TextField
              data-testid="exchange-amount"
              label="How Much"
              className=" w-100"
              required={true}
              type="number"
              value={exchangeAmount}
              onChange={(event) => {
                handleAmountChange(parseInt(event.target.value));
              }}
            />
            <h3 className="my-2">To</h3>
            <Autocomplete
              data-testid="exchange-currency"
              className="my-2 w-100 px-0"
              options={currencies ? currencies : []}
              getOptionLabel={(option) => option.units}
              onChange={(event, newValue) => handleCurrencyChange(newValue)}
              renderInput={(params) => (
                <TextField {...params} required={true} label="Select Currency" />
              )}
            />
            <h3 className="my-2">{convertedAmount}</h3>
            {!error && (
              <AppButton
                className="app-bg-accent app-clr-white"
                text="Exchange"
                type="submit"
              ></AppButton>
            )}
          </form>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default ExchangeCurrencyDialog;
