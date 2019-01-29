export interface PaginatedListProps<T> {
  isRefreshing: boolean;
  isFetching: boolean;
  items: [T];
  error: any;
  lastLoadedPage: number;
  isReachedEnd: boolean;
}
