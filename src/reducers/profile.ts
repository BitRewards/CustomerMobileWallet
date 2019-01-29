/**
 * Current user profile.
 */

import { fromJS, List } from 'immutable';
import * as sessionActions from '../actions/session';
import * as profileActions from '../actions/profile';

const initialState = fromJS({
  isFetching: false,
  email: null,
  key: null,
  name: null,
  picture: null,
  phone: null,
  balance: 0,
  codes: [],
  tracking: null,
  title: null,
  error: null,
});

export const profileReducer = (state = initialState, action: sessionActions.SessionActions | profileActions.ProfileActions) => {
  switch (action.type) {
    case profileActions.FETCH_CURRENT_USER_STARTED: {
      return state
        .set('isFetching', true)
        .set('error', null);
    }
    case profileActions.FETCH_CURRENT_USER_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('email', action.payload.profile.email)
        .set('key', action.payload.profile.key)
        .set('name', action.payload.profile.name)
        .set('picture', action.payload.profile.picture)
        .set('phone', action.payload.profile.phone)
        .set('balance', action.payload.profile.balance)
        .set('codes', List(action.payload.profile.codes))
        .set('tracking', action.payload.profile.tracking)
        .set('title', action.payload.profile.title)
        .set('error', null);
    }
    case profileActions.FETCH_CURRENT_USER_FAILURE: {
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

export default profileReducer;
