import { CurrenciesState } from "../../interfaces/CurrencyInterfaces";

const currenciesInitialState: CurrenciesState = {
  currrencies: {
    EUR: { amount: 500, units: "EUR", exchangeRate: 1 },
    USD: { amount: 100, units: "USD", exchangeRate: 1.24 },
    CHF: { amount: 10000, units: "CHF", exchangeRate: 1.09},
    UGX: { amount: 200, units: "UGX", exchangeRate: 4203.30 },
    KES: { amount: 5000, units: "KES", exchangeRate: 128.00},
  },
  defaultCurrencyUnits: "USD",
};

export default currenciesInitialState;
