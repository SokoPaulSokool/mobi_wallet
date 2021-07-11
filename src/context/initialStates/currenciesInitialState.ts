import { CurrenciesState } from "../../interfaces/CurrencyInterfaces";

const currenciesInitialState: CurrenciesState = {
  currrencies: {
    USD: { amount: 100, units: "USD" },
    EUR: { amount: 500, units: "EUR" },
    CHF: { amount: 10000, units: "CHF" },
    UGX: { amount: 200, units: "UGX" },
    KES: { amount: 5000, units: "KES" },
  },
};

export default currenciesInitialState;
