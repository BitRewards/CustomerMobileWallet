import {
  createPaginatedListStructuredSelector,
} from '../helpers/basePaginatedList';

import { MerchantCouponItem } from '../../services/responseTypes';

const makeSelectMerchantCoupons = (state: any) => {
  return state.merchantCoupons;
};

const createStructuredSelectorMerchantCoupons = createPaginatedListStructuredSelector<MerchantCouponItem>(makeSelectMerchantCoupons);

export {
  createStructuredSelectorMerchantCoupons,
};
