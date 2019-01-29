import * as merchantActions from '../actions/merchant';
import { reducerPaginatedListFactory } from './helpers/basePaginatedList';

export const merchantCouponsReducer = reducerPaginatedListFactory(
  merchantActions.FETCH_WALLET_MERCHANT_COUPONS_STARTED,
  merchantActions.FETCH_WALLET_MERCHANT_COUPONS_SUCCESS,
  merchantActions.FETCH_WALLET_MERCHANT_COUPONS_FAILURE,
  merchantActions.REFRESH_WALLET_MERCHANT_COUPONS,
);

export default merchantCouponsReducer;
