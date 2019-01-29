import { createStructuredSelector } from 'reselect';
import { createStructuredSelectorMerchantActions } from './merchantActions';
import { createStructuredSelectorMerchantRewards } from './merchantRewards';
import { createStructuredSelectorMerchantCoupons } from './merchantCoupons';
import {
  makeSelectMerchantIsFetching,
  makeSelectMerchantPartnerKey,
  makeSelectMerchantTitle,
  makeSelectMerchantImage,
  makeSelectMerchantBalanceAmount,
  makeSelectMerchantFiatAmount,
  makeSelectMerchantFiatCurrency,
  makeSelectMerchantCouponsCount,
  makeSelectMerchantError,
  makeSelectMerchantSettings,
} from '../merchant';
import {
  makeSelectCurrencyRates,
} from '../currency';

export const createStructuredSelectorWalletMerchant = createStructuredSelector<any, any, any>({
  isFetching: makeSelectMerchantIsFetching,
  partnerKey: makeSelectMerchantPartnerKey,
  title: makeSelectMerchantTitle,
  image: makeSelectMerchantImage,
  balanceAmount: makeSelectMerchantBalanceAmount,
  fiatAmount: makeSelectMerchantFiatAmount,
  fiatCurrency: makeSelectMerchantFiatCurrency,
  couponsCount: makeSelectMerchantCouponsCount,
  error: makeSelectMerchantError,
  settings: makeSelectMerchantSettings,
  currencyRates: makeSelectCurrencyRates,
  merchantActions: createStructuredSelectorMerchantActions,
  merchantRewards: createStructuredSelectorMerchantRewards,
  merchantCoupons: createStructuredSelectorMerchantCoupons,
});
