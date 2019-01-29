import { call, put, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { AxiosResponse } from 'axios';
import Api from '../services/Api';
import * as appActions from '../actions/app';
import * as sessionActions from '../actions/session';
import {
  LoginResponse,
  TranslationsResponse,
} from '../services/responseTypes';
import Toast from 'react-native-simple-toast';

function* sendEmailCodeFlow(action: sessionActions.SessionActions) {
  try {
    yield call(Api.postSendEmailVerificationCode, action.payload);
    yield put(sessionActions.SessionActions.sendEmailCodeSuccess());
  } catch (err) {
    Toast.show(Api.getErrorMessage(err), Toast.LONG);
    console.warn(JSON.stringify(err, null, 2));
    yield put(sessionActions.SessionActions.sendEmailCodeFailure(err));
  }
}

export function* sendEmailCodeData() {
  yield takeLatest(sessionActions.SEND_EMAIL_CODE_STARTED, sendEmailCodeFlow);
}

function* checkEmailCodeFlow(action: sessionActions.SessionActions) {
  try {
    const response: AxiosResponse<LoginResponse> = yield call(Api.postCheckEmailVerificationCode, action.payload.email, action.payload.code);
    const token = response.data.auth_token;
    yield put(sessionActions.SessionActions.checkEmailCodeSuccess());
    yield put(sessionActions.SessionActions.login(token));
  } catch (err) {
    Toast.show(Api.getErrorMessage(err), Toast.LONG);
    yield put(sessionActions.SessionActions.checkEmailCodeFailure(err));
  }
}

export function* checkEmailCodeData() {
  yield takeLatest(sessionActions.CHECK_EMAIL_CODE_STARTED, checkEmailCodeFlow);
}

function* loginFlow(action: sessionActions.SessionActions) {
  try {
    const token = action.payload.authToken;
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

function getTranslations(): Promise<TranslationsResponse | null> {
  const translationsKey = 'translations';
  const translationsLastUpdate = 'translationsLastUpdate';
  return AsyncStorage.getItem(translationsLastUpdate)
    .then((lastUpdate) => {
      if (!lastUpdate) {
        return Api.getTranslationsList().then((response) => response.data);
      } else {
        return AsyncStorage.getItem(translationsKey).then(translationsString => {
          try {
            return JSON.parse(translationsString);
          } catch (e) {
            return null;
          }
        });
      }
    });
}

function* dynamicInitialRouteFlow() {
  try {
    const translations: TranslationsResponse | null = yield call(getTranslations);
    console.warn(JSON.stringify(translations, null, 2));
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
