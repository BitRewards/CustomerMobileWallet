import {
  createSelector,
  createStructuredSelector,
} from 'reselect';
import { PaginatedListProps } from '../../types/paginatedListProps';

export const makeSelectIsFetching = (makeSelectPaginatedListState: (state: any) => any) => createSelector(
  makeSelectPaginatedListState,
  (paginatedListState: any): boolean => paginatedListState.get('isFetching'),
);

export const makeSelectIsRefreshing = (makeSelectPaginatedListState: (state: any) => any) => createSelector(
  makeSelectPaginatedListState,
  (paginatedListState: any): boolean => paginatedListState.get('isRefreshing'),
);

export const makeSelectItems = <T = any>(makeSelectPaginatedListState: (state: any) => any) => createSelector(
  makeSelectPaginatedListState,
  (paginatedListState: any): [T] => paginatedListState.get('items').toJS(),
);

export const makeSelectError = (makeSelectPaginatedListState: (state: any) => any) => createSelector(
  makeSelectPaginatedListState,
  (paginatedListState: any): any => paginatedListState.get('error'),
);

export const makeSelectLastLoadedPage = (makeSelectPaginatedListState: (state: any) => any) => createSelector(
  makeSelectPaginatedListState,
  (paginatedListState: any): number => paginatedListState.get('lastLoadedPage'),
);

export const makeSelectIsReachEnd = (makeSelectPaginatedListState: (state: any) => any) => createSelector(
  makeSelectPaginatedListState,
  (paginatedListState: any): boolean => paginatedListState.get('isReachEnd'),
);

export const createPaginatedListStructuredSelector = <T = any>(listState: any) => createStructuredSelector<PaginatedListProps<T>, PaginatedListProps<T>>({
  isFetching: makeSelectIsFetching(listState),
  isRefreshing: makeSelectIsRefreshing(listState),
  items: makeSelectItems<T>(listState),
  error: makeSelectError(listState),
  lastLoadedPage: makeSelectLastLoadedPage(listState),
  isReachedEnd: makeSelectIsReachEnd(listState),
});
