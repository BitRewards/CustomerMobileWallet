import { combineReducers } from 'redux';
import session from './session';
import navigation from './navigation';
import history from './history';
import walletHistory from './walletHistory';
import faq from './faq';
import wallet from './wallet';
import merchant from './merchant';
import merchantActions from './merchantActions';
import merchantCoupons from './merchantCoupons';
import merchantRewards from './merchantRewards';
import merchantWithdrawHistory from './merchantWithdrawHistory';
import merchantDepositHistory from './merchantDepositHistory';
import specialOffers from './specialOffers';
import profile from './profile';
import netInfo from './netInfo';
import currency from './currency';

const reducers = combineReducers({
  nav: navigation,
  session,
  history,
  walletHistory,
  faq,
  wallet,
  merchant,
  merchantActions,
  merchantCoupons,
  merchantRewards,
  merchantWithdrawHistory,
  merchantDepositHistory,
  specialOffers,
  profile,
  netInfo,
  currency,
});

export default reducers;
