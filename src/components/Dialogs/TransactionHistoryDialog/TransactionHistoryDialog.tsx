import { Dialog, DialogTitle, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { GlobalContext } from "../../../context/provider";
import { DialogProps } from "../../../interfaces/DialogInterfaces";
import { DialogContent } from "@material-ui/core";
import {
  Transaction,
} from "../../../interfaces/CurrencyInterfaces";
import {
  DEPOSIT_TO_CURRENCY,
  EXCHANGE_CURRENCY,
} from "../../../context/actions/types";
import "./TransactionHistoryDialog.scss";

const TransactionHistoryDialog: React.FC<DialogProps> = ({ onClose, open }) => {
  const { currenciesState, currenciesDispatch } = useContext(GlobalContext);

  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(
    []
  );
  useEffect(() => {
    if (currenciesState?.transactionHistory) {
      setTransactionHistory(currenciesState?.transactionHistory);
    }
    return () => {};
  }, [currenciesState?.transactionHistory]);

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      className="transaction-history"
      onClose={handleClose}
      maxWidth="sm"
      fullWidth={true}
      open={open}
    >
      <div className="container">
        <DialogTitle id="simple-dialog-title">
          <div>
            <Typography variant="h4" data-testid="dialog-title">
              Transaction History
            </Typography>
          </div>
          <div className="close-btn">
            <CloseIcon
              data-testid="close-btn"
              className="pointer"
              onClick={handleClose}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="transactions" data-testid="transaction">
            {transactionHistory &&
              transactionHistory.length > 0 &&
              transactionHistory.map((transaction: Transaction, i) => {
                const tranactionDetails: any = transaction.details;
                return (
                  <div key={i + "o"}>
                    {transaction.type === DEPOSIT_TO_CURRENCY && (
                      <div className="transactions-deposit transaction">
                        <h4> Deposit Transaction</h4>
                        <div>
                          <div>Amount: {tranactionDetails.depositAmount}</div>
                          <div>
                            Currency: {tranactionDetails.currency.units}
                          </div>
                        </div>
                      </div>
                    )}
                    {transaction.type === EXCHANGE_CURRENCY && (
                      <div className="transactions-exchange transaction">
                        <h4>Exchange Transaction</h4>
                        <div>
                          <div>
                            Amount: {tranactionDetails.amountToExchange}
                          </div>
                          <div>
                            From: {tranactionDetails.fromCurrency.units}
                          </div>
                          <div>To: {tranactionDetails.toCurrency.units}</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default TransactionHistoryDialog;
