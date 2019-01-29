/**
 * Current user profile.
 */

import { createAction } from './helpers';
import { ActionsUnion } from './types';
import { CurrentUserResponse } from '../services/responseTypes';

export const FETCH_CURRENT_USER_STARTED = 'FETCH_CURRENT_USER_STARTED';
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const FETCH_CURRENT_USER_FAILURE = 'FETCH_CURRENT_USER_FAILURE';

export const ProfileActions = {
  fetchCurrentUser: (partnerKey: string) => createAction(
    FETCH_CURRENT_USER_STARTED,
    { partnerKey },
  ),
  fetchCurrentUserSuccess: (profile: CurrentUserResponse) => createAction(
    FETCH_CURRENT_USER_SUCCESS,
    { profile },
  ),
  fetchCurrentUserFailure: (error: any) => createAction(FETCH_CURRENT_USER_FAILURE, error),
};

export type ProfileActions = ActionsUnion<typeof ProfileActions>;
