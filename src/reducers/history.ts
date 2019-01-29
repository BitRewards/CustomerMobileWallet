/**
 * История транзакций.
 */

import * as historyActions from '../actions/history';
import { reducerPaginatedListFactory } from './helpers/basePaginatedList';

export const historyReducer = reducerPaginatedListFactory(
  historyActions.FETCH_TRANSACTION_LIST_STARTED,
  historyActions.FETCH_TRANSACTION_LIST_SUCCESS,
  historyActions.FETCH_TRANSACTION_LIST_FAILURE,
  historyActions.REFRESH_TRANSACTION_LIST,
);

export default historyReducer;
