/**
 * История транзакций.
 */

import { createAction } from './helpers';
import { ActionsUnion } from './types';
import { MerchantWithdrawHistoryItem } from '../services/responseTypes';

export const REFRESH_HISTORY_TRANSACTION_LIST = 'REFRESH_HISTORY_TRANSACTION_LIST';
export const FETCH_HISTORY_TRANSACTION_LIST_STARTED = 'FETCH_HISTORY_TRANSACTION_LIST_STARTED';
export const FETCH_HISTORY_TRANSACTION_LIST_SUCCESS = 'FETCH_HISTORY_TRANSACTION_LIST_SUCCESS';
export const FETCH_HISTORY_TRANSACTION_LIST_FAILURE = 'FETCH_HISTORY_TRANSACTION_LIST_FAILURE';

export const HistoryActions = {
  refreshHistoryTransactionList: (partnerKey: string) => createAction(
    REFRESH_HISTORY_TRANSACTION_LIST,
    { partnerKey },
  ),
  fetchHistoryTransactionList: (partnerKey: string, page: number, perPage: number) => createAction(
    FETCH_HISTORY_TRANSACTION_LIST_STARTED,
    { partnerKey, page, perPage },
  ),
  fetchHistoryTransactionListSuccess: (page: number, items: [MerchantWithdrawHistoryItem]) => createAction(
    FETCH_HISTORY_TRANSACTION_LIST_SUCCESS,
    { page, items },
  ),
  fetchHistoryTransactionListFailure: (error: any) => createAction(FETCH_HISTORY_TRANSACTION_LIST_FAILURE, error),
};

export type HistoryActions = ActionsUnion<typeof HistoryActions>;
