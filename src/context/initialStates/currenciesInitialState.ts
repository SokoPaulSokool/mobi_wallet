import { CurrenciesState } from '../../interfaces/CurrencyInterfaces';

const currenciesInitialState: CurrenciesState  = {
  currrencies: [
    {amount:"100",units:"USD"},
    {amount:"500",units:"EUR"},
    {amount:"10000",units:"CHF"},
    {amount:"1000",units:"UGX"},
    {amount:"5000",units:"KES"},
  ]
}

export default currenciesInitialState;
