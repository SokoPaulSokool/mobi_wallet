import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FloatingMenu from "./FloatingMenu";

test("renders FloatingMenu", () => {
  const { getByTestId } = render(
    <FloatingMenu currentlySelectedMenu={""} onMenuClick={() => {}} />
  );
  const linkElement = getByTestId("floating-menu-list");
  expect(linkElement).toBeInTheDocument();
});
test("should listen to FloatingMenu item click events", () => {
  let itemClicked = "";
  const { getByTestId } = render(
    <FloatingMenu
      currentlySelectedMenu={""}
      onMenuClick={() => {
        itemClicked = "itemClicked";
      }}
    />
  );

  const linkElement = getByTestId("floating-menu-list-item-0");
  fireEvent.click(linkElement, {});
  expect(itemClicked).toBe("itemClicked");
});
test("FloatingMenu should have two items in the menu", () => {
  const { getByTestId } = render(
    <FloatingMenu currentlySelectedMenu={""} onMenuClick={() => {}} />
  );

  const menuItem1 = getByTestId("floating-menu-list-item-0");
  const menuItem2 = getByTestId("floating-menu-list-item-1");
  let menuItem3: any = "not set";
  expect(menuItem3).toBe("not set");
  try {
    menuItem3 = getByTestId("floating-menu-list-item-2");
  } catch (error) {
    menuItem3 = "error";
  }

  expect(menuItem1).toBeInTheDocument();
  expect(menuItem2).toBeInTheDocument();
  expect(menuItem3).toBe("error");
});
test("FloatingMenu toggle button should hide menu", () => {
  const { getByTestId } = render(
    <FloatingMenu currentlySelectedMenu={""} onMenuClick={() => {}} />
  );

  const toggleButton = getByTestId("floating-menu-list-toggle");
  fireEvent.click(toggleButton, {});

  const menuItems = getByTestId("menu-items");
  menuItems.classList;
  const classes = menuItems.classList.value.split(" ");

  expect(classes[1]).toBe("menu-items__hide");
});
