import * as React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { MerchantActions } from '../../actions/merchant';
import TabBar from '../../components/TabBar';
import TabBarButton from '../../components/TabBar/TabBarButton';
import EarnBitItem from '../../components/listItems/EarnBitItem';
import SpendBitItem from '../../components/listItems/SpendBitItem';
import Touchable from '../../components/Touchable';
import { MerchantCouponItem } from '../../services/responseTypes';

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
  tabBarsWrapper: {
    marginStart: 14,
    marginEnd: 14,
  },
  headerCentredText: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingStart: 14,
    paddingEnd: 14,
  },
  merchantTitle: {
    fontSize: 19,
    color: '#303645',
    fontFamily: 'ProximaNova-Bold',
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
  },
  merchantIconWrapper: {
    paddingTop: 8,
  },
  merchantIcon: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#ff764a',
    alignSelf: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
  },
  button: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingStart: 25,
    paddingEnd: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff764a',
  },
  buttonText: {
    fontSize: 15,
    color: '#ff764a',
    fontFamily: 'ProximaNova-Regular',
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

export interface WalletMerchantProps {
  fetchWalletMerchantInfo: (partnerKey: string) => any;
  fetchWalletMerchantCoupons: (partnerKey: string) => any;
  navigation: NavigationScreenProp<NavigationState>;
  key: string;
  title: string;
  image?: string;
  balanceAmount: number;
  fiatAmount: number;
  fiatCurrency: string;
  couponsCount: number;
  couponsList: [MerchantCouponItem];
}

export interface WalletMerchantState {
  activeTab: number;
}

const EARN_BIT_TAB_INDEX = 0;
const REDEEM_BIT_TAB_INDEX = 1;
const COUPONS_TAB_INDEX = 2;

class WalletMerchant extends React.Component<WalletMerchantProps, WalletMerchantState> {
  constructor(props: WalletMerchantProps) {
    super(props);

    this.state = {
      activeTab: 0,
    };
  }

  componentDidMount() {
    const {
      fetchWalletMerchantInfo,
      fetchWalletMerchantCoupons,
    } = this.props;
    const partnerKey = this.props.navigation.getParam('partnerKey', null);
    if (partnerKey) {
      fetchWalletMerchantInfo(partnerKey);
      fetchWalletMerchantCoupons(partnerKey);
    }
  }

  renderItem = (listItemInfo: ListRenderItemInfo<any>) => {
    const {
      activeTab,
    } = this.state;
    switch (activeTab) {
      case EARN_BIT_TAB_INDEX:
        return (
          <EarnBitItem
            brand={'BitRewards'}
            description={'Register and get 5% cashback for this purchase in crypto!'}
          />
        );
      case REDEEM_BIT_TAB_INDEX:
        return (
          <SpendBitItem
            brand={'McDonalds'}
            title={'Discount $2'}
            description={'Use $2 discount for purchase over $5000'}
          />
        );
      case COUPONS_TAB_INDEX:
        return (
          <SpendBitItem
            brand={'McDonalds'}
            title={'Discount $2'}
            description={'Use $2 discount for purchase over $5000'}
          />
        );
      default:
        return null;
    }
  }

  keyExtractor = (item: any, index: number) => `wallet-merchent-${index}`;

  handleInviteFriend = () => {};

  handleChangeTab = (index: number) => this.setState({ activeTab: index });

  handleBack = () => {
    const {
      navigation,
    } = this.props;
    navigation.goBack();
  }

  getFlatListData = () => {
    const {
      activeTab,
    } = this.state;
    const {
      couponsList,
    } = this.props;
    const earnBitListData = [
      {},
      {},
    ];
    const redeemBitListData = [
      {},
      {},
      {},
      {},
    ];
    switch (activeTab) {
      case EARN_BIT_TAB_INDEX:
        return earnBitListData;
      case REDEEM_BIT_TAB_INDEX:
        return redeemBitListData;
      case COUPONS_TAB_INDEX:
        return couponsList;
      default:
        return earnBitListData;
    }
  }

  render() {
    const {
      title,
      balanceAmount,
      fiatAmount,
      couponsCount,
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
            <View style={styles.merchantIconWrapper}>
              <View style={styles.merchantIcon} />
            </View>
            <View style={styles.headerCentredText}>
              <Text style={styles.merchantTitle}>
                {title}
              </Text>
              <Text style={styles.balance}>
                {`${balanceAmount} BIT`}
              </Text>
              <Text style={styles.subBalance}>
                {`≈${fiatAmount}₽`}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Touchable onPress={this.handleInviteFriend}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>
                    {'Invite a friend'}
                  </Text>
                </View>
              </Touchable>
            </View>
            <View style={styles.tabBarsWrapper}>
              <TabBar onChange={this.handleChangeTab}>
                <TabBarButton title='Earn BIT' />
                <TabBarButton title='Redeem BIT' />
                <TabBarButton title={`${couponsCount} Coupons`} />
              </TabBar>
            </View>
            <View style={styles.backArrowWrapper}>
              <Touchable onPress={this.handleBack}>
                <View style={styles.backArrowBox}>
                  <Image source={require('../../img/back_arrow.png')} style={styles.backArrowImage} />
                </View>
              </Touchable>
            </View>
          </View>
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={flatListData}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchWalletMerchantInfo: (partnerKey: string) => dispatch(MerchantActions.fetchWalletMerchantInfo(partnerKey)),
  fetchWalletMerchantCoupons: (partnerKey: string) => dispatch(MerchantActions.fetchWalletMerchantCoupons(partnerKey)),
});

const mapStateToProps = (state: any) => ({
  isFetching: state.merchant.get('isFetching'),
  key: state.merchant.get('key'),
  title: state.merchant.get('title'),
  image: state.merchant.get('iamge'),
  balanceAmount: state.merchant.get('balanceAmount'),
  fiatAmount: state.merchant.get('fiatAmount'),
  fiatCurrency: state.merchant.get('fiatCurrency'),
  couponsCount: state.merchant.get('couponsCount'),
  couponsList: state.merchant.get('couponsList').toJS(),
  error: state.merchant.get('error'),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletMerchant);
