/**
 * Special Offers.
 */

import { createAction } from './helpers';
import { ActionsUnion } from './types';
import {
  OfferActionItem,
  OfferRewardItem,
} from '../services/responseTypes';

export const FETCH_OFFER_ACTIONS_LIST_STARTED = 'FETCH_OFFER_ACTIONS_LIST_STARTED';
export const FETCH_OFFER_ACTIONS_LIST_SUCCESS = 'FETCH_OFFER_ACTIONS_LIST_SUCCESS';
export const FETCH_OFFER_ACTIONS_LIST_FAILURE = 'FETCH_OFFER_ACTIONS_LIST_FAILURE';
export const FETCH_OFFER_REWARD_LIST_STARTED = 'FETCH_OFFER_REWARD_LIST_STARTED';
export const FETCH_OFFER_REWARD_LIST_SUCCESS = 'FETCH_OFFER_REWARD_LIST_SUCCESS';
export const FETCH_OFFER_REWARD_LIST_FAILURE = 'FETCH_OFFER_REWARD_LIST_FAILURE';

export const SpecialOfferActions = {
  fetchOfferActionsList: (page: number, perPage: number) => createAction(
    FETCH_OFFER_ACTIONS_LIST_STARTED,
    { page, perPage },
  ),
  fetchOfferActionsListSuccess: (items: [OfferActionItem]) => createAction(FETCH_OFFER_ACTIONS_LIST_SUCCESS, items),
  fetchOfferActionsListFailure: (error: any) => createAction(FETCH_OFFER_ACTIONS_LIST_FAILURE, error),
  fetchOfferRewardList: (page: number, perPage: number) => createAction(
    FETCH_OFFER_REWARD_LIST_STARTED,
    { page, perPage },
  ),
  fetchOfferRewardListSuccess: (items: [OfferRewardItem]) => createAction(FETCH_OFFER_REWARD_LIST_SUCCESS, items),
  fetchOfferRewardListFailure: (error: any) => createAction(FETCH_OFFER_REWARD_LIST_FAILURE, error),
};

export type SpecialOfferActions = ActionsUnion<typeof SpecialOfferActions>;
