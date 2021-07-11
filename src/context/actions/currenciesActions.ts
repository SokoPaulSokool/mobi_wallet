import Currency from "../../interfaces/CurrencyInterfaces";
import { ADD_CURRENCY, DEPOSIT_TO_CURRENCY, EXCHANGE_CURRENCY } from "./types";
import { exchangeCurrency } from "../../helpers/generalHelpers";
import { CHANGE_DEFAULT_CURRENCY } from "../../constants/generalConstants";


export const depositCurrency =
  (currency: Currency, depositAmount: number) => (dispatch: any) => {
    const newAmount = currency.amount + depositAmount;
    dispatch({
      type: DEPOSIT_TO_CURRENCY,
      payload: { currencyUnits: currency.units, newAmount },
    });
  };

export const currencyExchange =
  (amountToExchange: number, fromCurrency: Currency, toCurrency: Currency) =>
  (dispatch: any) => {
    const exchangedCurrency = exchangeCurrency(
      amountToExchange,
      fromCurrency,
      toCurrency
    );
    const newFromCurrencyTotal = fromCurrency.amount - amountToExchange;
    const newToCurrencyTotal = toCurrency.amount + exchangedCurrency;
    dispatch({
      type: EXCHANGE_CURRENCY,
      payload: {
        fromCurrency: {
          units: fromCurrency.units,
          amount: newFromCurrencyTotal,
        },
        toCurrency: { units: toCurrency.units, amount: newToCurrencyTotal },
      },
    });
  };

export const changeDefaultCurrency =
  (defaultCurrency: Currency) => (dispatch: any) => {
    dispatch({
      type: CHANGE_DEFAULT_CURRENCY,
      payload: { defaultCurrency },
    });
  };

export const addCurrency =
  (newCurrency: Currency) => (dispatch: any) => {
    dispatch({
      type: ADD_CURRENCY,
      payload: { newCurrency },
    });
  };


