export interface CurrenciesState {
  currrencies: Currency[];
}

export default interface Currency {
  units: string;
  amount: string;
}
