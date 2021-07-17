export interface CurrenciesState {
  currencies: { [key: string]: Currency };
  defaultCurrency: Currency;
  transactionHistory: Transaction[];
}
export interface Transaction {
  type: string;
  details: ExchangeTransaction | DepositTransaction;
}export interface DepositTransaction {
  currency: Currency;
  depositAmount: number;
}
export interface ExchangeTransaction {
  amountToExchange: number;
  fromCurrency: Currency;
  toCurrency: Currency;
}

export default interface Currency {
  units: string;
  amount: number;
  exchangeRate: number;
}
