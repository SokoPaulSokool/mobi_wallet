import { CurrenciesState } from '../../interfaces/Currencies';

const currenciesInitialState: CurrenciesState  = {
  currrencies: [
    {amount:"100",units:"USD"},
    {amount:"500",units:"EUR"},
    {amount:"10000",units:"CHF"},
  ]
}

export default currenciesInitialState;
