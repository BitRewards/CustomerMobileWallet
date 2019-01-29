import {
  createPaginatedListStructuredSelector,
} from './helpers/basePaginatedList';
import { PersonTransactionItem } from '../services/responseTypes';

const makeSelectHistory = (state: any) => {
  return state.history;
};

const createStructuredSelectorTransactionHistory = createPaginatedListStructuredSelector<PersonTransactionItem>(makeSelectHistory);

export {
  createStructuredSelectorTransactionHistory,
};
