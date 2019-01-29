import { call, put, takeLatest } from 'redux-saga/effects';
import SimpleToast from 'react-native-simple-toast';
import Api from '../services/Api';
import * as merchantActions from '../actions/merchant';
import * as navigationActions from '../actions/navigation';
import {
  MerchantCouponListResponse,
  MerchantActionsListResponse,
  MerchantRewardsListResponse,
  Payout,
  PartnerInfoResponse,
} from '../services/responseTypes';

const INITIAL_PAGE = 1;
const DEFAULT_PER_PAGE = 15;

function* merchantWalletFlow(action: merchantActions.MerchantActions) {
  try {
    const responseData = yield call(Api.getMerchantWallet, action.payload.partnerKey);
    yield put(merchantActions.MerchantActions.fetchWalletMerchantInfoSuccess(responseData.data));
  } catch (err) {
    yield put(merchantActions.MerchantActions.fetchWalletMerchantInfoFailure(err));
  }
}

function* merchantLimitsAndFee(action: any) {
  try {
    const response = yield call(Api.getLimitsAndFeeMerchant, action.payload.partnerKey);
    const responseData: PartnerInfoResponse = response.data;
    yield put(merchantActions.MerchantActions.fetchWalletMerchantLimitsSuccess(responseData));
  } catch (err) {
    yield put(merchantActions.MerchantActions.fetchWalletMerchantLimitsFailure(err));
  }
}

export function* merchantLimitsAndFeeData() {
  yield takeLatest(merchantActions.FETCH_WALLET_MERCHANT_LIMITS_STARTED, merchantLimitsAndFee);
}

export function* merchantWalletData() {
  yield takeLatest(merchantActions.FETCH_WALLET_MERCHANT_INFO_STARTED, merchantWalletFlow);
}

function* refreshMerchantCouponsFlow(action: merchantActions.MerchantActions) {
  yield put(merchantActions.MerchantActions.fetchWalletMerchantCoupons(action.payload.partnerKey, INITIAL_PAGE, DEFAULT_PER_PAGE));
}

export function* refreshMerchantCouponsData() {
  yield takeLatest(merchantActions.REFRESH_WALLET_MERCHANT_COUPONS, refreshMerchantCouponsFlow);
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

function* refreshMerchantActionsFlow(action: merchantActions.MerchantActions) {
  yield put(merchantActions.MerchantActions.fetchWalletMerchantActions(action.payload.partnerKey, INITIAL_PAGE, DEFAULT_PER_PAGE));
}

export function* refreshMerchantActionsData() {
  yield takeLatest(merchantActions.REFRESH_WALLET_MERCHANT_ACTIONS, refreshMerchantActionsFlow);
}

function* merchantActionsFlow(action: merchantActions.MerchantActions) {
  try {
    const response = yield call(Api.getMerchantActionsList, action.payload.partnerKey, action.payload.page, action.payload.perPage);
    const responseData: MerchantActionsListResponse = response.data;
    yield put(merchantActions.MerchantActions.fetchWalletMerchantActionsSuccess(responseData.items, action.payload.page));
  } catch (err) {
    yield put(merchantActions.MerchantActions.fetchWalletMerchantActionsFailure(err));
  }
}

export function* merchantActionsData() {
  yield takeLatest(merchantActions.FETCH_WALLET_MERCHANT_ACTIONS_STARTED, merchantActionsFlow);
}

function* refreshMerchantRewardsFlow(action: merchantActions.MerchantActions) {
  yield put(merchantActions.MerchantActions.fetchWalletMerchantRewards(action.payload.partnerKey, INITIAL_PAGE, DEFAULT_PER_PAGE));
}

export function* refreshMerchantRewardsData() {
  yield takeLatest(merchantActions.REFRESH_WALLET_MERCHANT_REWARDS, refreshMerchantRewardsFlow);
}

function* merchantRewardsFlow(action: merchantActions.MerchantActions) {
  try {
    const response = yield call(Api.getMerchantRewardList, action.payload.partnerKey, action.payload.page, action.payload.perPage);
    const responseData: MerchantRewardsListResponse = response.data;
    yield put(merchantActions.MerchantActions.fetchWalletMerchantRewardsSuccess(responseData.items, action.payload.page));
  } catch (err) {
    yield put(merchantActions.MerchantActions.fetchWalletMerchantRewardsFailure(err));
  }
}

export function* merchantRewardsData() {
  yield takeLatest(merchantActions.FETCH_WALLET_MERCHANT_REWARDS_STARTED, merchantRewardsFlow);
}

function* postRewardAcquireFlow(action: merchantActions.MerchantActions) {
  try {
    const response = yield call(Api.postRewardAcquire, action.payload.rewardId);
    const responseData: any = response.data;
    yield put(merchantActions.MerchantActions.postRewardAcquireSuccess(responseData));
  } catch (err) {
    yield put(merchantActions.MerchantActions.postRewardAcquireError(err));
  }
}

export function* postRewardAcquireData() {
  yield takeLatest(merchantActions.POST_REWARD_ACQUIRE_STARTED, postRewardAcquireFlow);
}

function* postRewardPayoutFlow(action: merchantActions.MerchantActions) {
  try {
    const response = yield call(Api.postPayout, action.payload.partnerKey, action.payload.tokenAmount, action.payload.withdrawETH);
    const responseData: Payout = response.data;
    yield put(merchantActions.MerchantActions.postRewardPayoutSuccess(responseData));
    yield put(navigationActions.NavigationActions.openWithdrawWithNotification(action.payload.partnerKey, action.payload.tokenAmount, action.payload.withdrawETH));
  } catch (err) {
    SimpleToast.show(Api.getErrorMessage(err), SimpleToast.LONG);
    yield put(merchantActions.MerchantActions.postRewardPayoutError(err));
  }
}

export function* postRewardPayoutData() {
  yield takeLatest(merchantActions.POST_REWARD_PAYOUT_STARTED, postRewardPayoutFlow);
}

function* fetchActionInfoFlow(action: merchantActions.MerchantActions) {
  try {
    const response = yield call(Api.getActionInfo, action.payload.actionId);
    const responseData: any = response.data;
    yield put(merchantActions.MerchantActions.fetchActionInfoSuccess(responseData));
  } catch (err) {
    yield put(merchantActions.MerchantActions.fetchActionInfoFailure(err));
  }
}

export function* fetchActionInfoData() {
  yield takeLatest(merchantActions.FETCH_ACTION_INFO_STARTED, fetchActionInfoFlow);
}

function* fetchRewardInfoFlow(action: merchantActions.MerchantActions) {
  try {
    const response = yield call(Api.getRewardInfo, action.payload.rewardId);
    const responseData: any = response.data;
    yield put(merchantActions.MerchantActions.fetchRewardInfoSuccess(responseData));
  } catch (err) {
    yield put(merchantActions.MerchantActions.fetchRewardInfoFailure(err));
  }
}

export function* fetchRewardInfoData() {
  yield takeLatest(merchantActions.FETCH_REWARD_INFO_STARTED, fetchRewardInfoFlow);
}
