import { createAction } from './helpers';
import { ActionsUnion } from './types';

export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const SessionActions = {
  login: () => createAction(LOGIN),
  loginRequest: () => createAction(LOGIN_REQUEST),
  loginSuccess: () => createAction(LOGIN_SUCCESS),
  logout: () => createAction(LOGOUT),
};

export type SessionActions = ActionsUnion<typeof SessionActions>;
