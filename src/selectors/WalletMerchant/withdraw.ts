import { createStructuredSelector } from 'reselect';
import { createStructuredSelectorWithdrawHistory } from './withdrawHistory';
import { makeSelectMerchantBalanceAmount, makeSelectMerchantFiatCurrency} from '../merchant';
import { makeSelectCurrencyRates } from '../currency';
import { FromMyWalletStateProps } from '../../containers/WalletMerchant/Withdraw';

export const createStructuredSelectorWithdraw = createStructuredSelector<any, FromMyWalletStateProps, FromMyWalletStateProps>({
  balanceAmount: makeSelectMerchantBalanceAmount,
  fiatCurrency: makeSelectMerchantFiatCurrency,
  withdrawHistory: createStructuredSelectorWithdrawHistory,
  currencyRates: makeSelectCurrencyRates,
});
