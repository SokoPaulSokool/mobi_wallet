import { CurrenciesState } from "../../interfaces/CurrencyInterfaces";

const currenciesInitialState: CurrenciesState = {
  currrencies: {
    EUR: { amount: 500, units: "EUR", exchangeRate: 1 },
    USD: { amount: 100, units: "USD", exchangeRate: 1.24 },
    CHF: { amount: 30, units: "CHF", exchangeRate: 1.09 },
    UGX: { amount: 20, units: "UGX", exchangeRate: 4203.3 },
    KES: { amount: 50, units: "KES", exchangeRate: 128.0 },
  },
  defaultCurrency: { amount: 100, units: "USD", exchangeRate: 1.24 },
};

export default currenciesInitialState;
