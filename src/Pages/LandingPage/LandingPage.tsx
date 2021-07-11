import React from 'react'
import { useContext, useState } from "react";
import CurrencyCard from "../../components/CurrencyCard/CurrencyCard";
import { GlobalContext } from "../../context/provider";
import "./LandingPage.scss";
import ExchangeCurrencyDialog from "../../components/Dialogs/ExchangeCurrencyDialog/ExchangeCurrencyDialog";
import DepositCurrencyDialog from "../../components/Dialogs/DepositCurrencyDialog/DepositCurrencyDialog";
import FloatingMenu from "../../components/FloatingMenu/FloatingMenu";
import {
  TRANSACTION_HISTORY,
  ADD_NEW_CURRENCY,
  CHANGE_DEFAULT_CURRENCY,
} from "../../constants/generalConstants";
import AddCurrencyDialog from "../../components/Dialogs/AddCurrencyDialog/AddCurrencyDialog";
import SetDefaultCurrencyDialog from "../../components/Dialogs/SetDefaultCurrencyDialog/SetDefaultCurrencyDialog";
import TransactionHistoryDialog from "../../components/Dialogs/TransactionHistoryDialog/TransactionHistoryDialog";
import Currency from '../../interfaces/CurrencyInterfaces';



const LandingPage: React.FC = () => {
  const { currenciesState } = useContext(GlobalContext);

  const [isCurrencyExchangeDialogOpen, setIsCurrencyExchangeDialogOpen] =
    useState(false);
  const [isDepositCurrencyDialogOpen, setIsDepositCurrencyDialogOpen] =
    useState(false);
  const [isSetDefaultCurrencyDialogOpen, setIsSetDefaultCurrencyDialogOpen] =
    useState(false);
  const [isAddNewCurrencyDialogOpen, setIsAddNewCurrencyDialogOpen] =
    useState(false);
  const [isTransactionHistoryDialogOpen, setIsTransactionHistoryDialogOpen] =
    useState(false);

  const handleFloatingMenuClick = (clickedOption: String) => {
    switch (clickedOption) {
      case TRANSACTION_HISTORY:
        setIsTransactionHistoryDialogOpen(!isTransactionHistoryDialogOpen);

        break;
      case ADD_NEW_CURRENCY:
        setIsAddNewCurrencyDialogOpen(!isAddNewCurrencyDialogOpen);
        break;
      case CHANGE_DEFAULT_CURRENCY:
        setIsSetDefaultCurrencyDialogOpen(!isSetDefaultCurrencyDialogOpen);
        break;
      default:
        break;
    }
  };

  return (
    <div className="landing-page container mt-2">
      <ExchangeCurrencyDialog
        open={isCurrencyExchangeDialogOpen}
        onClose={() => {
          setIsCurrencyExchangeDialogOpen(false);
        }}
      ></ExchangeCurrencyDialog>
      <DepositCurrencyDialog
        open={isDepositCurrencyDialogOpen}
        onClose={() => {
          setIsDepositCurrencyDialogOpen(false);
        }}
      ></DepositCurrencyDialog>
      <AddCurrencyDialog
        open={isAddNewCurrencyDialogOpen}
        onClose={() => {
          setIsAddNewCurrencyDialogOpen(false);
        }}
      ></AddCurrencyDialog>
      <SetDefaultCurrencyDialog
        open={isSetDefaultCurrencyDialogOpen}
        onClose={() => {
          setIsSetDefaultCurrencyDialogOpen(false);
        }}
      ></SetDefaultCurrencyDialog>
      <TransactionHistoryDialog
        open={isTransactionHistoryDialogOpen}
        onClose={() => {
          setIsTransactionHistoryDialogOpen(false);
        }}
      ></TransactionHistoryDialog>

      <h1>Mobi Wallet</h1>
      <div className="profile">
        <h3>John Doe</h3>
        <div className="circle app-bg-accent"></div>
      </div>
      <div className="totalized">
        <p>Totalised value </p>
        <h1>USD 100000</h1>
      </div>
      <div className="currencies">
        {currenciesState?.currrencies.map((currency: Currency, i: number) => {
          return (
            <CurrencyCard
              key={i + "p"}
              currency={currency}
              onDepositClick={() => {
                setIsDepositCurrencyDialogOpen(true);
              }}
              onExchangeClick={() => {
                setIsCurrencyExchangeDialogOpen(true);
              }}
            ></CurrencyCard>
          );
        })}
      </div>
      <FloatingMenu
        currentlySelectedMenu={""}
        onMenuClick={handleFloatingMenuClick}
      ></FloatingMenu>
    </div>
  );
}

export default LandingPage

