import * as React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HistoryActions } from '../../actions/history';
import SafeContainer from '../../components/SafeContainer';
import WalletHistoryItem from '../../components/listItems/WalletHistoryItem';
import { PersonTransactionItem } from '../../services/responseTypes';
import CentredActivityIndicator from '../../components/CentredActivityIndicator';
import {
  createStructuredSelectorTransactionHistory,
} from '../../selectors/history';
import EmptyList from '../../components/EmptyList';
import { PaginatedListProps } from '../../types/paginatedListProps';
import { NavigationInjectedProps } from 'react-navigation';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  listContainer: {
    paddingTop: 15,
    paddingBottom: 9,
  },
});

const DEFAULT_PER_PAGE = 15;

export interface HistoryProps extends PaginatedListProps<PersonTransactionItem> {
  refreshHistory: () => void;
  fetchHistory: (page: number, perPage: number) => any;
}

export interface State { }

class History extends React.Component<HistoryProps & NavigationInjectedProps, State> {
  static navigationOptions = {
    title: 'History',
    headerStyle: {
      backgroundColor: '#ffffff',
    },
  };

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = () => {
    const {
      refreshHistory,
    } = this.props;
    refreshHistory();
  }

  loadNext = () => {
    const {
      fetchHistory,
      lastLoadedPage,
      isReachedEnd,
    } = this.props;
    if (!isReachedEnd) {
      const nextPage = lastLoadedPage + 1;
      fetchHistory(nextPage, DEFAULT_PER_PAGE);
    }
  }

  renderItem = (listItemInfo: ListRenderItemInfo<any>) => {
    const {
      item,
    } = listItemInfo;
    return (
      <WalletHistoryItem
        item={item}
      />
    );
  }

  keyExtractor = (item: any, index: number) => `wallet-history-${index}`;

  getFlatListData = () => {
    const {
      items,
    } = this.props;
    return items;
  }

  render() {
    const {
      isRefreshing,
      isFetching,
    } = this.props;
    const flatListData = this.getFlatListData();
    return (
      <SafeContainer>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#ffffff'
        />
        <View style={styles.container}>
          {
            isFetching && flatListData.length <= 0 && (
              <CentredActivityIndicator />
            )
          }
          {
            (!isFetching || flatListData.length > 0) && (
              <FlatList
                contentContainerStyle={styles.listContainer}
                data={flatListData}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                refreshControl={(
                  <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={this.onRefresh}
                  />
                )}
                onEndReached={this.loadNext}
                ListEmptyComponent={<EmptyList emptyMessage={'no transactions'} />}
              />
            )
          }
        </View>
      </SafeContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  refreshHistory: () => dispatch(HistoryActions.refreshTransactionList()),
  fetchHistory: (page: number, perPage: number) => dispatch(HistoryActions.fetchTransactionList(page, perPage)),
});

const mapStateToProps = (): (state: any) => PaginatedListProps<PersonTransactionItem> => createStructuredSelectorTransactionHistory;

export default connect(mapStateToProps, mapDispatchToProps)(History);
