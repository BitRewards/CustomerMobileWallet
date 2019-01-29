import * as React from 'react';
import {
  FlatList,
  RefreshControl,
  ListRenderItemInfo,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions } from '../../actions/navigation';
import { WalletActions } from '../../actions/wallet';
import MerchantItem from '../../components/listItems/MerchantItem';
import Touchable from '../../components/Touchable';
import CentredActivityIndicator from '../../components/CentredActivityIndicator';
import {
  totalBalanceAmountSelector,
  totalFiatAmountSelector,
  totalFiatCurrencySelector,
} from '../../selectors/wallet';
import { MerchantInfo } from '../../services/responseTypes';
import EmptyList from '../../components/EmptyList';
import {
  getFiatCurrencyString,
  getBitValueString,
} from '../../utils/currency';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  walletHeader: {
    backgroundColor: '#ffffff',
  },
  headerCentredText: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    paddingStart: 14,
    paddingEnd: 14,
  },
  summaryTitle: {
    fontSize: 20,
    color: '#303645',
    fontFamily: 'ProximaNova-Regular',
  },
  balance: {
    fontSize: 30,
    color: '#303645',
    fontFamily: 'ProximaNova-Bold',
  },
  subBalance: {
    fontSize: 15,
    color: '#30364564',
    fontFamily: 'ProximaNova-Regular',
  },
  listContainer: {
    paddingTop: 15,
    paddingBottom: 9,
    flexGrow: 1,
  },
  listHeaderText: {
    fontSize: 15,
    color: '#303645',
    fontFamily: 'ProximaNova-Regular',
    marginStart: 26,
    marginEnd: 26,
    marginBottom: 8,
  },
  historyButtonContainer: {
    top: 0,
    right: 0,
    position: 'absolute',
  },
  historyButton: {
    padding: 17,
  },
  historyButtonText: {
    fontSize: 17,
    color: '#ff764a',
    fontFamily: 'ProximaNova-Regular',
  },
});

export interface WalletProps {
  openWalletMerchant: (merchant: MerchantInfo) => void;
  openHistory: () => void;
  refreshWalletList: () => void;
  fetchWalletList: () => void;
  isRefreshing: boolean;
  isFetching: boolean;
  walletItems: any;
  error: any;
  totalBalanceAmount: number;
  totalFiatAmount: number;
  totalFiatCurrency: string;
}
export interface State { }

class Wallet extends React.Component<WalletProps, State> {

  componentDidMount() {
    const {
      fetchWalletList,
    } = this.props;
    fetchWalletList();
  }

  getFlatListData = () => {
    const { walletItems } = this.props;
    return walletItems;
  }

  renderItem = (listItemInfo: ListRenderItemInfo<MerchantInfo>) => {
    const {
      openWalletMerchant,
    } = this.props;
    const {
      item,
    } = listItemInfo;
    const onPress = () => openWalletMerchant(item);
    return (
      <MerchantItem
        onPress={onPress}
        highlight
        image={item.partner.image}
        title={item.partner.title}
        balanceAmount={item.balanceAmount}
      />
    );
  }

  keyExtractor = (item: any, index: number) => `wallet-${index}`;

  onRefresh = (): void => {
    const {
      refreshWalletList,
    } = this.props;
    refreshWalletList();
  }

  render() {
    const {
      openHistory,
      isRefreshing,
      isFetching,
      totalBalanceAmount,
      totalFiatAmount,
      totalFiatCurrency,
    } = this.props;
    const flatListData = this.getFlatListData();
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#ffffff'
        />
        <View style={styles.container}>
          <View style={styles.walletHeader}>
            <View style={styles.headerCentredText}>
              <Text style={styles.summaryTitle}>
                {'Summary balance'}
              </Text>
              <Text style={styles.balance}>
                {getBitValueString(totalBalanceAmount)}
              </Text>
              <Text style={styles.subBalance}>
                {`≈${getFiatCurrencyString(totalFiatAmount, totalFiatCurrency)}`}
              </Text>
            </View>
            <View style={styles.historyButtonContainer}>
              <Touchable onPress={openHistory}>
                <View style={styles.historyButton}>
                  <Text style={styles.historyButtonText}>
                    {'History'}
                  </Text>
                </View>
              </Touchable>
            </View>
          </View>
          { flatListData.length === 0 && isFetching && (
            <CentredActivityIndicator />
          )
          }
          {
            !(flatListData.length === 0 && isFetching) && (
              <FlatList
                refreshControl={(
                  <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={this.onRefresh}
                  />
                )}
                contentContainerStyle={styles.listContainer}
                data={flatListData}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                ListHeaderComponent={<Text style={styles.listHeaderText}>{'Wallet list'}</Text>}
                ListEmptyComponent={<EmptyList emptyMessage={'wallet is empty'} />}
              />
            )
          }
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openWalletMerchant: (merchant: MerchantInfo) => dispatch(NavigationActions.openWalletMerchant(merchant)),
  openHistory: () => dispatch(NavigationActions.openHistory()),
  refreshWalletList: () => dispatch(WalletActions.refreshWalletList()),
  fetchWalletList: () => dispatch(WalletActions.fetchWalletList()),
});

const mapStateToProps = (state: any) => ({
  isRefreshing: state.wallet.get('isRefreshing'),
  isFetching: state.wallet.get('isFetching'),
  walletItems: state.wallet.get('items').toJS(),
  totalBalanceAmount: totalBalanceAmountSelector(state),
  totalFiatAmount: totalFiatAmountSelector(state),
  totalFiatCurrency: totalFiatCurrencySelector(state),
  error: state.wallet.get('error'),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
