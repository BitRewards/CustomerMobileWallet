/**
 * История транзакций кошелька мерчанта.
 */

import * as walletHistoryActions from '../actions/walletHistory';
import { reducerPaginatedListFactory } from './helpers/basePaginatedList';

export const walletHistoryReducer = reducerPaginatedListFactory(
  walletHistoryActions.FETCH_WALLET_HISTORY_LIST_STARTED,
  walletHistoryActions.FETCH_WALLET_HISTORY_LIST_SUCCESS,
  walletHistoryActions.FETCH_WALLET_HISTORY_LIST_FAILURE,
  walletHistoryActions.REFRESH_WALLET_HISTORY_LIST,
);

export default walletHistoryReducer;
