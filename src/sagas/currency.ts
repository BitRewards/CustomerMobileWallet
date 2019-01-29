import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../services/Api';
import * as currencyActions from '../actions/currency';

function* fetchCurrencyFlow() {
  try {
    const responseData = yield call(Api.getFiatCurrency);
    yield put(currencyActions.currencyActions.fetchCurrencySuccess(responseData.data.exchangeRate));
  } catch (error) {
    yield put(currencyActions.currencyActions.fetchCurrencyFeilure(error));
  }
}

export function* fetchCurrencyData() {
  yield takeLatest(currencyActions.FETCH_CURRENCY_STARTED, fetchCurrencyFlow);
}

function* refreshCurrency() {
  yield put(currencyActions.currencyActions.fetchCurrency());
}

export function* refreshCurrencyData() {
  yield takeLatest(currencyActions.REFRESH_CURRENCY, refreshCurrency);
}
