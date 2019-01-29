/**
 * Special Offers.
 */

import { Reducer } from 'redux';
import { combineReducers } from 'redux-immutable';
import * as specialOffersActions from '../actions/specialOffers';
import { reducerPaginatedListFactory } from './helpers/basePaginatedList';

const actionsReducer: Reducer = reducerPaginatedListFactory(
  specialOffersActions.FETCH_OFFER_ACTIONS_LIST_STARTED,
  specialOffersActions.FETCH_OFFER_ACTIONS_LIST_SUCCESS,
  specialOffersActions.FETCH_OFFER_ACTIONS_LIST_FAILURE,
  specialOffersActions.REFRESH_OFFER_ACTIONS_LIST,
);

const rewardsReducer: Reducer = reducerPaginatedListFactory(
  specialOffersActions.FETCH_OFFER_REWARD_LIST_STARTED,
  specialOffersActions.FETCH_OFFER_REWARD_LIST_SUCCESS,
  specialOffersActions.FETCH_OFFER_REWARD_LIST_FAILURE,
  specialOffersActions.REFRESH_OFFER_REWARD_LIST,
);

export const specialOffersReducer: Reducer = combineReducers({
  actions: actionsReducer,
  rewards: rewardsReducer,
});

export default specialOffersReducer;
