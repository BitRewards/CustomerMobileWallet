/**
 * Кошелек мерчанта.
 */

import { fromJS, List } from 'immutable';
import * as sessionActions from '../actions/session';
import * as walletActions from '../actions/wallet';

const initialState = fromJS({
  isFetching: false,
  items: [],
  error: null,
});

export const walletReducer = (state = initialState, action: sessionActions.SessionActions | walletActions.WalletActions) => {
  switch (action.type) {
    case walletActions.FETCH_WALLET_LIST_STARTED: {
      return state
        .set('isFetching', true)
        .set('error', null);
    }
    case walletActions.FETCH_WALLET_LIST_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('items', List(action.payload))
        .set('error', null);
    }
    case walletActions.FETCH_WALLET_LIST_FAILURE: {
      return state
        .set('isFetching', false)
        .set('error', action.payload);
    }
    case sessionActions.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export default walletReducer;
