import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../services/Api';
import * as specialOffersActions from '../actions/specialOffers';
import {
  OfferActionsListResponse,
  OfferRewardListResponse,
} from '../services/responseTypes';

function* offerActionsListFlow(action: specialOffersActions.SpecialOfferActions) {
  try {
    const response = yield call(Api.getOfferActionsList, action.payload.page, action.payload.perPage);
    const responseData: OfferActionsListResponse = response.data;
    yield put(specialOffersActions.SpecialOfferActions.fetchOfferActionsListSuccess(responseData.items));
  } catch (err) {
    yield put(specialOffersActions.SpecialOfferActions.fetchOfferActionsListFailure(err));
  }
}

export function* offerActionsListData() {
  yield takeLatest(specialOffersActions.FETCH_OFFER_ACTIONS_LIST_STARTED, offerActionsListFlow);
}

function* offerRewardListFlow(action: specialOffersActions.SpecialOfferActions) {
  try {
    const response = yield call(Api.getOfferRewardList, action.payload.page, action.payload.perPage);
    const responseData: OfferRewardListResponse = response.data;
    yield put(specialOffersActions.SpecialOfferActions.fetchOfferRewardListSuccess(responseData.items));
  } catch (err) {
    yield put(specialOffersActions.SpecialOfferActions.fetchOfferRewardListFailure(err));
  }
}

export function* offerRewardListData() {
  yield takeLatest(specialOffersActions.FETCH_OFFER_REWARD_LIST_STARTED, offerRewardListFlow);
}
