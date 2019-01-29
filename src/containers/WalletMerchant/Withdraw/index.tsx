import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  RefreshControl,
  ListRenderItemInfo,
} from 'react-native';
import {
  NavigationInjectedProps,
  SafeAreaView,
} from 'react-navigation';
import Toast from 'react-native-simple-toast';
import { NavigationActions } from '../../../actions/navigation';
import { HistoryActions } from '../../../actions/withdrawHistory';
import Touchable from '../../../components/Touchable';
import {
  MerchantWithdrawHistoryItem,
  CurrencyRates,
} from '../../../services/responseTypes';
import Notification from '../../../components/Notification';
import { PaginatedListProps } from '../../../types/paginatedListProps';
import { createStructuredSelectorWithdraw } from '../../../selectors/WalletMerchant/withdraw';
import WithdrawHeader from './WithdrawHeader';
import CentredActivityIndicator from '../../../components/CentredActivityIndicator';
import EmptyList from '../../../components/EmptyList';
import WithdrawHistoryItem from '../../../components/listItems/MerchantWithdrawHistoryItem';

const DEFAULT_PER_PAGE = 15;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  transactionsTitleContainer: {
    height: 45,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
  },
  transactionsTitle: {
    fontFamily: 'ProximaNova-Regular',
    color: '#303645',
    marginLeft: 26,
    fontSize: 15,
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  arrowButton: {
    padding: 12,
  },
  completeTransferContainer: {
    width,
    height: 90,
    position: 'absolute',
    backgroundColor: '#ffffff',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'rgba(255, 118, 74, 0.56)',
    shadowOffset: { height: 10, width: 0 },
    paddingBottom: 19,
    paddingTop: 23,
    paddingLeft: 14,
    flexDirection: 'row',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 7,
  },
  baseText: {
    color: '#303645',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 15,
  },
  boldText: {
    fontFamily: 'ProximaNova-Semibold',
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
    width: '100%',
    position: 'absolute',
  },
});

export interface FromMyWalletDispatchProps {
  openWithdrawAmount: (ethAddress: string) => void;
  refreshHistoryTransactionList: (partnerKey: string) => void;
  fetchHistoryTransactionList: (partnerKey: string, page: number, perPage: number) => void;
}

export interface FromMyWalletStateProps {
  balanceAmount: number;
  fiatCurrency: string;
  currencyRates: CurrencyRates;
  withdrawHistory: PaginatedListProps<MerchantWithdrawHistoryItem>;
}

export interface State {
  ethAddress: string;
}

class FromMyWallet extends React.Component<FromMyWalletDispatchProps & FromMyWalletStateProps & NavigationInjectedProps, State> {

  partnerKey: string | null = null;

  constructor(props: FromMyWalletDispatchProps & FromMyWalletStateProps & NavigationInjectedProps) {
    super(props);
    this.state = {
      ethAddress: '',
    };
  }

  componentDidMount() {
    this.partnerKey = this.props.navigation.getParam('partnerKey', null);
    this.onRefresh();
  }

  handleBack = () => {
    const {
      navigation,
    } = this.props;
    navigation.goBack();
  }

  onChangeEthAddress = (ethAddress: string): void => {
    this.setState({ ethAddress });
  }

  openWithdrawAmount = (): void => {
    const { openWithdrawAmount } = this.props;
    const { ethAddress } = this.state;
    const regCheckAddress = /^(0x)[0-9a-f]{40}$/i;
    const validAddress = ethAddress.match(regCheckAddress);
    this.props.navigation.setParams({ amount: null });
    if (validAddress) {
      openWithdrawAmount(ethAddress);
    } else {
      Toast.show('Wrong ethereum address', Toast.LONG);
    }
  }

  keyExtractor = (item: MerchantWithdrawHistoryItem) => `withdraw-history-${item.id}`;

  renderItem = (listItemInfo: ListRenderItemInfo<MerchantWithdrawHistoryItem>) => {
    const {
      item,
    } = listItemInfo;
    return (
      <WithdrawHistoryItem
        item={item}
      />
    );
  }

  renderListHeader = () => {
    return (
      <View style={styles.transactionsTitleContainer}>
        <Text style={styles.transactionsTitle}>
          {'Your withdraw transactions'}
        </Text>
      </View>
    );
  }

  onRefresh = () => {
    const {
      refreshHistoryTransactionList,
    } = this.props;
    if (typeof this.partnerKey === 'string' && this.partnerKey.length > 0) {
      refreshHistoryTransactionList(this.partnerKey);
    }
  }

  loadNext = () => {
    const {
      fetchHistoryTransactionList,
      withdrawHistory,
    } = this.props;
    if (typeof this.partnerKey === 'string' && this.partnerKey.length > 0) {
      const nextPage = withdrawHistory.lastLoadedPage + 1;
      fetchHistoryTransactionList(this.partnerKey, nextPage, DEFAULT_PER_PAGE);
    }
  }

  render() {
    const {
      balanceAmount,
      currencyRates,
      fiatCurrency,
      withdrawHistory,
    } = this.props;
    const {
      isFetching,
      isRefreshing,
      items,
    } = withdrawHistory;
    const onPress = (): void => this.openWithdrawAmount();
    const onChangeText = (text: string) => this.onChangeEthAddress(text);
    const address = this.props.navigation.getParam('address', null);
    const amount = this.props.navigation.getParam('amount', null);
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#ffffff'
        />
        <View style={styles.container}>
          <WithdrawHeader
            balanceAmount={balanceAmount}
            currencyRates={currencyRates}
            fiatCurrency={fiatCurrency}
            onPress={onPress}
            onChangeEthAddress={onChangeText}
          />
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
                  ListHeaderComponent={this.renderListHeader()}
                  ListEmptyComponent={<EmptyList emptyMessage={'no transactions'} />}
                />
              )
            }
          </View>
          <View style={styles.arrowContainer}>
            <Touchable onPress={this.handleBack}>
              <View style={styles.arrowButton}>
                <Image source={require('../../../img/back_arrow.png')} />
              </View>
            </Touchable>
          </View>
        </View>
        <Notification address={address} amount={amount} />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): FromMyWalletDispatchProps => ({
  openWithdrawAmount: (address: string) => dispatch(NavigationActions.openWithdrawAmount(address)),
  refreshHistoryTransactionList: (partnerKey: string) => dispatch(HistoryActions.refreshHistoryTransactionList(partnerKey)),
  fetchHistoryTransactionList: (partnerKey: string, page: number, perPage: number) => dispatch(HistoryActions.fetchHistoryTransactionList(partnerKey, page, perPage)),
});

const mapStateToProps = () => createStructuredSelectorWithdraw;

export default connect(mapStateToProps, mapDispatchToProps)(FromMyWallet);
