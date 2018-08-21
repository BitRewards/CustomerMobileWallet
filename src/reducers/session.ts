import { fromJS } from 'immutable';
import * as sessionActions from '../actions/session';

const initialState = fromJS({
  token: '',
});

export const sessionReducer = (state = initialState, action: sessionActions.SessionActions) => {
  switch (action.type) {
    case sessionActions.LOGOUT: {
      return state
        .set('token', '');
    }
    default:
      return state;
  }
};

export default sessionReducer;
