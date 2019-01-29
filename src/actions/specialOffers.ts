/**
 * Special Offers.
 */

import { createAction } from './helpers';
import { ActionsUnion } from './types';
import {
  OfferActionItem,
  OfferRewardItem,
} from '../services/responseTypes';

export const REFRESH_OFFER_ACTIONS_LIST = 'REFRESH_OFFER_ACTIONS_LIST';
export const FETCH_OFFER_ACTIONS_LIST_STARTED = 'FETCH_OFFER_ACTIONS_LIST_STARTED';
export const FETCH_OFFER_ACTIONS_LIST_SUCCESS = 'FETCH_OFFER_ACTIONS_LIST_SUCCESS';
export const FETCH_OFFER_ACTIONS_LIST_FAILURE = 'FETCH_OFFER_ACTIONS_LIST_FAILURE';
export const REFRESH_OFFER_REWARD_LIST = 'REFRESH_OFFER_REWARD_LIST';
export const FETCH_OFFER_REWARD_LIST_STARTED = 'FETCH_OFFER_REWARD_LIST_STARTED';
export const FETCH_OFFER_REWARD_LIST_SUCCESS = 'FETCH_OFFER_REWARD_LIST_SUCCESS';
export const FETCH_OFFER_REWARD_LIST_FAILURE = 'FETCH_OFFER_REWARD_LIST_FAILURE';

export const SpecialOfferActions = {
  refreshOfferActionsList: () => createAction(REFRESH_OFFER_ACTIONS_LIST),
  fetchOfferActionsList: (page: number, perPage: number) => createAction(
    FETCH_OFFER_ACTIONS_LIST_STARTED,
    { page, perPage },
  ),
  fetchOfferActionsListSuccess: (page: number, items: [OfferActionItem]) => createAction(
    FETCH_OFFER_ACTIONS_LIST_SUCCESS,
    { page, items },
  ),
  fetchOfferActionsListFailure: (error: any) => createAction(FETCH_OFFER_ACTIONS_LIST_FAILURE, error),
  refreshOfferRewardList: () => createAction(REFRESH_OFFER_REWARD_LIST),
  fetchOfferRewardList: (page: number, perPage: number) => createAction(
    FETCH_OFFER_REWARD_LIST_STARTED,
    { page, perPage },
  ),
  fetchOfferRewardListSuccess: (page: number, items: [OfferRewardItem]) => createAction(
    FETCH_OFFER_REWARD_LIST_SUCCESS,
    { page, items },
  ),
  fetchOfferRewardListFailure: (error: any) => createAction(FETCH_OFFER_REWARD_LIST_FAILURE, error),
};

export type SpecialOfferActions = ActionsUnion<typeof SpecialOfferActions>;
