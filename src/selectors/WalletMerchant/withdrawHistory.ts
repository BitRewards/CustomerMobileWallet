import {
  createPaginatedListStructuredSelector,
} from '../helpers/basePaginatedList';

import { MerchantWithdrawHistoryItem } from '../../services/responseTypes';

const makeSelectWithdrawHistory = (state: any) => {
  return state.merchantWithdrawHistory;
};

const createStructuredSelectorWithdrawHistory = createPaginatedListStructuredSelector<MerchantWithdrawHistoryItem>(makeSelectWithdrawHistory);

export {
  createStructuredSelectorWithdrawHistory,
};
