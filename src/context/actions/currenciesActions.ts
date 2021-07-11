import Currency from "../../interfaces/CurrencyInterfaces";
import { DEPOSIT_TO_CURRENCY } from "./types";

const currenciesActions = () => {
  return {};
};
export const depositCurrency =
  (currency: Currency, depositAmount: number) => (dispatch: any) => {
    const newAmount = currency.amount + depositAmount;
    console.log(currency);
    dispatch({
      type: DEPOSIT_TO_CURRENCY,
      payload: { currencyUnits: currency.units, newAmount },
    });
  };

export default currenciesActions;
