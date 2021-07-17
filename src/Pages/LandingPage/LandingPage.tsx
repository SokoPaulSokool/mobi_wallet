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
import TransactionHistoryDialog from "../../components/Dialogs/TransactionHistoryDialog/TransactionHistoryDialog";
import Currency from "../../interfaces/CurrencyInterfaces";
import {
  calculateTotalisedAmount,
  roundNumber,
} from "../../helpers/generalHelpers";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { changeDefaultCurrency } from "../../context/actions/currenciesActions";

const LandingPage: React.FC = () => {
  const { currenciesState, currenciesDispatch } = useContext(GlobalContext);
  const [currencyList, setCurrencyList] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<
    Currency | undefined
  >(undefined);

  const [totalisedAmount, setTotalisedAmount] = useState<number | null>(null);
  const [defaultCurrency, setDefaultCurrency] = useState<Currency | null>(null);

  const [isCurrencyExchangeDialogOpen, setIsCurrencyExchangeDialogOpen] =
    useState(false);
  const [isDepositCurrencyDialogOpen, setIsDepositCurrencyDialogOpen] =
    useState(false);
  const [isAddNewCurrencyDialogOpen, setIsAddNewCurrencyDialogOpen] =
    useState(false);
  const [isTransactionHistoryDialogOpen, setIsTransactionHistoryDialogOpen] =
    useState(false);


    useEffect(() => {
      if (currenciesState?.currencies) {
        const currencies = Object.values(currenciesState?.currencies).map(
          (currency) => currency
        );
        setCurrencyList(currencies);
      }
      return () => {
      };
    }, []);

  useEffect(() => {
    if (currenciesState?.currencies) {
      const currencies = Object.values(currenciesState?.currencies).map(
        (currency) => currency
      );
      setCurrencyList(currencies);
    }
    return () => {};
  }, [currenciesState?.currencies]);  

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
      setDefaultCurrency(currenciesState?.defaultCurrency);
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
      default:
        break;
    }
  };

  const handleCurrencyChange = (currency: Currency | null) => {
    if (currency) {
      setDefaultCurrency(currency);
      changeDefaultCurrency(currency)(currenciesDispatch);
    }
  };

  return (
    <div data-testid="landing-page" className="landing-page container mt-2">
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
        currencies={currencyList}
        onClose={() => {
          setIsAddNewCurrencyDialogOpen(false);
        }}
      ></AddCurrencyDialog>
      <TransactionHistoryDialog
        open={isTransactionHistoryDialogOpen}
        onClose={() => {
          setIsTransactionHistoryDialogOpen(false);
        }}
      ></TransactionHistoryDialog>

      <h1 data-testid="app-name">Mobi Wallet</h1>
      <div className="profile">
        <div className="profile-details">
          <h3 data-testid="user-name">John Doe</h3>
          <div className="circle app-bg-accent"></div>
        </div>
        <div className="default-currency">
          <Autocomplete
            data-testid="default-currency"
            className="my-2 w-100 px-0"
            options={currencyList ? currencyList : []}
            value={defaultCurrency}
            getOptionLabel={(option) => option.units}
            onChange={(event, newValue) => handleCurrencyChange(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Default Currency" />
            )}
          />
        </div>
      </div>
      <div className="totalized">
        <p data-testid="totallised-value-label">Totalised value</p>
        <h1 data-testid="totallised-value-details">
          {currenciesState?.defaultCurrency.units} {totalisedAmount}
        </h1>
      </div>
      <div className="currencies" data-testid="currency-cards">
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
