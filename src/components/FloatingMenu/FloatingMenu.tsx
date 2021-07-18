import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from "@material-ui/icons/FilterList";
import "./FloatingMenu.scss";
import {
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
      <div
      data-testid="menu-items"
        className={
          isMenuOpen
            ? "menu-items menu-items__show"
            : "menu-items menu-items__hide"
        }
      >
        {menuItems.map((item, i) => {
          return (
            <div
              key={i + "k"}
              data-testid={"floating-menu-list-item-" + i}
              className="item-details circle my-3"
              onClick={() => {
                onMenuClick(item);
              }}
            >
              {i === 0 && <FilterListIcon />}
              {i === 1 && <AddIcon />}
              <div className="item-name">{item}</div>
            </div>
          );
        })}
      </div>

      <div
        className="circle menu-toggle"
        data-testid="floating-menu-list-toggle"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <CloseIcon />
      </div>
    </div>
  );
};

export default FloatingMenu;
