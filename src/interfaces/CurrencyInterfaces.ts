export interface CurrenciesState {
  currrencies: { [key: string]: Currency };
  // depositComplete?: boolean
}

export default interface Currency {
  units: string;
  amount: number;
}
