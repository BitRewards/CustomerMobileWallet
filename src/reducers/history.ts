/**
 * История транзакций.
 */

import { fromJS, List } from 'immutable';
import * as sessionActions from '../actions/session';
import * as historyActions from '../actions/history';

const initialState = fromJS({
  isFetching: false,
  items: [],
  error: null,
});

export const historyReducer = (state = initialState, action: sessionActions.SessionActions | historyActions.HistoryActions) => {
  switch (action.type) {
    case historyActions.FETCH_TRANSACTION_LIST_STARTED: {
      return state
        .set('isFetching', true)
        .set('error', null);
    }
    case historyActions.FETCH_TRANSACTION_LIST_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('items', List(action.payload))
        .set('error', null);
    }
    case historyActions.FETCH_TRANSACTION_LIST_FAILURE: {
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

export default historyReducer;
