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
    <div className="floating-menu">
      {isMenuOpen && (
        <div className="menu-items">
          {menuItems.map((item, i) => {
            return (
              <div
                key={i + "k"}
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
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      ></div>
    </div>
  );
};

export default FloatingMenu;
