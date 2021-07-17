import { CurrenciesState } from "../../interfaces/CurrencyInterfaces";
import {
  ADD_CURRENCY,
  ADD_TRANSACTION_HISTORY,
  DEPOSIT_TO_CURRENCY,
  EXCHANGE_CURRENCY,
} from "../actions/types";
import { CHANGE_DEFAULT_CURRENCY } from "../../constants/generalConstants";

export const currenciesReducer = (
  state: CurrenciesState,
  { type, payload }: any
) => {
  switch (type) {
    case DEPOSIT_TO_CURRENCY:
      return {
        ...state,
        currencies: {
          ...state.currencies,
          [payload.currencyUnits]: {
            ...state.currencies[payload.currencyUnits],
            amount: payload.newAmount,
          },
        },
      };
    case EXCHANGE_CURRENCY:
      return {
        ...state,
        currencies: {
          ...state.currencies,
          [payload.fromCurrency.units]: {
            ...state.currencies[payload.fromCurrency.units],
            amount: payload.fromCurrency.amount,
          },
          [payload.toCurrency.units]: {
            ...state.currencies[payload.toCurrency.units],
            amount: payload.toCurrency.amount,
          },
        },
      };
    case CHANGE_DEFAULT_CURRENCY:
      return {
        ...state,
        defaultCurrency: payload.defaultCurrency,
      };
    case ADD_CURRENCY:
      return {
        ...state,
        currencies: {
          ...state.currencies,
          [payload.newCurrency.units]: payload.newCurrency,
        },
      };
    case ADD_TRANSACTION_HISTORY:
      return {
        ...state,
        transactionHistory: [
          ...state.transactionHistory,payload.transaction,
        ],
      };

    default:
      return state;
  }
};

export default currenciesReducer;
