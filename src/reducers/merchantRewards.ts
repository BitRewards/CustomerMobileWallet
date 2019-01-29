import * as merchantActions from '../actions/merchant';
import { reducerPaginatedListFactory } from './helpers/basePaginatedList';

export const merchantRewardsReducer = reducerPaginatedListFactory(
  merchantActions.FETCH_WALLET_MERCHANT_REWARDS_STARTED,
  merchantActions.FETCH_WALLET_MERCHANT_REWARDS_SUCCESS,
  merchantActions.FETCH_WALLET_MERCHANT_REWARDS_FAILURE,
  merchantActions.REFRESH_WALLET_MERCHANT_REWARDS,
);

export default merchantRewardsReducer;
