import {
  createPaginatedListStructuredSelector,
} from './helpers/basePaginatedList';
import { MerchantWalletHistoryItem } from '../services/responseTypes';

const makeSelectWalletHistory = (state: any) => {
  return state.walletHistory;
};

const createStructuredSelectorWalletHistory = createPaginatedListStructuredSelector<MerchantWalletHistoryItem>(makeSelectWalletHistory);

export {
  createStructuredSelectorWalletHistory,
};
