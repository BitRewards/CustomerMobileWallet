import { call, put, takeLatest } from 'redux-saga/effects';
import * as facebookSdkActions from '../actions/facebookSdk';
import * as sessionActions from '../actions/session';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Api from '../services/Api';

/**
 * Авторизация через facebook sdk - получение accessToken.
 * @return {Promise<string>} - accessToken.
 */
function loginViaFacebook() {
  return LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
    (result) => {
      if (result.isCancelled) {
        console.warn('Login cancelled');
        throw new Error('Facebook login cancelled');
      } else {
        console.warn(JSON.stringify(result, null, 2));
        return AccessToken.getCurrentAccessToken();
      }
    },
    (error) => {
      throw new Error('Facebook login fail with error: ', error);
    },
  ).then(
    (accessTokenData: AccessToken | null) => {
      const accessToken = accessTokenData.accessToken.toString();
      console.warn(`accessToken = ${accessToken}`);
      return accessToken;
    },
  );
}

/**
 * Авторизация на сервере по accessToken'у.
 * @return {Promise<string>} - authToken.
 */
function loginViaFacebookAccessToken(accessToken: string) {
  return Api.postLoginByFacebook(accessToken)
    .then(
      (result) => {
        console.warn(`auth_token = ${result.data.auth_token}`);
        return result.data.auth_token;
      },
    );
}

function* loginViaFacebookFlow() {
  try {
    const accessToken: string = yield call(loginViaFacebook);
    yield put(facebookSdkActions.LoginViaFacebookActions.loginViaFacebookSuccess(accessToken));
    const authToken: string = yield call(loginViaFacebookAccessToken, accessToken);
    yield put(sessionActions.SessionActions.login(authToken));
  } catch (err) {
    yield put(facebookSdkActions.LoginViaFacebookActions.loginViaFacebookFailure(err));
  }
}

export function* loginViaFacebookData() {
  yield takeLatest(facebookSdkActions.LOGIN_VIA_FACEBOOK, loginViaFacebookFlow);
}
