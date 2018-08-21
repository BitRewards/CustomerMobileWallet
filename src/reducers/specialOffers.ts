/**
 * Special Offers.
 */

import { fromJS, List } from 'immutable';
import * as sessionActions from '../actions/session';
import * as specialOffersActions from '../actions/specialOffers';

const initialState = fromJS({
  isFetching: false,
  actionItems: [],
  rewardItems: [],
  error: null,
});

export const specialOffersReducer = (state = initialState, action: sessionActions.SessionActions | specialOffersActions.SpecialOfferActions) => {
  switch (action.type) {
    case specialOffersActions.FETCH_OFFER_ACTIONS_LIST_STARTED: {
      return state
        .set('isFetching', true)
        .set('error', null);
    }
    case specialOffersActions.FETCH_OFFER_ACTIONS_LIST_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('actionItems', List(action.payload))
        .set('error', null);
    }
    case specialOffersActions.FETCH_OFFER_ACTIONS_LIST_FAILURE: {
      return state
        .set('isFetching', false)
        .set('error', action.payload);
    }
    case specialOffersActions.FETCH_OFFER_REWARD_LIST_STARTED: {
      return state
        .set('isFetching', true)
        .set('error', null);
    }
    case specialOffersActions.FETCH_OFFER_REWARD_LIST_SUCCESS: {
      return state
        .set('isFetching', false)
        .set('rewardItems', List(action.payload))
        .set('error', null);
    }
    case specialOffersActions.FETCH_OFFER_REWARD_LIST_FAILURE: {
      return state
        .set('isFetching', false)
        .set('error', action.payload);
    }
    case sessionActions.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export default specialOffersReducer;
