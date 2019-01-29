/**
 * История транзакций кошелька мерчанта.
 */

import { createAction } from './helpers';
import { ActionsUnion } from './types';

export const REFRESH_WALLET_HISTORY_LIST = 'REFRESH_WALLET_HISTORY_LIST';
export const FETCH_WALLET_HISTORY_LIST_STARTED = 'FETCH_WALLET_HISTORY_LIST_STARTED';
export const FETCH_WALLET_HISTORY_LIST_SUCCESS = 'FETCH_WALLET_HISTORY_LIST_SUCCESS';
export const FETCH_WALLET_HISTORY_LIST_FAILURE = 'FETCH_WALLET_HISTORY_LIST_FAILURE';

export const WalletHistoryActions = {
  refreshWalletHistoryList: (partnerKey: string) => createAction(
    REFRESH_WALLET_HISTORY_LIST,
    { partnerKey },
  ),
  fetchWalletHistoryList: (partnerKey: string, page: number, perPage: number) => createAction(
    FETCH_WALLET_HISTORY_LIST_STARTED,
    { partnerKey, page, perPage },
  ),
  fetchWalletHistoryListSuccess: (page: number, items: [any]) => createAction(
    FETCH_WALLET_HISTORY_LIST_SUCCESS,
    { page, items },
  ),
  fetchWalletHistoryListFailure: (error: any) => createAction(FETCH_WALLET_HISTORY_LIST_FAILURE, error),
};

export type WalletHistoryActions = ActionsUnion<typeof WalletHistoryActions>;
