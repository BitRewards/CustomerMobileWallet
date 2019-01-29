import { createSelector } from 'reselect';
import { CurrencyRates } from '../services/responseTypes';

const makeSelectCurrency = (state: any) => {
  return state.currency;
};

const makeSelectCurrencyRates = createSelector(
  makeSelectCurrency,
  (currencyState: any): CurrencyRates => currencyState.get('currencyRates'),
);

export {
  makeSelectCurrencyRates,
};
