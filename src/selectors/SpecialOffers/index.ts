import { createStructuredSelector } from 'reselect';
import { createStructuredSelectorSpecialOffersActions } from './specialOffersActions';
import { createStructuredSelectorSpecialOffersRewards } from './specialOffersRewards';

export const createStructuredSelectorSpecialOffers = createStructuredSelector<any, any, any>({
  actionsList: createStructuredSelectorSpecialOffersActions,
  rewardsList: createStructuredSelectorSpecialOffersRewards,
});
