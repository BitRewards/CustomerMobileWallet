import * as withdrawHistoryActions from '../actions/withdrawHistory';
import { reducerPaginatedListFactory } from './helpers/basePaginatedList';

export const merchantActionsReducer = reducerPaginatedListFactory(
    withdrawHistoryActions.FETCH_HISTORY_TRANSACTION_LIST_STARTED,
    withdrawHistoryActions.FETCH_HISTORY_TRANSACTION_LIST_SUCCESS,
    withdrawHistoryActions.FETCH_HISTORY_TRANSACTION_LIST_FAILURE,
    withdrawHistoryActions.REFRESH_HISTORY_TRANSACTION_LIST,
);

export default merchantActionsReducer;
