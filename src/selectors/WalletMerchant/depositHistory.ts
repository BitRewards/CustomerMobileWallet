import {
  createPaginatedListStructuredSelector,
} from '../helpers/basePaginatedList';
import { MerchantDepositHistoryItem } from '../../services/responseTypes';

const makeSelectDepositHistory = (state: any) => {
  return state.merchantDepositHistory;
};

const createStructuredSelectorDepositHistory = createPaginatedListStructuredSelector<MerchantDepositHistoryItem>(makeSelectDepositHistory);

export {
  createStructuredSelectorDepositHistory,
};
