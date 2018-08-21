/**
 * История транзакций.
 */

import { createAction } from './helpers';
import { ActionsUnion } from './types';

export const FETCH_TRANSACTION_LIST_STARTED = 'FETCH_TRANSACTION_LIST_STARTED';
export const FETCH_TRANSACTION_LIST_SUCCESS = 'FETCH_TRANSACTION_LIST_SUCCESS';
export const FETCH_TRANSACTION_LIST_FAILURE = 'FETCH_TRANSACTION_LIST_FAILURE';

export const HistoryActions = {
  fetchTransactionList: (page: number, perPage: number) => createAction(
    FETCH_TRANSACTION_LIST_STARTED,
    { page, perPage },
  ),
  fetchTransactionListSuccess: (items: any) => createAction(FETCH_TRANSACTION_LIST_SUCCESS, items),
  fetchTransactionListFailure: (error: any) => createAction(FETCH_TRANSACTION_LIST_FAILURE, error),
};

export type HistoryActions = ActionsUnion<typeof HistoryActions>;
