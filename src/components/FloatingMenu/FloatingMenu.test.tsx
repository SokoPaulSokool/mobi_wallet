import React from "react";
import { render, screen } from "@testing-library/react";
import FloatingMenu from "./FloatingMenu";

test("renders LandingPage", () => {
  const { getByText } = render(
    <FloatingMenu currentlySelectedMenu={""} onMenuClick={() => {}} />
  );
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
