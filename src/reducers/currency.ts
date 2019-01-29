import { fromJS } from 'immutable';
import * as currencyActions from '../actions/currency';

const initialState = fromJS({
  isFetching: false,
  currencyRates: null,
});

export const currencyReducer = (state = initialState, action: currencyActions.currencyActions) => {
  switch (action.type) {
    case currencyActions.FETCH_CURRENCY_STARTED:
      return state.set('isFetching', true);
    case currencyActions.FETCH_CURRENCY_SUCCESS:
      return state
        .set('isFetching', false)
        .set('currencyRates', action.payload);
    default: return state;

  }
};

export default currencyReducer;
