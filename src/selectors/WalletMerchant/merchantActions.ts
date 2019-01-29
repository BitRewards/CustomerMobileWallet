import {
  createPaginatedListStructuredSelector,
} from '../helpers/basePaginatedList';

import { MerchantActionItem } from '../../services/responseTypes';

const makeSelectMerchantActions = (state: any) => {
  return state.merchantActions;
};

const createStructuredSelectorMerchantActions = createPaginatedListStructuredSelector<MerchantActionItem>(makeSelectMerchantActions);

export {
  createStructuredSelectorMerchantActions,
};
