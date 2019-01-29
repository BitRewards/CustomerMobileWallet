import * as React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Image,
  FlatList,
  RefreshControl,
  ListRenderItemInfo,
} from 'react-native';
import {
  NavigationInjectedProps,
  SafeAreaView,
} from 'react-navigation';
import { Selector } from 'reselect';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Touchable from '../../components/Touchable';
import TypeDeposit from '../../components/DepositItems/TypeDeposit';
import CentredActivityIndicator from '../../components/CentredActivityIndicator';
import { NavigationActions } from '../../actions/navigation';
import { DepositHistoryActions } from '../../actions/depositHistory';
import {
  createStructuredSelectorDepositHistory,
} from '../../selectors/WalletMerchant/depositHistory';
import { MerchantDepositHistoryItem } from '../../services/responseTypes';
import EmptyList from '../../components/EmptyList';
import MerchantHistoryItem from '../../components/listItems/MerchantHistoryItem';
import { PaginatedListProps } from '../../types/paginatedListProps';

const DEFAULT_PER_PAGE = 15;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignContent: 'space-between',
    backgroundColor: '#f3f3f3',
  },
  body: {
    backgroundColor: '#fff',
  },
  title: {
    color: '#303645',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'ProximaNova-Semibold',
    marginTop: 70,
    marginHorizontal: 18,
  },
  typeDepositsContainer: {
    paddingVertical: 30,
  },
  listContainerWrapper: {
    flex: 1,
    flexGrow: 1,
  },
  listContainer: {
    flexGrow: 1,
    flex: 1,
    padding: 0,
    margin: 0,
  },
  listTitle: {
    fontFamily: 'ProximaNova-Regular',
    color: '#30364580',
    paddingTop: 12,
    paddingHorizontal: 28,
    paddingBottom: 8,
  },
  backArrowWrapper: {
    top: 0,
    left: 0,
    width: 42,
    height: 40,
    position: 'absolute',
  },
  backArrowBox: {
    width: 42,
    height: 40,
    padding: 7,
  },
  backArrowImage: {
    width: 20,
    height: 18,
    margin: 4,
  },
});

export interface OwnProps {
}

interface StateProps extends PaginatedListProps<MerchantDepositHistoryItem> {
}

interface DispatchProps {
  openDepositEthToBitStep1: (partnerKey: string) => void;
  openDepositFromMyEthereumWalletStep1: (partnerKey: string) => void;
  openDepositFromOtherStoreStep1: () => void;
  refreshDepositHistory: (partnerKey: string) => void;
  fetchDepositHistory: (partnerKey: string, page: number, perPage: number) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

export interface State { }

class Deposit extends React.Component<Props & NavigationInjectedProps, State> {
  static navigationOptions = { header: null };

  partnerKey: string | null = null;

  componentDidMount() {
    this.partnerKey = this.props.navigation.getParam('partnerKey', null);
    this.onRefresh();
  }

  onRefresh = () => {
    const {
      refreshDepositHistory,
    } = this.props;
    if (typeof this.partnerKey === 'string' && this.partnerKey.length > 0) {
      refreshDepositHistory(this.partnerKey);
    }
  }

  handleBack = () => {
    const {
      navigation,
    } = this.props;
    navigation.goBack();
  }

  keyExtractor = (item: MerchantDepositHistoryItem) => `deposit-history-${item.id}`;

  renderItem = (listItemInfo: ListRenderItemInfo<MerchantDepositHistoryItem>) => {
    const {
      item,
    } = listItemInfo;
    return (
      <MerchantHistoryItem
        // @ts-ignore
        item={item}
      />
    );
  }

  loadNext = () => {
    const {
      fetchDepositHistory,
      lastLoadedPage,
    } = this.props;
    if (typeof this.partnerKey === 'string' && this.partnerKey.length > 0) {
      const nextPage = lastLoadedPage + 1;
      fetchDepositHistory(this.partnerKey, nextPage, DEFAULT_PER_PAGE);
    }
  }

  fromMyEthereumWallet = () => {
    const {
      openDepositFromMyEthereumWalletStep1,
    } = this.props;
    if (typeof this.partnerKey === 'string' && this.partnerKey.length > 0) {
      openDepositFromMyEthereumWalletStep1(this.partnerKey);
    }
  }

  openDepositEthToBitStep1 = () => {
    const {
      openDepositEthToBitStep1,
    } = this.props;
    if (typeof this.partnerKey === 'string' && this.partnerKey.length > 0) {
      openDepositEthToBitStep1(this.partnerKey);
    }
  }

  render() {
    const {
      // openDepositFromOtherStoreStep1,
      isRefreshing,
      isFetching,
      items,
    } = this.props;
    // const fromOtherStore = () => openDepositFromOtherStoreStep1();
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#ffffff'
        />
        <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.title}>
              {'Where do you want to deposit BIT from?'}
            </Text>
            <View style={styles.typeDepositsContainer}>
              <TypeDeposit onPress={this.fromMyEthereumWallet} image={require('../../img/wallet.png')} text='From my Ethereum wallet' />
              {/*<TypeDeposit onPress={fromOtherStore} image={require('../../img/Shop.png')} text='From other BitRewards store' />*/}
              <TypeDeposit onPress={this.openDepositEthToBitStep1} image={require('../../img/Exchange.png')} text='Exchange ETH to BIT' />
            </View>
            <View style={styles.backArrowWrapper}>
              <Touchable onPress={this.handleBack}>
                <View style={styles.backArrowBox}>
                  <Image source={require('../../img/back_arrow.png')} style={styles.backArrowImage} />
                </View>
              </Touchable>
            </View>
          </View>
          <Text style={styles.listTitle}>
            {'Your deposit\'s transactions'}
          </Text>
          <View style={styles.listContainerWrapper}>
            {
              isFetching && items.length <= 0 && (
                <CentredActivityIndicator />
              )
            }
            {
              (!isFetching || items.length > 0) && (
                <FlatList
                  contentContainerStyle={styles.listContainer}
                  data={items}
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
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  openDepositEthToBitStep1: (partnerKey: string) => dispatch(NavigationActions.openDepositEthToBitStep1(partnerKey)),
  openDepositFromMyEthereumWalletStep1: (partnerKey: string) => dispatch(NavigationActions.openDepositFromMyEthereumWalletStep1(partnerKey)),
  openDepositFromOtherStoreStep1: () => dispatch(NavigationActions.openDepositFromOtherStoreStep1()),
  refreshDepositHistory: (partnerKey: string) => dispatch(DepositHistoryActions.refreshDepositHistoryList(partnerKey)),
  fetchDepositHistory: (partnerKey: string, page: number, perPage: number) => dispatch(DepositHistoryActions.fetchDepositHistoryList(partnerKey, page, perPage)),
});

const mapStateToProps = () => createStructuredSelectorDepositHistory;

export default connect<Selector<any, StateProps>, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Deposit);
