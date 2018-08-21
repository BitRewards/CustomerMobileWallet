import { createSelector } from 'reselect';

export const walletItemsSelector = state => state.wallet.get('items').toJS();

export const totalBalanceAmountSelector = createSelector(
  walletItemsSelector,
  items => items.reduce((acc, item) => acc + item.balanceAmount, 0),
);

export const totalFiatAmountSelector = createSelector(
  walletItemsSelector,
  items => items.reduce((acc, item) => acc + item.fiatAmount, 0),
);
