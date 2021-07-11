import { CurrenciesState } from "../../interfaces/CurrencyInterfaces";
import { DEPOSIT_TO_CURRENCY } from "../actions/types";

const currenciesReducer = (state: CurrenciesState, { type, payload }: any) => {
  switch (type) {
    case DEPOSIT_TO_CURRENCY:
      console.log(payload);
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

    default:
      return state;
  }
};

export default currenciesReducer;
