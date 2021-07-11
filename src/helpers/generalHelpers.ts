import Currency from "../interfaces/CurrencyInterfaces";

export const exchangeCurrency = (
  amountToExchange: number,
  fromCurrency: Currency,
  toCurrency: Currency
): number => {
  return (
    (amountToExchange / fromCurrency.exchangeRate) * toCurrency.exchangeRate
  );
};
