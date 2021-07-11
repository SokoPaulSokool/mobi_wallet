export interface CurrenciesState {
  currrencies: { [key: string]: Currency };
  defaultCurrencyUnits: string;
}

export default interface Currency {
  units: string;
  amount: number;
  exchangeRate: number;
}
