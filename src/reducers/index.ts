import { combineReducers } from 'redux';
import session from './session';
import navigation from './navigation';
import history from './history';
import wallet from './wallet';
import merchant from './merchant';
import specialOffers from './specialOffers';

const reducers = combineReducers({
  nav: navigation,
  session,
  history,
  wallet,
  merchant,
  specialOffers,
});

export default reducers;
