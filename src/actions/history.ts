/**
 * История транзакций.
 */

import { createAction } from './helpers';
import { ActionsUnion } from './types';
import { PersonTransactionItem } from '../services/responseTypes';

export const REFRESH_TRANSACTION_LIST = 'REFRESH_TRANSACTION_LIST';
export const FETCH_TRANSACTION_LIST_STARTED = 'FETCH_TRANSACTION_LIST_STARTED';
export const FETCH_TRANSACTION_LIST_SUCCESS = 'FETCH_TRANSACTION_LIST_SUCCESS';
export const FETCH_TRANSACTION_LIST_FAILURE = 'FETCH_TRANSACTION_LIST_FAILURE';

export const HistoryActions = {
  refreshTransactionList: () => createAction(REFRESH_TRANSACTION_LIST),
  fetchTransactionList: (page: number, perPage: number) => createAction(
    FETCH_TRANSACTION_LIST_STARTED,
    { page, perPage },
  ),
  fetchTransactionListSuccess: (page: number, items: [PersonTransactionItem]) => createAction(
    FETCH_TRANSACTION_LIST_SUCCESS,
    { page, items },
  ),
  fetchTransactionListFailure: (error: any) => createAction(FETCH_TRANSACTION_LIST_FAILURE, error),
};

export type HistoryActions = ActionsUnion<typeof HistoryActions>;
