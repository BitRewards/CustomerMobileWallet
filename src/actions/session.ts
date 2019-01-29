import { createAction } from './helpers';
import { ActionsUnion } from './types';

export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const SEND_EMAIL_CODE_RESET = 'SEND_EMAIL_CODE_RESET';
export const SEND_EMAIL_CODE_STARTED = 'SEND_EMAIL_CODE_STARTED';
export const SEND_EMAIL_CODE_SUCCESS = 'SEND_EMAIL_CODE_SUCCESS';
export const SEND_EMAIL_CODE_FAILURE = 'SEND_EMAIL_CODE_FAILURE';
export const CHECK_EMAIL_CODE_STARTED = 'CHECK_EMAIL_CODE_STARTED';
export const CHECK_EMAIL_CODE_SUCCESS = 'CHECK_EMAIL_CODE_SUCCESS';
export const CHECK_EMAIL_CODE_FAILURE = 'CHECK_EMAIL_CODE_FAILURE';

export const SessionActions = {
  login: (authToken: string) => createAction(LOGIN, {
    authToken,
  }),
  loginRequest: () => createAction(LOGIN_REQUEST),
  loginSuccess: () => createAction(LOGIN_SUCCESS),
  logout: () => createAction(LOGOUT),
  sendEmailCodeReset: () => createAction(SEND_EMAIL_CODE_RESET),
  sendEmailCode: (email: string) => createAction(SEND_EMAIL_CODE_STARTED, email),
  sendEmailCodeSuccess: () => createAction(SEND_EMAIL_CODE_SUCCESS),
  sendEmailCodeFailure: (error: any) => createAction(SEND_EMAIL_CODE_FAILURE, error),
  checkEmailCode: (email: string, code: string) => createAction(
    CHECK_EMAIL_CODE_STARTED,
    {
      email,
      code,
    },
  ),
  checkEmailCodeSuccess: (authToken: string) => createAction(CHECK_EMAIL_CODE_SUCCESS, authToken),
  checkEmailCodeFailure: (error: any) => createAction(CHECK_EMAIL_CODE_FAILURE, error),
};

export type SessionActions = ActionsUnion<typeof SessionActions>;
