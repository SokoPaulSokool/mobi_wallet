import Currency from "../interfaces/CurrencyInterfaces";
import { depositCurrency } from "../context/actions/currenciesActions";

export const exchangeCurrency = (
  amountToExchange: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number => {
  return (
    (amountToExchange / fromCurrency.exchangeRate) * toCurrency.exchangeRate
  );
};
export const calculateTotalisedAmount = (
  currencies: Currency[],
  depositCurrency: Currency
): number => {
  let totalalisedAmount = 0;
  currencies.forEach((currency) => {
    totalalisedAmount =
      totalalisedAmount +
      exchangeCurrency(currency.amount, currency, depositCurrency);
  });

  return totalalisedAmount;
};

export const roundNumber = (num: number, n: number): number => {
  return parseFloat((Math.round(num * 100) / 100).toFixed(n));
};
