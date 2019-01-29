/**
 * Кошелек мерчанта.
 */

import * as walletActions from '../actions/wallet';
import { reducerListFactory } from './helpers/baseList';

export const walletReducer = reducerListFactory(
  walletActions.FETCH_WALLET_LIST_STARTED,
  walletActions.FETCH_WALLET_LIST_SUCCESS,
  walletActions.FETCH_WALLET_LIST_FAILURE,
  walletActions.REFRESH_WALLET_LIST,
);

export default walletReducer;
