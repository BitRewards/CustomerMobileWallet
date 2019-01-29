/**
 * История deposit транзакций.
 */

import { createAction } from './helpers';
import { ActionsUnion } from './types';
import { MerchantDepositHistoryItem } from '../services/responseTypes';

export const REFRESH_DEPOSIT_HISTORY_LIST = 'REFRESH_DEPOSIT_HISTORY_LIST';
export const FETCH_DEPOSIT_HISTORY_LIST_STARTED = 'FETCH_DEPOSIT_HISTORY_LIST_STARTED';
export const FETCH_DEPOSIT_HISTORY_LIST_SUCCESS = 'FETCH_DEPOSIT_HISTORY_LIST_SUCCESS';
export const FETCH_DEPOSIT_HISTORY_LIST_FAILURE = 'FETCH_DEPOSIT_HISTORY_LIST_FAILURE';

export const DepositHistoryActions = {
  refreshDepositHistoryList: (partnerKey: string) => createAction(
    REFRESH_DEPOSIT_HISTORY_LIST,
    { partnerKey },
  ),
  fetchDepositHistoryList: (partnerKey: string, page: number, perPage: number) => createAction(
    FETCH_DEPOSIT_HISTORY_LIST_STARTED,
    { partnerKey, page, perPage },
  ),
  fetchDepositHistoryListSuccess: (page: number, items: [MerchantDepositHistoryItem]) => createAction(
    FETCH_DEPOSIT_HISTORY_LIST_SUCCESS,
    { page, items },
  ),
  fetchDepositHistoryListFailure: (error: any) => createAction(
    FETCH_DEPOSIT_HISTORY_LIST_FAILURE,
    error,
  ),
};

export type DepositHistoryActions = ActionsUnion<typeof DepositHistoryActions>;
