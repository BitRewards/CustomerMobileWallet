import {
  createPaginatedListStructuredSelector,
} from '../helpers/basePaginatedList';

import { OfferRewardItem } from '../../services/responseTypes';

const makeSelectSpecialOffersRewards = (state: any) => {
  return state.specialOffers.get('rewards');
};

export const createStructuredSelectorSpecialOffersRewards = createPaginatedListStructuredSelector<OfferRewardItem>(makeSelectSpecialOffersRewards);
