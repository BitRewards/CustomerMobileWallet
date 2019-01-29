import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../services/Api';
import * as faqActions from '../actions/faq';
import { MerchantFaqListResponse } from '../services/responseTypes';

function* faqFlow(action: faqActions.FaqActions) {
  try {
    const response = yield call(Api.getMerchantFaqList, action.payload.partnerKey);
    const responseData: MerchantFaqListResponse = response.data;
    yield put(faqActions.FaqActions.fetchFaqListSuccess(responseData.items));
  } catch (err) {
    yield put(faqActions.FaqActions.fetchFaqListFailure(err));
  }
}

export function* faqData() {
  yield takeLatest(faqActions.FETCH_FAQ_LIST_STARTED, faqFlow);
}
