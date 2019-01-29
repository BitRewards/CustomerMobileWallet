import {
  createPaginatedListStructuredSelector,
} from '../helpers/basePaginatedList';

import { MerchantRewardItem } from '../../services/responseTypes';

const makeSelectMerchantRewards = (state: any) => {
  return state.merchantRewards;
};

const createStructuredSelectorMerchantRewards = createPaginatedListStructuredSelector<MerchantRewardItem>(makeSelectMerchantRewards);

export {
  createStructuredSelectorMerchantRewards,
};
