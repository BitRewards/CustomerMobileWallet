/**
 * FAQ.
 */

import { createAction } from './helpers';
import { ActionsUnion } from './types';
import { FaqItem } from '../services/responseTypes';

export const FETCH_FAQ_LIST_STARTED = 'FETCH_FAQ_LIST_STARTED';
export const FETCH_FAQ_LIST_SUCCESS = 'FETCH_FAQ_LIST_SUCCESS';
export const FETCH_FAQ_LIST_FAILURE = 'FETCH_FAQ_LIST_FAILURE';

export const FaqActions = {
  fetchFaqList: (partnerKey: string) => createAction(
    FETCH_FAQ_LIST_STARTED,
    { partnerKey },
  ),
  fetchFaqListSuccess: (items: [FaqItem]) => createAction(FETCH_FAQ_LIST_SUCCESS, items),
  fetchFaqListFailure: (error: any) => createAction(FETCH_FAQ_LIST_FAILURE, error),
};

export type FaqActions = ActionsUnion<typeof FaqActions>;
