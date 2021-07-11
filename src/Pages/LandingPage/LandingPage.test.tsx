import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPage from "./LandingPage";

test("renders LandingPage", () => {
  const { getByText } = render(<LandingPage />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
