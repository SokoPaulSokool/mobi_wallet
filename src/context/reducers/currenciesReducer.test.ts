import React from "react";
import { currenciesReducer } from "./currenciesReducer";
import currenciesInitialState from "../initialStates/currenciesInitialState";
import {
  ADD_CURRENCY,
  DEPOSIT_TO_CURRENCY,
  EXCHANGE_CURRENCY,
} from "../actions/types";
import { CHANGE_DEFAULT_CURRENCY } from "../../constants/generalConstants";

test("currenciesReducer DEPOSIT_TO_CURRENCY", () => {
  const state = currenciesReducer(currenciesInitialState, {
    type: DEPOSIT_TO_CURRENCY,
    payload: { currencyUnits: "USD", newAmount: 100 },
  });
  expect(state.currencies["USD"].amount).toBe(100);
});

test("currenciesReducer EXCHANGE_CURRENCY", () => {
  const state = currenciesReducer(currenciesInitialState, {
    type: EXCHANGE_CURRENCY,
    payload: {
      fromCurrency: { units: "USD", amount: 10 },
      toCurrency: { units: "EURO", amount: 10 },
    },
  });
  expect(state.currencies["USD"].amount).toBe(10);
  expect(state.currencies["EURO"].amount).toBe(10);
});

test("currenciesReducer CHANGE_DEFAULT_CURRENCY", () => {
  const state = currenciesReducer(currenciesInitialState, {
    type: CHANGE_DEFAULT_CURRENCY,
    payload: { defaultCurrency: { units: "EURO", amount: 100 } },
  });
  expect(state.defaultCurrency.units).toBe("EURO");
});

test("currenciesReducer ADD_CURRENCY", () => {
  const state = currenciesReducer(currenciesInitialState, {
    type: ADD_CURRENCY,
    payload: { newCurrency: { units: "aa", amount: 100 } },
  });
  expect(state.currencies["aa"].amount).toBe(100);
});

test("currenciesReducer no type", () => {
  const state = currenciesReducer(currenciesInitialState, {});
  expect(state.defaultCurrency.units).toBe("USD");
});
