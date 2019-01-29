import * as merchantActions from '../actions/merchant';
import { reducerPaginatedListFactory } from './helpers/basePaginatedList';

export const merchantActionsReducer = reducerPaginatedListFactory(
  merchantActions.FETCH_WALLET_MERCHANT_ACTIONS_STARTED,
  merchantActions.FETCH_WALLET_MERCHANT_ACTIONS_SUCCESS,
  merchantActions.FETCH_WALLET_MERCHANT_ACTIONS_FAILURE,
  merchantActions.REFRESH_WALLET_MERCHANT_ACTIONS,
);

export default merchantActionsReducer;
