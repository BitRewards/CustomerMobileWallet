import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../services/Api';
import * as merchantActions from '../actions/merchant';
import { MerchantCouponListResponse } from '../services/responseTypes';

function* merchantWalletFlow(action: merchantActions.MerchantActions) {
  try {
    const responseData = yield call(Api.getMerchantWallet, action.payload.partnerKey);
    yield put(merchantActions.MerchantActions.fetchWalletMerchantInfoSuccess(responseData.data));
  } catch (err) {
    yield put(merchantActions.MerchantActions.fetchWalletMerchantInfoFailure(err));
  }
}

export function* merchantWalletData() {
  yield takeLatest(merchantActions.FETCH_WALLET_MERCHANT_INFO_STARTED, merchantWalletFlow);
}

function* merchantCouponsFlow(action: merchantActions.MerchantActions) {
  try {
    const response = yield call(Api.getMerchantCouponList, action.payload.partnerKey);
    const responseData: MerchantCouponListResponse = response.data;
    yield put(merchantActions.MerchantActions.fetchWalletMerchantCouponsSuccess(responseData.items));
  } catch (err) {
    yield put(merchantActions.MerchantActions.fetchWalletMerchantCouponsFailure(err));
  }
}

export function* merchantCouponsData() {
  yield takeLatest(merchantActions.FETCH_WALLET_MERCHANT_COUPONS_STARTED, merchantCouponsFlow);
}
