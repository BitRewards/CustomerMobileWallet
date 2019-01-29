/**
 * Кошелек мерчанта.
 */

import { fromJS } from 'immutable';
import { Reducer } from 'redux';
import * as sessionActions from '../actions/session';
import * as navigationActions from '../actions/navigation';
import * as merchantActions from '../actions/merchant';
import { PartnerInfoResponse } from '../services/responseTypes';

const initialState = fromJS({
  isFetching: false,
  partnerKey: '',
  title: '',
  image: null,
  balanceAmount: 0,
  fiatAmount: 0,
  fiatCurrency: null,
  couponsCount: 0,
  error: null,
  settings: fromJS({
    minWithdraw: '',
    maxWithdraw: '',
    withdrawFeeAmount: 0,
    withdrawFeeType: '',
  }),
  ethAddress: '',
});

export const merchantReducer: Reducer = (
  state = initialState,
  action: sessionActions.SessionActions | merchantActions.MerchantActions | navigationActions.NavigationActions,
) => {
  switch (action.type) {
    case merchantActions.FETCH_WALLET_MERCHANT_INFO_STARTED: {
      return state
        .set('isFetching', true)
        .set('error', null);
    }
    case navigationActions.OPEN_WALLET_MERCHANT: {
      return state
        .set('partnerKey', action.payload.merchant.partner.key)
        .set('title', action.payload.merchant.partner.title)
        .set('image', action.payload.merchant.partner.image)
        .set('balanceAmount', action.payload.merchant.balanceAmount)
        .set('fiatAmount', action.payload.merchant.fiatAmount)
        .set('fiatCurrency', action.payload.merchant.fiatCurrency)
        .set('couponsCount', action.payload.merchant.couponsCount);
    }
    case merchantActions.FETCH_WALLET_MERCHANT_INFO_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('partnerKey', action.payload.partner.key)
        .set('title', action.payload.partner.title)
        .set('image', action.payload.partner.image)
        .set('balanceAmount', action.payload.balanceAmount)
        .set('fiatAmount', action.payload.fiatAmount)
        .set('fiatCurrency', action.payload.fiatCurrency)
        .set('couponsCount', action.payload.couponsCount)
        .set('error', null);
    }
    case merchantActions.FETCH_WALLET_MERCHANT_LIMITS_SUCCESS: {
      const partnerInfo: PartnerInfoResponse = action.payload.data;
      return state
        .setIn(['settings', 'minWithdraw'], partnerInfo.settings.minWithdraw)
        .setIn(['settings', 'maxWithdraw'], partnerInfo.settings.maxWithdraw)
        .setIn(['settings', 'withdrawFeeAmount'], partnerInfo.settings.withdrawFeeAmount)
        .setIn(['settings', 'withdrawFeeType'], partnerInfo.settings.withdrawFeeType)
        .set('ethAddress', partnerInfo.ethAddress);
    }
    case merchantActions.FETCH_WALLET_MERCHANT_INFO_FAILURE: {
      return state
        .set('isFetching', false)
        .set('error', action.payload);
    }
    case sessionActions.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export default merchantReducer;
