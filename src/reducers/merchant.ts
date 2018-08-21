/**
 * Кошелек мерчанта.
 */

import { fromJS, List } from 'immutable';
import * as sessionActions from '../actions/session';
import * as navigationActions from '../actions/navigation';
import * as merchantActions from '../actions/merchant';

const initialState = fromJS({
  isFetching: false,
  key: '',
  title: '',
  image: null,
  balanceAmount: 0,
  fiatAmount: 0,
  fiatCurrency: null,
  couponsCount: 0,
  couponsList: [],
  error: null,
});

export const historyReducer = (
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
        .set('key', action.payload.merchant.partner.key)
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
        .set('key', action.payload.partner.key)
        .set('title', action.payload.partner.title)
        .set('image', action.payload.partner.image)
        .set('balanceAmount', action.payload.balanceAmount)
        .set('fiatAmount', action.payload.fiatAmount)
        .set('fiatCurrency', action.payload.fiatCurrency)
        .set('couponsCount', action.payload.couponsCount)
        .set('error', null);
    }
    case merchantActions.FETCH_WALLET_MERCHANT_COUPONS_SUCCESS: {
      return state
        .set('couponsList', List(action.payload));
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

export default historyReducer;
