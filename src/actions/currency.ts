import { createAction } from './helpers';
import { ActionsUnion } from './types';

export const REFRESH_CURRENCY = 'REFRESH_CURRENCY';
export const FETCH_CURRENCY_STARTED = 'FETCH_CURRENCY_STARTED';
export const FETCH_CURRENCY_SUCCESS = 'FETCH_CURRENCY_SUCCESS';
export const FETCH_CURRENCY_FAILURE = 'FETCH_CURRENCY_FAILURE';

export const currencyActions = {
  refreshCurrency: () => createAction(REFRESH_CURRENCY),
  fetchCurrency: () => createAction(FETCH_CURRENCY_STARTED),
  fetchCurrencySuccess: (data: any) => createAction(FETCH_CURRENCY_SUCCESS, data),
  fetchCurrencyFeilure: (error: any) => createAction(FETCH_CURRENCY_FAILURE, error),
};

export type currencyActions = ActionsUnion<typeof currencyActions>;
