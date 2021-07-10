import { CurrenciesState } from "../../interfaces/Currencies";
const currenciesInitialState: CurrenciesState = {
  currrencies: [
    { amount: "100", units: "USD" },
    { amount: "500", units: "EUR" },
    { amount: "10000", units: "CHF" },
  ],
};

const currenciesReducer = (
  state: CurrenciesState = currenciesInitialState,
  { type, payload }: any
) => {
  switch (type) {
    // case typeName:
    //     return { ...state, ...payload }

    default:
      return state;
  }
};

export default currenciesReducer;
