import React, { useReducer } from "react";
import { fireEvent, render } from "@testing-library/react";
import TransactionHistoryDialog from "./TransactionHistoryDialog";
import { GlobalContext } from "../../../context/provider";
import { currenciesReducer } from "../../../context/reducers/currenciesReducer";
import { CurrenciesState } from "../../../interfaces/CurrencyInterfaces";

const TestContext = () => {
  const currenciesInitialState: CurrenciesState = {
    currencies: {
      EUR: { amount: 500, units: "EUR", exchangeRate: 1 },
    },
    defaultCurrency: { amount: 100, units: "USD", exchangeRate: 1.24 },
    transactionHistory: [
      {
        type: "DEPOSIT_TO_CURRENCY",
        details: {
          currency: { amount: 100, units: "USD", exchangeRate: 1.24 },
          depositAmount: 22,
        },
      },
      {
        type: "EXCHANGE_CURRENCY",
        details: {
          amountToExchange: 22,
          fromCurrency: { amount: 20, units: "UGX", exchangeRate: 4203.3 },
          toCurrency: { amount: 20, units: "UGX", exchangeRate: 4203.3 },
        },
      },
    ],
  };
  const [currenciesState, currenciesDispatch] = useReducer(
    currenciesReducer,
    currenciesInitialState
  );
  return (
    <GlobalContext.Provider value={{ currenciesState, currenciesDispatch }}>
      <TransactionHistoryDialog onClose={() => {}} open={true} />
    </GlobalContext.Provider>
  );
};

test("renders TransactionHistoryDialog", () => {
  const { getByTestId } = render(
    <TransactionHistoryDialog onClose={() => {}} open={true} />
  );
  const dialogTitle = getByTestId("dialog-title");

  expect(dialogTitle).toBeInTheDocument();
});
test("should display transactions", () => {
  const { getByTestId } = render(<TestContext />);
  const transaction = getByTestId("transaction");

  expect(transaction).toBeInTheDocument();
});

test("close ExchangeCurrencyDialog", () => {
  const { getByTestId } = render(
    <TransactionHistoryDialog onClose={() => {}} open={true} />
  );
  const closeBtn = getByTestId("close-btn");
  fireEvent.click(closeBtn);
});
