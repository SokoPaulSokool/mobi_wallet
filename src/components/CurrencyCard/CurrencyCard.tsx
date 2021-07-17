import React from "react";
import AppButton from "../common/AppButton/AppButton";
import "./CurrencyCard.scss";
import Currency from "../../interfaces/CurrencyInterfaces";
import { roundNumber } from "../../helpers/generalHelpers";
interface CurrencyCardProps {
  currency: Currency;
  onDepositClick: Function;
  onExchangeClick: Function;
}
const CurrencyCard: React.FC<CurrencyCardProps> = ({
  currency,
  onDepositClick,
  onExchangeClick,
}) => {
  return (
    <div className="currency-card  app-clr-white">
      <div className="close-btn"></div>
      <div className="metal-plate app-bg-accent">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="details">
        <div data-testid="labels" className="labels">
          <p className="">Currency:</p>
          <h3 className="">Balance:</h3>
        </div>
        <div className="values">
          <p data-testid="card-units" className="">
            {currency?.units}
          </p>
          <h3 data-testid="card-amount" className="">
            {roundNumber(currency?.amount)}
          </h3>
        </div>
      </div>
      <div data-testid="card-buttons" className="buttons">
        <AppButton
          text="Deposit"
          className="app-bg-white app-clr-accent"
          onClick={() => {
            onDepositClick();
          }}
        ></AppButton>
        <AppButton
          data-testid="exchange-btn"
          text="Exchange"
          className="app-bg-white app-clr-black"
          onClick={() => {
            onExchangeClick();
          }}
        ></AppButton>
      </div>
    </div>
  );
};

export default CurrencyCard;
