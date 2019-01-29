import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../services/Api';
import * as profileActions from '../actions/profile';
import { CurrentUserResponse } from '../services/responseTypes';

function* currentUserFlow(action: profileActions.ProfileActions) {
  try {
    const response = yield call(Api.getCurrentMerchantUser, action.payload.partnerKey);
    const responseData: CurrentUserResponse = response.data;
    yield put(profileActions.ProfileActions.fetchCurrentUserSuccess(responseData));
  } catch (err) {
    yield put(profileActions.ProfileActions.fetchCurrentUserFailure(err));
  }
}

export function* currentUserData() {
  yield takeLatest(profileActions.FETCH_CURRENT_USER_STARTED, currentUserFlow);
}
