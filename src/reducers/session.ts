import { fromJS } from 'immutable';
import * as sessionActions from '../actions/session';
import * as navigationActions from '../actions/navigation';

const initialState = fromJS({
  token: '',
  loginFlowStep: 1,
  isEmailSending: false,
  sendEmailError: null,
  sendCodeError: null,
});

export const sessionReducer = (
  state = initialState,
  action: sessionActions.SessionActions | navigationActions.NavigationActions,
  ) => {
  switch (action.type) {
    case sessionActions.SEND_EMAIL_CODE_RESET: {
      return state
        .set('loginFlowStep', 1)
        .set('sendEmailError', null)
        .set('sendCodeError', null);
    }
    case sessionActions.SEND_EMAIL_CODE_STARTED: {
      return state
        .set('isEmailSending', true)
        .set('sendEmailError', null);
    }
    case sessionActions.SEND_EMAIL_CODE_SUCCESS: {
      return state
        .set('isEmailSending', false)
        .set('loginFlowStep', 2)
        .set('sendEmailError', null);
    }
    case sessionActions.SEND_EMAIL_CODE_FAILURE: {
      return state
        .set('isEmailSending', false)
        .set('sendEmailError', action.payload);
    }
    case sessionActions.CHECK_EMAIL_CODE_STARTED: {
      return state
        .set('isEmailSending', true)
        .set('sendCodeError', null);
    }
    case sessionActions.CHECK_EMAIL_CODE_SUCCESS: {
      return state
        .set('token', action.payload)
        .set('isEmailSending', false)
        .set('sendCodeError', null);
    }
    case sessionActions.CHECK_EMAIL_CODE_FAILURE: {
      return state
        .set('isEmailSending', false)
        .set('sendCodeError', action.payload);
    }
    case sessionActions.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export default sessionReducer;
