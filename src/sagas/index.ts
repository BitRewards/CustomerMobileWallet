import { all, fork } from 'redux-saga/effects';
import {
  sendEmailCodeData,
  checkEmailCodeData,
  loginData,
  logoutData,
  dynamicInitialRouteData,
} from './appInit';
import {
  loginViaFacebookData,
} from './facebookSdk';
import {
  refreshMerchantWalletListData,
  merchantWalletListData,
} from './wallet';
import {
  merchantWalletData,
  refreshMerchantCouponsData,
  merchantCouponsData,
  refreshMerchantActionsData,
  refreshMerchantRewardsData,
  refreshMerchantCouponsData,
  merchantActionsData,
  merchantRewardsData,
  postRewardAcquireData,
  fetchActionInfoData,
  fetchRewardInfoData,
  merchantLimitsAndFeeData,
  postRewardPayoutData,
} from './merchant';
import {
  refreshTransactionHistoryData,
  transactionHistoryData,
} from './history';
import {
  faqData,
} from './faq';
import {
  refreshOfferActionsListData,
  offerActionsListData,
  refreshOfferRewardListData,
  offerRewardListData,
} from './specialOffers';
import {
  currentUserData,
} from './profile';
import {
  fetchCurrencyData,
  refreshCurrencyData,
} from './currency';
import {
  walletHistorySagas,
} from './walletHistory';
import {
  depositHistorySagas,
} from './depositHistory';
import {
  withdrawHistorySagas,
} from './withdrawHistory';

const rootSagas = function* root() {
  yield all([
    fork(sendEmailCodeData),
    fork(checkEmailCodeData),
    fork(loginData),
    fork(logoutData),
    fork(loginViaFacebookData),
    fork(dynamicInitialRouteData),
    fork(refreshMerchantWalletListData),
    fork(merchantWalletListData),
    fork(merchantWalletData),
    fork(refreshMerchantCouponsData),
    fork(merchantCouponsData),
    fork(refreshMerchantActionsData),
    fork(refreshMerchantRewardsData),
    fork(merchantActionsData),
    fork(merchantRewardsData),
    fork(postRewardAcquireData),
    fork(fetchActionInfoData),
    fork(fetchRewardInfoData),
    fork(refreshTransactionHistoryData),
    fork(transactionHistoryData),
    fork(merchantLimitsAndFeeData),
    fork(postRewardPayoutData),
    fork(faqData),
    fork(refreshOfferActionsListData),
    fork(refreshOfferRewardListData),
    fork(offerActionsListData),
    fork(offerRewardListData),
    fork(currentUserData),
    fork(fetchCurrencyData),
    fork(refreshCurrencyData),
    ...walletHistorySagas,
    ...depositHistorySagas,
    ...withdrawHistorySagas,
  ]);
};

export default rootSagas;
