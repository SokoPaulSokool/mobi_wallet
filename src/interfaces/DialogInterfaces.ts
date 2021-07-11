import Currency from "./CurrencyInterfaces";

export interface DialogProps {
  open: boolean;
  onClose: Function;
  selectedValue?: any;
  currencies?: Currency[];
}
