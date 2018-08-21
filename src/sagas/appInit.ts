import { call, put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import Api from '../services/Api';
import * as appActions from '../actions/app';
import * as sessionActions from '../actions/session';

function* loginFlow() {
  try {
    const token = '12345';
    yield call(AsyncStorage.setItem, Api.tokenName, token);
    Api.setAuthToken(token);
    yield put(sessionActions.SessionActions.loginSuccess());
  } catch (err) {
  }
}

export function* loginData() {
  yield takeLatest(sessionActions.LOGIN, loginFlow);
}

function* logoutFlow() {
  try {
    yield call(AsyncStorage.removeItem, Api.tokenName);
    Api.setAuthToken('');
  } catch (err) {
  }
}

export function* logoutData() {
  yield takeLatest(sessionActions.LOGOUT, logoutFlow);
}

function* dynamicInitialRouteFlow() {
  try {
    const token = yield call(AsyncStorage.getItem, Api.tokenName);
    if (!token) {
      yield put(sessionActions.SessionActions.loginRequest());
    } else {
      Api.setAuthToken(token);
      yield put(sessionActions.SessionActions.loginSuccess());
    }
  } catch (err) {
    yield put(sessionActions.SessionActions.logout());
  }
}

export function* dynamicInitialRouteData() {
  yield takeLatest(appActions.DYNAMIC_INITIAL_ROUTE, dynamicInitialRouteFlow);
}
