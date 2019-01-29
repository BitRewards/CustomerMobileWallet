/**
 * FAQ.
 */

import * as faqActions from '../actions/faq';
import { reducerListFactory } from './helpers/baseList';

export const faqReducer = reducerListFactory(
  faqActions.FETCH_FAQ_LIST_STARTED,
  faqActions.FETCH_FAQ_LIST_SUCCESS,
  faqActions.FETCH_FAQ_LIST_FAILURE,
);

export default faqReducer;
