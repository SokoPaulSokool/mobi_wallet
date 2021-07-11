import React from "react";
import Currency from "../../interfaces/CurrencyInterfaces";
import {
  currencyExchange,
  depositCurrency,
  changeDefaultCurrency,
  addCurrency,
} from "./currenciesActions";

const currency: Currency = { amount: 50, units: "KES", exchangeRate: 128.0 };
const dispatch = () => {};

test("currenciesActions", () => {
  const res = depositCurrency(currency, 1000)(dispatch);
});

test("currencyExchange", () => {
  const res = currencyExchange(1000, currency, currency)(dispatch);
});

test("changeDefaultCurrency", () => {
  const res = changeDefaultCurrency(currency)(dispatch);
});

test("addCurrency", () => {
  const res = addCurrency(currency)(dispatch);
});
