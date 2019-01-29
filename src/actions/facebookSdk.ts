import { createAction } from './helpers';
import { ActionsUnion } from './types';

export const LOGIN_VIA_FACEBOOK = 'LOGIN_VIA_FACEBOOK';
export const LOGIN_VIA_FACEBOOK_SUCCESS = 'LOGIN_VIA_FACEBOOK_SUCCESS';
export const LOGIN_VIA_FACEBOOK_FAILURE = 'LOGIN_VIA_FACEBOOK_FAILURE';

export const LoginViaFacebookActions = {
  loginViaFacebook: () => createAction(LOGIN_VIA_FACEBOOK),
  loginViaFacebookSuccess: (accessToken: string) => createAction(LOGIN_VIA_FACEBOOK_SUCCESS, { accessToken }),
  loginViaFacebookFailure: (error: any) => createAction(LOGIN_VIA_FACEBOOK_FAILURE, error),
};

export type LoginViaFacebookActions = ActionsUnion<typeof LoginViaFacebookActions>;
