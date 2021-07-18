import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DepositCurrencyDialog from "./DepositCurrencyDialog";
jest.mock("../../../context/actions/currenciesActions");
import { depositCurrency } from "../../../context/actions/currenciesActions";

test("renders DepositCurrencyDialog", () => {
  const { getByTestId } = render(
    <DepositCurrencyDialog
      onClose={() => {}}
      open={true}
      selectedValue={{ amount: 2, exchangeRate: 2, units: "USD" }}
    />
  );
  const dialogTitle = getByTestId("dialog-title");
  expect(dialogTitle).toBeInTheDocument();
});
test("close DepositCurrencyDialog", () => {
  const { getByTestId } = render(
    <DepositCurrencyDialog onClose={() => {}} open={true} />
  );
  const closeBtn = getByTestId("close-btn");
  fireEvent.click(closeBtn);
});

test("DepositCurrencyDialog currency exchange rate change", () => {
  const { getByTestId } = render(
    <DepositCurrencyDialog
      onClose={() => {}}
      open={true}
      selectedValue={{ amount: 2, exchangeRate: 2, units: "USD" }}
    />
  );
  const depositAmount = getByTestId("deposit-amount").querySelector("input");
  if (depositAmount) {
    fireEvent.change(depositAmount, { target: { value: "8" } });
  }
  expect(depositAmount).toBeInTheDocument();
  expect(depositAmount?.value).toBe("8");
});

test("DepositCurrencyDialog currency exchange rate change wrong amount", () => {
  const { getByTestId } = render(
    <DepositCurrencyDialog
      onClose={() => {}}
      open={true}
      selectedValue={{ amount: 2, exchangeRate: 2, units: "USD" }}
    />
  );
  const depositAmount = getByTestId("deposit-amount").querySelector("input");
  if (depositAmount) {
    fireEvent.change(depositAmount, { target: { value: "pp" } });
  }
  expect(depositAmount).toBeInTheDocument();
  expect(depositAmount?.value).toBe("0");
});

test("DepositCurrencyDialog form submit", () => {
  depositCurrency.mockImplementation(() => () => {});
  const { getByTestId } = render(
    <DepositCurrencyDialog
      onClose={() => {}}
      open={true}
      selectedValue={{ amount: 2, exchangeRate: 2, units: "USD" }}
    />
  );
  const depositAmount = getByTestId("deposit-amount").querySelector("input");
  if (depositAmount) {
    fireEvent.change(depositAmount, { target: { value: "20" } });
  }

  const submitBtn = getByTestId("submit-form").querySelector("button");

  if (submitBtn) {
    fireEvent.submit(submitBtn, {
      preventDefault: () => {},
    });
  }
  expect(submitBtn).toBeInTheDocument();
  expect(depositCurrency).toHaveBeenCalled();
});
test("DepositCurrencyDialog form submit zero amount", () => {
  depositCurrency.mockImplementation(() => () => {});
  const { getByTestId } = render(
    <DepositCurrencyDialog
      onClose={() => {}}
      open={true}
      selectedValue={{ amount: 2, exchangeRate: 2, units: "USD" }}
    />
  );
  const depositAmount = getByTestId("deposit-amount").querySelector("input");
  if (depositAmount) {
    fireEvent.change(depositAmount, { target: { value: "0" } });
  }

  const submitBtn = getByTestId("submit-form").querySelector("button");

  if (submitBtn) {
    fireEvent.submit(submitBtn, {
      preventDefault: () => {},
    });
  }
  expect(submitBtn).toBeInTheDocument();
  expect(depositCurrency).not.toHaveBeenCalled();
});
