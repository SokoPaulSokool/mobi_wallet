import {createContext, useReducer} from 'react';
import currenciesInitialState from './initialStates/currenciesInitialState';
import currenciesReducer from './reducers/currenciesReducer';
import { CurrenciesState } from '../interfaces/CurrencyInterfaces';


interface GlobalContextInterface {
  currenciesState?: CurrenciesState;
  currenciesDispatch?: any
}

const initialState:GlobalContextInterface =  {};
export const GlobalContext = createContext(initialState);

const GlobalProvider = ({children}:any) => {
  const [currenciesState, currenciesDispatch] = useReducer(currenciesReducer, currenciesInitialState);


  return (
    <GlobalContext.Provider
      value={{currenciesState, currenciesDispatch}}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
