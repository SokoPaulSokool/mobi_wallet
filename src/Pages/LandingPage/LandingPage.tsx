import React, { useEffect } from "react";
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
import Currency from "../../interfaces/CurrencyInterfaces";
import {
  calculateTotalisedAmount,
  roundNumber,
} from "../../helpers/generalHelpers";

const LandingPage: React.FC = () => {
  const { currenciesState } = useContext(GlobalContext);
  const [currencyList, setCurrencyList] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<
    Currency | undefined
  >(undefined);

  const [totalisedAmount, setTotalisedAmount] = useState<number | null>(null);

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

  useEffect(() => {
    if (currenciesState?.currrencies) {
      const currencies = Object.values(currenciesState?.currrencies).map(
        (currency) => currency
      );
      setCurrencyList(currencies);
    }
    return () => {};
  }, [currenciesState]);

  const updateTotalisedAmount = () => {
    if (currenciesState?.defaultCurrency && currencyList) {
      const total = roundNumber(
        calculateTotalisedAmount(currencyList, currenciesState?.defaultCurrency)
      );
      setTotalisedAmount(total);
    }
  };

  useEffect(() => {
    if (currenciesState?.defaultCurrency) {
      updateTotalisedAmount();
    }
    return () => {};
  }, [currenciesState?.defaultCurrency, currencyList]);

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
        selectedValue={selectedCurrency}
        currencies={currencyList}
        onClose={() => {
          setIsCurrencyExchangeDialogOpen(false);
        }}
      ></ExchangeCurrencyDialog>
      <DepositCurrencyDialog
        open={isDepositCurrencyDialogOpen}
        selectedValue={selectedCurrency}
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
        currencies={currencyList}
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
        <h1>
          {currenciesState?.defaultCurrency.units} {totalisedAmount}
        </h1>
      </div>
      <div className="currencies">
        {currencyList.map((currency: Currency, i: number) => {
          return (
            <CurrencyCard
              key={i + "p"}
              currency={currency}
              onDepositClick={() => {
                setIsDepositCurrencyDialogOpen(true);
                setSelectedCurrency(currency);
              }}
              onExchangeClick={() => {
                setIsCurrencyExchangeDialogOpen(true);
                setSelectedCurrency(currency);
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
};

export default LandingPage;
