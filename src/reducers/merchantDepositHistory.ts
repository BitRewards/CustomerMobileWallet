import * as depositHistoryActions from '../actions/depositHistory';
import { reducerPaginatedListFactory } from './helpers/basePaginatedList';

export const depositHistoryReducer = reducerPaginatedListFactory(
  depositHistoryActions.FETCH_DEPOSIT_HISTORY_LIST_STARTED,
  depositHistoryActions.FETCH_DEPOSIT_HISTORY_LIST_SUCCESS,
  depositHistoryActions.FETCH_DEPOSIT_HISTORY_LIST_FAILURE,
  depositHistoryActions.REFRESH_DEPOSIT_HISTORY_LIST,
);

export default depositHistoryReducer;
