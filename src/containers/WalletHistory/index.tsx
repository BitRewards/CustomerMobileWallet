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
import { WalletHistoryActions } from '../../actions/walletHistory';
import SafeContainer from '../../components/SafeContainer';
import MerchantHistoryItem from '../../components/listItems/MerchantHistoryItem';
import CentredActivityIndicator from '../../components/CentredActivityIndicator';
import WalletHistoryInfoDialog from '../../components/Dialogs/WalletHistoryInfoDialog';
import { MerchantWalletHistoryItem } from '../../services/responseTypes';
import EmptyList from '../../components/EmptyList';
import {
  createStructuredSelectorWalletHistory,
} from '../../selectors/walletHistory';
import { PaginatedListProps } from '../../types/paginatedListProps';

const DEFAULT_PER_PAGE = 15;

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
    flexGrow: 1,
  },
});

export interface WalletHistoryProps extends PaginatedListProps<MerchantWalletHistoryItem> {
  refreshWalletHistory: (partnerKey: string) => void;
  fetchWalletHistory: (partnerKey: string, page: number, perPage: number) => void;
}

export interface State {
  isModalVisible: boolean;
  selectedItem?: MerchantWalletHistoryItem | null;
}

class WalletHistory extends React.Component<WalletHistoryProps, State> {
  static navigationOptions = {
    title: 'Wallet history',
    headerStyle: {
      backgroundColor: '#ffffff',
    },
  };

  constructor(props: WalletHistoryProps) {
    super(props);

    this.state = {
      isModalVisible: false,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  closeHistoryInfo = () => {
    this.setState({ isModalVisible: false });
  }

  renderItem = (listItemInfo: ListRenderItemInfo<MerchantWalletHistoryItem>) => {
    const {
      item,
    } = listItemInfo;
    const handleClick = () => {
      this.setState({
        isModalVisible: true,
        selectedItem: item,
      });
    };
    return (
      <MerchantHistoryItem
        item={item}
        onPress={handleClick}
      />
    );
  }

  keyExtractor = (item: MerchantWalletHistoryItem) => `wallet-history-${item.id}`;

  getFlatListData = () => {
    const {
      items,
    } = this.props;
    return items;
  }

  onRefresh = () => {
    const {
      refreshWalletHistory,
    } = this.props;
    const partnerKey = 'test-partner-key';
    refreshWalletHistory(partnerKey);
  }

  loadNext = () => {
    const {
      fetchWalletHistory,
      lastLoadedPage,
    } = this.props;
    const partnerKey = 'test-partner-key';
    const nextPage = lastLoadedPage + 1;
    fetchWalletHistory(partnerKey, nextPage, DEFAULT_PER_PAGE);
  }

  render() {
    const {
      isRefreshing,
      isFetching,
    } = this.props;
    const {
      isModalVisible,
      selectedItem,
    } = this.state;
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
                onEndReachedThreshold={0.3}
                ListEmptyComponent={<EmptyList emptyMessage={'no transactions'} />}
              />
            )
          }
        </View>
        <WalletHistoryInfoDialog
          onRequestClose={this.closeHistoryInfo}
          visible={isModalVisible}
          item={selectedItem}
        />
      </SafeContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  refreshWalletHistory: (partnerKey: string) => dispatch(WalletHistoryActions.refreshWalletHistoryList(partnerKey)),
  fetchWalletHistory: (partnerKey: string, page: number, perPage: number) => dispatch(WalletHistoryActions.fetchWalletHistoryList(partnerKey, page, perPage)),
});

const mapStateToProps = (): (state: any) => PaginatedListProps<MerchantWalletHistoryItem> => createStructuredSelectorWalletHistory;

export default connect(mapStateToProps, mapDispatchToProps)(WalletHistory);
