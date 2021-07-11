import React from "react";
import AppButton from "../common/AppButton/AppButton";
import "./CurrencyCard.scss";
import Currency from "../../interfaces/CurrencyInterfaces";
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
    <div className="currency-card app-bg-primary app-clr-white">
      <div className="close-btn">Close</div>
      <div className="metal-plate app-bg-accent">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="details">
        <div className="labels">
          <p className="">Currency:</p>
          <h3 className="">Balance:</h3>
        </div>
        <div className="values">
          <p className="">{currency?.units}</p>
          <h3 className="">{currency?.amount}</h3>
        </div>
      </div>
      <div className="buttons">
        <AppButton
          text="Deposit"
          className="app-bg-white app-clr-accent"
          onClick={() => {
            onDepositClick();
          }}
        ></AppButton>
        <AppButton
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
