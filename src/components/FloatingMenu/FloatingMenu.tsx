import React, { useState } from "react";
import "./FloatingMenu.scss";
import {
  CHANGE_DEFAULT_CURRENCY,
  ADD_NEW_CURRENCY,
  TRANSACTION_HISTORY,
} from "../../constants/generalConstants";

interface FloatingMenuProps {
  onMenuClick: Function;
  currentlySelectedMenu: String;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({
  onMenuClick,
  currentlySelectedMenu,
}) => {
  const menuItems = [TRANSACTION_HISTORY, ADD_NEW_CURRENCY];

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  return (
    <div data-testid="floating-menu-list" className="floating-menu">
      {isMenuOpen && (
        <div className="menu-items">
          {menuItems.map((item, i) => {
            return (
              <div
                key={i + "k"}
                data-testid={"floating-menu-list-item-"+i}
                className="item"
                onClick={() => {
                  onMenuClick(item);
                }}
              >
                <p>{item}</p>
                <div className="circle"></div>
              </div>
            );
          })}
        </div>
      )}

      <div
        className="circle menu-toggle"
        data-testid="floating-menu-list-toggle"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      ></div>
    </div>
  );
};

export default FloatingMenu;
