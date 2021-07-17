import Currency, {
  DepositTransaction,
  ExchangeTransaction,
  Transaction,
} from "../../interfaces/CurrencyInterfaces";
import {
  ADD_CURRENCY,
  ADD_TRANSACTION_HISTORY,
  DEPOSIT_TO_CURRENCY,
  EXCHANGE_CURRENCY,
} from "./types";
import { exchangeCurrency } from "../../helpers/generalHelpers";
import { CHANGE_DEFAULT_CURRENCY } from "../../constants/generalConstants";

const transactionHistoryAction =
  (transaction: Transaction) => (dispatch: any) => {
    dispatch({
      type: ADD_TRANSACTION_HISTORY,
      payload: { transaction },
    });
  };
export const depositCurrency =
  (currency: Currency, depositAmount: number) => (dispatch: any) => {
    const newAmount = currency.amount + depositAmount;
    dispatch({
      type: DEPOSIT_TO_CURRENCY,
      payload: { currencyUnits: currency.units, newAmount },
    });
    const depositTransation: DepositTransaction = {
      currency,
      depositAmount,
    };
    const transaction: Transaction = {
      type: DEPOSIT_TO_CURRENCY,
      details: depositTransation,
    };
    transactionHistoryAction(transaction)(dispatch);
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
    const exchangeCurrencyTransation: ExchangeTransaction = {
      amountToExchange,
      fromCurrency,
      toCurrency,
    };
    const transaction: Transaction = {
      type: EXCHANGE_CURRENCY,
      details: exchangeCurrencyTransation,
    };
    transactionHistoryAction(transaction)(dispatch);
  };

export const changeDefaultCurrency =
  (defaultCurrency: Currency) => (dispatch: any) => {
    dispatch({
      type: CHANGE_DEFAULT_CURRENCY,
      payload: { defaultCurrency },
    });
  };

export const addCurrency = (newCurrency: Currency) => (dispatch: any) => {
  dispatch({
    type: ADD_CURRENCY,
    payload: { newCurrency },
  });
};
