import Currency from "../../interfaces/CurrencyInterfaces";
import { DEPOSIT_TO_CURRENCY, EXCHANGE_CURRENCY } from "./types";
import { exchangeCurrency } from "../../helpers/generalHelpers";

const currenciesActions = () => {
  return {};
};
export const depositCurrency =
  (currency: Currency, depositAmount: number) => (dispatch: any) => {
    const newAmount = currency.amount + depositAmount;
    console.log(currency);
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
    // const newAmount = currency.amount + depositAmount;
    // console.log(currency);
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

export default currenciesActions;
