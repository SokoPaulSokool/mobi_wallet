import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ExchangeCurrencyDialog from "./ExchangeCurrencyDialog";
jest.mock("../../../context/actions/currenciesActions");
import { currencyExchange } from "../../../context/actions/currenciesActions";

test("renders ExchangeCurrencyDialog", () => {
  const { getByTestId } = render(
    <ExchangeCurrencyDialog onClose={() => {}} open={true} />
  );
  const dialogTitle = getByTestId("dialog-title");
  expect(dialogTitle).toBeInTheDocument();
});

test("ExchangeCurrencyDialog input change", async () => {
  const { getByTestId } = render(
    <ExchangeCurrencyDialog
      onClose={() => {}}
      open={true}
      currencies={[
        { amount: 1, exchangeRate: 1, units: "USD" },
        { amount: 1, exchangeRate: 1, units: "EURO" },
      ]}
      selectedValue={{ amount: 2, exchangeRate: 2, units: "KPP" }}
    />
  );
  const exchangeAmount = getByTestId("exchange-amount").querySelector("input");
  if (exchangeAmount) {
    fireEvent.change(exchangeAmount, { target: { value: "8" } });
    fireEvent.change(exchangeAmount, { target: { value: "8" } });
  }

  await waitFor(() => {
    expect(exchangeAmount.value).toBe("8");
  });

  const autocomplete = getByTestId("exchange-currency");
  const exchangeCurrency = autocomplete.querySelector("input");
  autocomplete.focus();
  if (exchangeCurrency) {
    await fireEvent.change(exchangeCurrency, { target: { value: "U" } });
    await fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    await fireEvent.keyDown(autocomplete, { key: "Enter" });
  }
  await waitFor(() => {
    expect(exchangeCurrency.value).toBe("USD");
  });

  expect(exchangeAmount).toBeInTheDocument();
});

test("ExchangeCurrencyDialog form submit", async () => {
  currencyExchange.mockImplementation(() => () => {});

  const { getByTestId } = render(
    <ExchangeCurrencyDialog
      onClose={() => {}}
      open={true}
      currencies={[
        { amount: 1, exchangeRate: 1, units: "USD" },
        { amount: 1, exchangeRate: 1, units: "EURO" },
      ]}
      selectedValue={{ amount: 1, exchangeRate: 1, units: "KPP" }}
    />
  );

  const exchangeAmount = getByTestId("exchange-amount").querySelector("input");
  if (exchangeAmount) {
    fireEvent.change(exchangeAmount, { target: { value: "9" } });
  }
  await waitFor(() => {
    expect(exchangeAmount.value).toBe("9");
  });

  const autocomplete = getByTestId("exchange-currency");
  const exchangeCurrency = autocomplete.querySelector("input");
  autocomplete.focus();
  if (exchangeCurrency) {
    await fireEvent.change(exchangeCurrency, { target: { value: "U" } });
    await fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    await fireEvent.keyDown(autocomplete, { key: "Enter" });
  }
  await waitFor(() => {
    expect(exchangeCurrency.value).toBe("USD");
  });

  const submitBtn = getByTestId("submit-form").querySelector("button");

  if (submitBtn) {
    fireEvent.submit(submitBtn, {
      preventDefault: () => {},
    });
  }
  expect(submitBtn).toBeInTheDocument();
  expect(currencyExchange).toHaveBeenCalled();
});
