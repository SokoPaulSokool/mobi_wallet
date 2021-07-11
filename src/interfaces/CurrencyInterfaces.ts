export interface CurrenciesState {
  currrencies: { [key: string]: Currency };
}

export default interface Currency {
  units: string;
  amount: string;
}
