import { CurrenciesState } from "../../interfaces/CurrencyInterfaces";
import { DEPOSIT_TO_CURRENCY, EXCHANGE_CURRENCY } from "../actions/types";

const currenciesReducer = (state: CurrenciesState, { type, payload }: any) => {
  switch (type) {
    case DEPOSIT_TO_CURRENCY:
      return {
        ...state,
        currrencies: {
          ...state.currrencies,
          [payload.currencyUnits]: {
            ...state.currrencies[payload.currencyUnits],
            amount: payload.newAmount,
          },
        },
      };
    case EXCHANGE_CURRENCY:
      return {
        ...state,
        currrencies: {
          ...state.currrencies,
          [payload.fromCurrency.units]: {
            ...state.currrencies[payload.fromCurrency.units],
            amount: payload.fromCurrency.amount,
          },
          [payload.toCurrency.units]: {
            ...state.currrencies[payload.toCurrency.units],
            amount: payload.toCurrency.amount,
          },
        },
      };

    default:
      return state;
  }
};

export default currenciesReducer;
