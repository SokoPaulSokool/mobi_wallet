import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AppButton from "./AppButton";

test("renders AppButton", () => {
  const { getByTestId } = render(<AppButton text="click" onClick={() => {}} />);
  const appButton = getByTestId("app-button");
  expect(appButton).toBeInTheDocument();
  expect(appButton.textContent).toBe("click");
});
test("AppButton should be clickable", () => {
  let clickValue = "";
  const { getByTestId } = render(
    <AppButton
      text="click"
      onClick={() => {
        clickValue = "clicked";
      }}
    />
  );
  const appButton = getByTestId("app-button");
  fireEvent.click(appButton, { target: {} });
  expect(clickValue).toBe("clicked");  

});
