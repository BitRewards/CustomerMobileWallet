/**
 * Кошелек пользователя.
 */

import { createAction } from './helpers';
import { ActionsUnion } from './types';

export const REFRESH_WALLET_LIST = 'REFRESH_WALLET_LIST';
export const FETCH_WALLET_LIST_STARTED = 'FETCH_WALLET_LIST_STARTED';
export const FETCH_WALLET_LIST_SUCCESS = 'FETCH_WALLET_LIST_SUCCESS';
export const FETCH_WALLET_LIST_FAILURE = 'FETCH_WALLET_LIST_FAILURE';

export const WalletActions = {
  refreshWalletList: () => createAction(REFRESH_WALLET_LIST),
  fetchWalletList: () => createAction(FETCH_WALLET_LIST_STARTED),
  fetchWalletListSuccess: (data: any) => createAction(FETCH_WALLET_LIST_SUCCESS, data),
  fetchWalletListFailure: (error: any) => createAction(FETCH_WALLET_LIST_FAILURE, error),
};

export type WalletActions = ActionsUnion<typeof WalletActions>;
