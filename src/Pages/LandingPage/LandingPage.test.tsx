import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LandingPage from "./LandingPage";
import GlobalProvider from "../../context/provider";

test("renders LandingPage", () => {
  const { getByTestId } = render(<LandingPage />);
  const appNameElement = getByTestId("app-name");
  const totalisedValueLabel = getByTestId("totallised-value-label");
  const totalisedValueDetails = getByTestId("totallised-value-details");

  expect(appNameElement).toBeInTheDocument();
  expect(totalisedValueLabel).toBeInTheDocument();
  expect(totalisedValueDetails).toBeInTheDocument();
});
test("should have expected text", () => {
  const { getByTestId } = render(<LandingPage />);
  const appNameElement = getByTestId("app-name");
  const totalisedValueLabel = getByTestId("totallised-value-label");
  const userName = getByTestId("user-name");

  expect(appNameElement.textContent).toBe("Mobi Wallet");
  expect(totalisedValueLabel.textContent).toBe("Totalised value");
  expect(userName.textContent).toBe("John Doe");
});

test("should change default currency", async () => {
  const { getByTestId } = render(
    <GlobalProvider>
      <LandingPage />
    </GlobalProvider>
  );

  const autocomplete = getByTestId("default-currency");
  const defaultCurrency = autocomplete.querySelector("input");
  autocomplete.focus();
  if (defaultCurrency) {
    await fireEvent.change(defaultCurrency, { target: { value: "us" } });
    await fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    await fireEvent.keyDown(autocomplete, { key: "Enter" });
  }

  expect(defaultCurrency.value).toBe("USD");
});

test("currency-card button handle deposit and exchange", async () => {
  const { getByTestId } = render(
    <GlobalProvider>
      <LandingPage />
    </GlobalProvider>
  );

  const card = getByTestId("currency-cards");
  const cardButtons = card.querySelectorAll("button");

  if (cardButtons) {
    fireEvent.click(cardButtons[0]);
    fireEvent.click(cardButtons[1]);
  }
});

test("floating menu", async () => {
  const { getByTestId, asFragment } = render(
    <GlobalProvider>
      <LandingPage />
    </GlobalProvider>
  );

  const landingPage = getByTestId("landing-page");
  const transactionHistory = landingPage
    .getElementsByClassName("floating-menu")
    .item(0)
    ?.getElementsByClassName("item-details")
    .item(0);
  const addNewCurrency = landingPage
    .getElementsByClassName("floating-menu")
    .item(0)
    ?.getElementsByClassName("item-details")
    .item(1);

  if (transactionHistory) {
    fireEvent.click(transactionHistory);
  }
  if (addNewCurrency) {
    fireEvent.click(addNewCurrency);
  }
});
