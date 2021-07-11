export interface CurrenciesState {
  currencies: { [key: string]: Currency };
  defaultCurrency: Currency;
}

export default interface Currency {
  units: string;
  amount: number;
  exchangeRate: number;
}
