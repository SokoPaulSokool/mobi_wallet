import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import CurrencyCard from "./CurrencyCard";

test("renders CurrencyCard", () => {
  const { getByTestId } = render(
    <CurrencyCard
      currency={{ amount: 0, units: "", exchangeRate: 8 }}
      onDepositClick={() => {}}
      onExchangeClick={() => {}}
    />
  );
  const linkElement = getByTestId("labels");
  expect(linkElement).toBeInTheDocument();
});

test("CurrencyCard should set the right amount and units", () => {
  const { getByTestId } = render(
    <CurrencyCard
      currency={{ amount: 0, units: "USD", exchangeRate: 8 }}
      onDepositClick={() => {}}
      onExchangeClick={() => {}}
    />
  );
  const cardUnits = getByTestId("card-units");
  const cardAmount = getByTestId("card-amount");
  expect(cardUnits).toBeInTheDocument();
  expect(cardUnits.textContent).toBe("USD");
  expect(cardAmount).toBeInTheDocument();
  expect(cardAmount.textContent).toBe("0");
});

test("CurrencyCard button clicks", () => {
  let depositClick = "";
  let exchangeClick = "";
  const { getByTestId } = render(
    <CurrencyCard
      currency={{ amount: 0, units: "USD", exchangeRate: 8 }}
      onDepositClick={() => {
        depositClick = "depositClick";
      }}
      onExchangeClick={() => {
        exchangeClick = "exchangeClick";
      }}
    />
  );
  const exchangeBtn = getByTestId("card-buttons").querySelectorAll("button");
  if (exchangeBtn) {
    fireEvent.click(exchangeBtn[0]);
    fireEvent.click(exchangeBtn[1]);
  }
  expect(depositClick).toBe("depositClick");
  expect(exchangeClick).toBe("exchangeClick");
});
