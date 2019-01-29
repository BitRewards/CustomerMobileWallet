import { createSelector } from 'reselect';

const makeSelectMerchant = (state: any) => {
  return state.merchant;
};

const makeSelectMerchantIsFetching = createSelector(
  makeSelectMerchant,
  (merchantState: any): number => merchantState.get('isFetching'),
);

const makeSelectMerchantPartnerKey = createSelector(
  makeSelectMerchant,
  (merchantState: any): number => merchantState.get('partnerKey'),
);

const makeSelectMerchantTitle = createSelector(
  makeSelectMerchant,
  (merchantState: any): number => merchantState.get('title'),
);

const makeSelectMerchantImage = createSelector(
  makeSelectMerchant,
  (merchantState: any): number => merchantState.get('image'),
);

const makeSelectMerchantBalanceAmount = createSelector(
  makeSelectMerchant,
  (merchantState: any): number => merchantState.get('balanceAmount'),
);

const makeSelectMerchantFiatAmount = createSelector(
  makeSelectMerchant,
  (merchantState: any): number => merchantState.get('fiatAmount'),
);

const makeSelectMerchantFiatCurrency = createSelector(
  makeSelectMerchant,
  (merchantState: any): string => merchantState.get('fiatCurrency'),
);

const makeSelectMerchantCouponsCount = createSelector(
  makeSelectMerchant,
  (merchantState: any): number => merchantState.get('couponsCount'),
);

const makeSelectMerchantError = createSelector(
  makeSelectMerchant,
  (merchantState: any): number => merchantState.get('error'),
);

const makeSelectMerchantSettings = createSelector(
  makeSelectMerchant,
  (merchantState: any): number => merchantState.get('settings'),
);

const makeSelectMerchantEthAddress = createSelector(
  makeSelectMerchant,
  (merchantState: any): string => merchantState.get('ethAddress'),
);

export {
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
  makeSelectMerchantEthAddress,
};
