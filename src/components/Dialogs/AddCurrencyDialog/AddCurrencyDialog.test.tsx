import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddCurrencyDialog from "./AddCurrencyDialog";
jest.mock("../../../context/actions/currenciesActions");
import { addCurrency } from "../../../context/actions/currenciesActions";
test("renders AddCurrencyDialog", () => {
  const { getByTestId } = render(
    <AddCurrencyDialog onClose={() => {}} open={true} />
  );
  const dialogTitle = getByTestId("dialog-title");
  expect(dialogTitle).toBeInTheDocument();
});
test("close AddCurrencyDialog", () => {
  const { getByTestId } = render(
    <AddCurrencyDialog onClose={() => {}} open={true} />
  );
  const closeBtn = getByTestId("close-btn");
  fireEvent.click(closeBtn);
});
test("AddCurrencyDialog units change", () => {
  const { getByTestId } = render(
    <AddCurrencyDialog onClose={() => {}} open={true} />
  );
  const currencyUnits = getByTestId("currency-units").querySelector("input");
  if (currencyUnits) {
    fireEvent.change(currencyUnits, { target: { value: "data" } });
  }
  expect(currencyUnits).toBeInTheDocument();
  expect(currencyUnits?.value).toBe("DATA");
  if (currencyUnits) {
    fireEvent.change(currencyUnits, { target: { value: "" } });
  }
  expect(currencyUnits).toBeInTheDocument();
  expect(currencyUnits?.value).toBe("");
});

test("AddCurrencyDialog currency exchange rate change", () => {
  const { getByTestId } = render(
    <AddCurrencyDialog onClose={() => {}} open={true} />
  );
  const currencyExchangeRate = getByTestId(
    "currency-exchange-rate"
  ).querySelector("input");
  if (currencyExchangeRate) {
    fireEvent.change(currencyExchangeRate, { target: { value: "8" } });
  }
  expect(currencyExchangeRate).toBeInTheDocument();
  expect(currencyExchangeRate?.value).toBe("8");
});
test("AddCurrencyDialog currency exchange rate change should accept only number", () => {
  const { getByTestId } = render(
    <AddCurrencyDialog onClose={() => {}} open={true} />
  );
  const currencyExchangeRate = getByTestId(
    "currency-exchange-rate"
  ).querySelector("input");

  if (currencyExchangeRate) {
    fireEvent.change(currencyExchangeRate, { target: { value: "ee" } });
  }
  expect(currencyExchangeRate).toBeInTheDocument();

  expect(currencyExchangeRate?.value).toBe("0");
});
test("AddCurrencyDialog form submit", () => {
  addCurrency.mockImplementation(() => () => {});

  const { getByTestId } = render(
    <AddCurrencyDialog
      onClose={() => {}}
      open={true}
      currencies={[{ amount: 2, exchangeRate: 2, units: "USD" }]}
    />
  );
  const currencyExchangeRate = getByTestId(
    "currency-exchange-rate"
  ).querySelector("input");
  if (currencyExchangeRate) {
    fireEvent.change(currencyExchangeRate, { target: { value: "1" } });
  }

  const currencyUnits = getByTestId("currency-units").querySelector("input");
  if (currencyUnits) {
    fireEvent.change(currencyUnits, { target: { value: "usdd" } });
  }

  const submitBtn = getByTestId("submit-form").querySelector("button");

  if (submitBtn) {
    fireEvent.submit(submitBtn, {
      preventDefault: () => {},
    });
  }
  expect(submitBtn).toBeInTheDocument();
  expect(addCurrency).toHaveBeenCalled();
});

test("AddCurrencyDialog form submit existing currency", () => {
  const { getByTestId } = render(
    <AddCurrencyDialog
      onClose={() => {}}
      open={true}
      currencies={[{ amount: 2, exchangeRate: 2, units: "USD" }]}
    />
  );
  const currencyExchangeRate = getByTestId(
    "currency-exchange-rate"
  ).querySelector("input");
  if (currencyExchangeRate) {
    fireEvent.change(currencyExchangeRate, { target: { value: "1" } });
  }

  const currencyUnits = getByTestId("currency-units").querySelector("input");
  if (currencyUnits) {
    fireEvent.change(currencyUnits, { target: { value: "usd" } });
  }

  const submitBtn = getByTestId("submit-form").querySelector("button");

  if (submitBtn) {
    fireEvent.submit(submitBtn, {
      preventDefault: () => {},
    });
  }
  expect(submitBtn).toBeInTheDocument();
});
