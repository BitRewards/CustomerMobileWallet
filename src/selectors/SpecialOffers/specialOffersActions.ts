import {
  createPaginatedListStructuredSelector,
} from '../helpers/basePaginatedList';

import { OfferActionItem } from '../../services/responseTypes';

const makeSelectSpecialOffersActions = (state: any) => {
  return state.specialOffers.get('actions');
};

export const createStructuredSelectorSpecialOffersActions = createPaginatedListStructuredSelector<OfferActionItem>(makeSelectSpecialOffersActions);
