import { CurrenciesState } from "../../interfaces/CurrencyInterfaces";
// const currenciesInitialState: CurrenciesState = {
//   currrencies:{
//     USD:{ amount: "100", units: "USD" },
//     EUR:{ amount: "500", units: "EUR" },
//     CHF:{ amount: "10000", units: "CHF" },
//   }
// };

const currenciesReducer = (
  state: CurrenciesState ,
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
