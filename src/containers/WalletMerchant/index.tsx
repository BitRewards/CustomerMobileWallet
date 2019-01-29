import * as React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  RefreshControl,
  Linking,
  Alert,
} from 'react-native';
import {
  NavigationInjectedProps,
  SafeAreaView,
} from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  ShareDialog,
  ShareLinkContent,
} from 'react-native-fbsdk';
import * as lodash from 'lodash';
import Toast from 'react-native-simple-toast';
import Api from '../../services/Api';
import { MerchantActions } from '../../actions/merchant';
import { currencyActions } from '../../actions/currency';
import TabBar from '../../components/TabBar';
import TabBarButton from '../../components/TabBar/TabBarButton';
import EarnBitItem from '../../components/listItems/EarnBitItem';
import CouponItem from '../../components/listItems/CouponItem';
import RedeemBitItem from '../../components/listItems/RedeemBitItem';
import Touchable from '../../components/Touchable';
import {
  MerchantActionItem,
  MerchantRewardItem,
  MerchantCouponItem,
  OfferActionItem,
  OfferRewardItem,
  CurrencyRates,
} from '../../services/responseTypes';
import CentredActivityIndicator from '../../components/CentredActivityIndicator';
import EarnBitDialog from '../../components/Dialogs/EarnBitDialog';
import { NavigationActions } from '../../actions/navigation';
import EmptyList from '../../components/EmptyList';
import {
  getBitValueString,
  getFiatCurrencyString,
} from '../../utils/currency';
import BitImage from '../../components/BitImage';
import SpendBitItem from '../../components/listItems/SpendBitItem';
import WalletMerchantMoreOptions from '../../components/Dialogs/WalletMerchantMoreOptions/index';
import { createStructuredSelectorWalletMerchant } from '../../selectors/WalletMerchant';
import { PaginatedListProps } from '../../types/paginatedListProps';

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
  optionsWrapper: {
    top: 0,
    right: 0,
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
  moreImage: {
    width: 22,
    height: 6,
    marginTop: 10,
  },
});

export interface WalletMerchantDispatchProps {
  fetchCurrency: () => void;
  fetchWalletMerchantInfo: (partnerKey: string) => void;
  fetchWalletMerchantLimits: (partnerKey: string) => void;
  refreshWalletMerchantActions: (partnerKey: string) => void;
  fetchWalletMerchantActions: (partnerKey: string, page: number, perPage: number) => void;
  refreshWalletMerchantRewards: (partnerKey: string) => void;
  fetchWalletMerchantRewards: (partnerKey: string, page: number, perPage: number) => void;
  refreshWalletMerchantCoupons: (partnerKey: string) => void;
  fetchWalletMerchantCoupons: (partnerKey: string, page: number, perPage: number) => void;
  openInviteFriend: () => void;
}

export interface WalletMerchantStateProps {
  isFetching: boolean;
  partnerKey: string;
  title: string;
  image?: string;
  balanceAmount: number;
  fiatAmount: number;
  fiatCurrency: string;
  couponsCount: number;
  error: any;
  settings: any;
  currencyRates: CurrencyRates;
  merchantActions: PaginatedListProps<MerchantActionItem>;
  merchantRewards: PaginatedListProps<MerchantRewardItem>;
  merchantCoupons: PaginatedListProps<MerchantCouponItem>;
}

export interface WalletMerchantState {
  isFetchItemInfo: boolean;
  activeTab: number;
  isModalVisible: boolean;
  isMoreOptionsVisible: boolean;
  modalTitle: string;
  modalDescription: string;
  modalButtonLabel: string;
  modalButtonOnPress?: () => void;
}

const EARN_BIT_TAB_INDEX = 0;
const REDEEM_BIT_TAB_INDEX = 1;
const COUPONS_TAB_INDEX = 2;

class WalletMerchant extends React.Component<WalletMerchantDispatchProps & WalletMerchantStateProps & NavigationInjectedProps, WalletMerchantState> {
  private flatList: any;

  constructor(props: WalletMerchantDispatchProps & WalletMerchantStateProps & NavigationInjectedProps) {
    super(props);

    this.state = {
      isFetchItemInfo: false,
      activeTab: 0,
      isModalVisible: false,
      isMoreOptionsVisible: false,
      modalTitle: '',
      modalDescription: '',
      modalButtonLabel: '',
      modalButtonOnPress: () => { },
    };
  }

  componentDidMount() {
    const {
      fetchWalletMerchantInfo,
      refreshWalletMerchantCoupons,
      refreshWalletMerchantActions,
      refreshWalletMerchantRewards,
      fetchWalletMerchantLimits,
      fetchCurrency,
    } = this.props;
    const partnerKey = this.props.navigation.getParam('partnerKey', null);
    if (partnerKey) {
      refreshWalletMerchantActions(partnerKey);
      refreshWalletMerchantRewards(partnerKey);
      fetchWalletMerchantInfo(partnerKey);
      refreshWalletMerchantCoupons(partnerKey);
      fetchWalletMerchantLimits(partnerKey);
    }
    const specialOfferActionToDisplay: OfferActionItem | null = this.props.navigation.getParam('specialOfferActionToDisplay', null);
    if (specialOfferActionToDisplay) {
      this.handleChangeTab(EARN_BIT_TAB_INDEX);
      Api.getActionInfo(specialOfferActionToDisplay.action.id)
        .then((result) => {
          const merchantActionItem: MerchantActionItem = result.data;
          this.onEarnBitPress(merchantActionItem);
        }).catch((error) => {
          console.warn(JSON.stringify(error, null, 2));
          Toast.show(Api.getErrorMessage(error), Toast.LONG);
        });
    }
    const specialOfferRewardToDisplay: OfferRewardItem | null = this.props.navigation.getParam('specialOfferRewardToDisplay', null);
    if (specialOfferRewardToDisplay) {
      this.handleChangeTab(REDEEM_BIT_TAB_INDEX);
      Api.getRewardInfo(specialOfferRewardToDisplay.reward.id)
        .then((result) => {
          const merchantRewardItem: MerchantRewardItem = result.data;
          this.onRedeemBitPress(merchantRewardItem);
        }).catch((error) => {
          console.warn(JSON.stringify(error, null, 2));
          Toast.show(Api.getErrorMessage(error), Toast.LONG);
        });
    }
    fetchCurrency();
  }

  onEarnBitPress = (item: MerchantActionItem): void => {
    const { type } = item;
    switch (type) {
      case 'CustomBonus':
        console.warn(JSON.stringify(item, null, 2));
        const affiliateUrl: string = typeof item.viewData.affiliateUrl === 'string' ? item.viewData.affiliateUrl : '';
        if (affiliateUrl.length > 0) {
          this.showActionModalWithLink(item, affiliateUrl);
        }
        break;
      case 'ShareFb':
        console.warn(JSON.stringify(item, null, 2));
        this.setState({
          isModalVisible: true,
          modalTitle: item.title,
          modalDescription: item.description,
          modalButtonLabel: item.title,
          modalButtonOnPress: () => {
            this.shareLinkWithShareDialog(item);
          },
        });
        break;
      case 'OrderCashback':
        console.warn(JSON.stringify(item, null, 2));
        this.showActionModalWithLink(item, item.viewData.affiliateUrl);
        break;
      case 'AffiliateActionAdmitad':
        console.warn(JSON.stringify(item, null, 2));
        this.showActionModalWithLink(item, item.viewData.affiliateUrl);
        break;
      case 'OrderReferral':
        const { openInviteFriend } = this.props;
        openInviteFriend();
        break;
      default:
        return;
    }
  }

  showActionModalWithLink = (item: MerchantActionItem, link: string) => {
    this.setState({
      isModalVisible: true,
      modalTitle: item.title,
      modalDescription: item.description,
      modalButtonLabel: 'Make a purchase',
      modalButtonOnPress: () => {
        if (Linking.canOpenURL(link)) {
          Linking.openURL(link);
        }
      },
    });
  }

  onRedeemBitPress = (item: MerchantRewardItem) => {
    const {
      balanceAmount,
    } = this.props;
    if (item.valueAmount > balanceAmount) {
      Alert.alert(
        '',
        'Insufficient funds',
        [
          { text: 'Close', onPress: () => { }, style: 'cancel' },
        ],
        { cancelable: true },
      );
      return;
    }
    const redeemBit = () => {
      Api.postRewardAcquire(item.id)
        .then(value => {
          console.warn(JSON.stringify(value));
          const shopUrl = 'http://ya.ru';
          if (Linking.canOpenURL(shopUrl)) {
            Linking.openURL(shopUrl);
          }
        });
    };
    Alert.alert(
      '',
      'Are you sure you want to buy this coupon?',
      [
        { text: 'No', onPress: () => { }, style: 'cancel' },
        { text: 'Yes', onPress: redeemBit },
      ],
      { cancelable: false },
    );
  }

  onCouponPress = (item: MerchantCouponItem) => {
    const useCoupon = () => {
      const redeemUrl = item.redeemUrl || '';
      if (Linking.canOpenURL(redeemUrl)) {
        Linking.openURL(redeemUrl);
      }
    };
    Alert.alert(
      '',
      'Are you sure you want to use this coupon?',
      [
        { text: 'No', onPress: () => { }, style: 'cancel' },
        { text: 'Yes', onPress: useCoupon },
      ],
      { cancelable: false },
    );
  }

  shareLinkWithShareDialog = (item: MerchantActionItem) => {
    if (typeof item.viewData.userUrl !== 'string' || item.viewData.userUrl === null) {
      Toast.show('share link is null', Toast.LONG);
      return;
    }
    const shareLinkContent: ShareLinkContent = {
      contentType: 'link',
      contentUrl: item.viewData.userUrl || '',
    };
    ShareDialog.canShow(shareLinkContent)
      .then((canShow: boolean) => {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      }).then(
        (result: any) => {
          console.warn(JSON.stringify(result, null, 2));
          Api.postActionPerform(item.id);
        },
        (error: any) => {
          console.warn('Share fail with error: ' + error);
        },
    );
  }

  closeModal = () => {
    this.setState({ isModalVisible: false });
  }

  closeMoreOptions = () => {
    this.setState({ isMoreOptionsVisible: false });
  }

  renderItem = (listItemInfo: ListRenderItemInfo<any>) => {
    const {
      activeTab,
    } = this.state;
    const {
      item,
    } = listItemInfo;
    switch (activeTab) {
      case EARN_BIT_TAB_INDEX:
        const actionItem: MerchantActionItem = item;
        const earnBitPress = () => this.onEarnBitPress(actionItem);
        const isSpecialOffer = actionItem.specialOfferAction && typeof actionItem.specialOfferAction === 'object';
        const description = isSpecialOffer ? lodash.get(actionItem, 'specialOfferAction.action.title', actionItem.description) : actionItem.description;
        const brand = isSpecialOffer ? lodash.get(actionItem, 'specialOfferAction.brand') : undefined;
        const merchantName = isSpecialOffer ? lodash.get(actionItem, 'specialOfferAction.action.partner.title', actionItem.title) : actionItem.title;
        const image = isSpecialOffer ? lodash.get(actionItem, 'specialOfferAction.image', actionItem.partnerLogoPicture) : actionItem.partnerLogoPicture;
        return (
          <EarnBitItem
            image={image}
            merchantName={merchantName}
            brand={brand}
            description={description}
            onPress={earnBitPress}
          />
        );
      case REDEEM_BIT_TAB_INDEX:
        const rewardItem: MerchantRewardItem = item;
        const onRedeemPress = () => this.onRedeemBitPress(rewardItem);
        const isSpecialOfferReward = rewardItem.specialOfferReward && typeof rewardItem.specialOfferReward === 'object';
        const brand2 = isSpecialOfferReward ? lodash.get(rewardItem, 'specialOfferReward.brand') : undefined;
        const merchantName2 = isSpecialOfferReward ? lodash.get(rewardItem, 'specialOfferReward.reward.partner.title', rewardItem.title) : rewardItem.title;
        const image2 = isSpecialOfferReward ? lodash.get(rewardItem, 'specialOfferReward.image', rewardItem.image) : rewardItem.image;
        return isSpecialOfferReward
          ? (
            <SpendBitItem
              image={image2}
              brand={brand2}
              partnerTitle={merchantName2}
              title={rewardItem.title}
              description={rewardItem.description}
              price={`${rewardItem.priceBitTokensStr} BIT`}
              onPress={onRedeemPress}
            />
          )
          : (
            <RedeemBitItem
              id={rewardItem.id}
              image={rewardItem.image}
              title={rewardItem.title}
              description={rewardItem.description}
              price={`${rewardItem.priceBitTokensStr} BIT`}
              onPress={onRedeemPress}
            />
          );
      case COUPONS_TAB_INDEX:
        const couponItem: MerchantCouponItem = item;
        const onPress = () => this.onCouponPress(couponItem);
        return (
          <CouponItem
            brand={couponItem.partner.title}
            title={couponItem.title}
            description={couponItem.comment}
            image={couponItem.partner.image}
            onPress={onPress}
          />
        );
      default:
        return null;
    }
  }

  keyExtractor = (item: any, index: number) => `wallet-merchent-${index}`;

  handleInviteFriend = () => { };

  handleChangeTab = (index: number) => this.setState({ activeTab: index }, this.scrollToTop);

  scrollToTop = () => {
    if (this.flatList) {
      this.flatList.scrollToOffset({ offset: 0, animated: false });
    }
  }

  handleBack = () => {
    const {
      navigation,
    } = this.props;
    navigation.goBack();
  }

  openMoreOptions = () => {
    this.setState({ isMoreOptionsVisible: true });
  }

  openInviteFriend = () => {
    const { openInviteFriend } = this.props;
    openInviteFriend();
  }

  isDisplayableAction = (action: MerchantActionItem) => {
    return (action.is_system === 0 && action.type !== 'ShareVk' && action.type !== 'JoinVk');
  }

  getActiveTabStateList = (): PaginatedListProps<MerchantActionItem | MerchantRewardItem | MerchantCouponItem> | null => {
    const {
      activeTab,
    } = this.state;
    const {
      merchantActions,
      merchantRewards,
      merchantCoupons,
    } = this.props;
    switch (activeTab) {
      case EARN_BIT_TAB_INDEX:
        return merchantActions;
      case REDEEM_BIT_TAB_INDEX:
        return merchantRewards;
      case COUPONS_TAB_INDEX:
        return merchantCoupons;
      default:
        return null;
    }
  }

  getFlatListData = (): any => {
    const {
      activeTab,
    } = this.state;
    const {
      merchantActions,
      merchantRewards,
      merchantCoupons,
    } = this.props;
    switch (activeTab) {
      case EARN_BIT_TAB_INDEX:
        return merchantActions.items.filter((value: MerchantActionItem) => {
          return this.isDisplayableAction(value);
        });
      case REDEEM_BIT_TAB_INDEX:
        return merchantRewards.items;
      case COUPONS_TAB_INDEX:
        return merchantCoupons.items;
      default:
        return [];
    }
  }

  isActiveTabFetching = () => {
    const activeTabStateList = this.getActiveTabStateList();
    return activeTabStateList ? activeTabStateList.items.length <= 0 && activeTabStateList.isFetching : false;
  }

  isActiveTabRefreshing = () => {
    const activeTabStateList = this.getActiveTabStateList();
    return activeTabStateList ? activeTabStateList.items.length <= 0 && activeTabStateList.isRefreshing : false;
  }

  isActiveTabIsEmptyAndError = () => {
    const activeTabStateList = this.getActiveTabStateList();
    return activeTabStateList ? activeTabStateList.items.length <= 0 && activeTabStateList.error !== null : false;
  }

  getActiveTabError = () => {
    const activeTabStateList = this.getActiveTabStateList();
    return activeTabStateList ? activeTabStateList.error : null;
  }

  onRefresh = () => {
    const {
      activeTab,
    } = this.state;
    const {
      refreshWalletMerchantActions,
      refreshWalletMerchantRewards,
      refreshWalletMerchantCoupons,
    } = this.props;
    const partnerKey = this.props.navigation.getParam('partnerKey', null);
    switch (activeTab) {
      case EARN_BIT_TAB_INDEX:
        refreshWalletMerchantActions(partnerKey);
        break;
      case REDEEM_BIT_TAB_INDEX:
        refreshWalletMerchantRewards(partnerKey);
        break;
      case COUPONS_TAB_INDEX:
        refreshWalletMerchantCoupons(partnerKey);
        break;
      default:
        return;
    }
  }

  render() {
    const {
      title,
      image,
      balanceAmount,
      fiatAmount,
      fiatCurrency,
      couponsCount,
    } = this.props;
    const {
      isModalVisible,
      isMoreOptionsVisible,
      modalTitle,
      modalDescription,
      modalButtonLabel,
      modalButtonOnPress,
      activeTab,
    } = this.state;
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
              <View style={styles.merchantIcon}>
                {(typeof image === 'string') && (
                  // @ts-ignore
                  <BitImage
                    width='75'
                    height='75'
                    uri={image}
                  />
                )
                }
              </View>
            </View>
            <View style={styles.headerCentredText}>
              <Text style={styles.merchantTitle}>
                {title}
              </Text>
              <Text style={styles.balance}>
                {getBitValueString(balanceAmount)}
              </Text>
              <Text style={styles.subBalance}>
                {`≈${getFiatCurrencyString(fiatAmount, fiatCurrency)}`}
              </Text>
            </View>
            {/*<View style={styles.buttonContainer}>*/}
            {/*<Touchable onPress={this.handleInviteFriend}>*/}
            {/*<View style={styles.button}>*/}
            {/*<Touchable onPress={this.openInviteFriend}>*/}
            {/*<Text style={styles.buttonText}>*/}
            {/*{'Invite a friend'}*/}
            {/*</Text>*/}
            {/*</Touchable>*/}
            {/*</View>*/}
            {/*</Touchable>*/}
            {/*</View>*/}
            <View style={styles.tabBarsWrapper}>
              <TabBar
                onChange={this.handleChangeTab}
                activeIndex={activeTab}
              >
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
            <View style={styles.optionsWrapper}>
              <Touchable onPress={this.openMoreOptions}>
                <View style={styles.backArrowBox}>
                  <Image source={require('../../img/more.png')} style={styles.moreImage} />
                </View>
              </Touchable>
            </View>
          </View>
          {
            this.isActiveTabFetching() && (
              <CentredActivityIndicator />
            )
          }
          {
            !this.isActiveTabFetching() && this.isActiveTabIsEmptyAndError() && (
              <EmptyList emptyMessage={Api.getErrorMessage(this.getActiveTabError())} />
            )
          }
          {
            !this.isActiveTabFetching() && !this.isActiveTabIsEmptyAndError() && (
              <FlatList
                ref={ref => (this.flatList = ref)}
                refreshControl={(
                  <RefreshControl
                    refreshing={this.isActiveTabRefreshing()}
                    onRefresh={this.onRefresh}
                  />
                )}
                extraData={[this.props]}
                contentContainerStyle={styles.listContainer}
                data={flatListData}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
        <EarnBitDialog
          onRequestClose={this.closeModal}
          visible={isModalVisible}
          title={modalTitle}
          description={modalDescription}
          buttonLabel={modalButtonLabel}
          onPress={modalButtonOnPress}
        />
        <WalletMerchantMoreOptions
          onRequestClose={this.closeMoreOptions}
          visible={isMoreOptionsVisible}
        />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): WalletMerchantDispatchProps => ({
  fetchCurrency: () => dispatch(currencyActions.fetchCurrency()),
  fetchWalletMerchantInfo: (partnerKey: string) => dispatch(MerchantActions.fetchWalletMerchantInfo(partnerKey)),
  fetchWalletMerchantLimits: (partnerKey: string) => dispatch(MerchantActions.fetchWalletMerchantLimitsStarted(partnerKey)),
  refreshWalletMerchantActions: (partnerKey: string) => dispatch(MerchantActions.refreshWalletMerchantActions(partnerKey)),
  fetchWalletMerchantActions: (partnerKey: string, page: number, perPage: number) => dispatch(MerchantActions.fetchWalletMerchantActions(partnerKey, page, perPage)),
  refreshWalletMerchantRewards: (partnerKey: string) => dispatch(MerchantActions.refreshWalletMerchantRewards(partnerKey)),
  fetchWalletMerchantRewards: (partnerKey: string, page: number, perPage: number) => dispatch(MerchantActions.fetchWalletMerchantRewards(partnerKey, page, perPage)),
  refreshWalletMerchantCoupons: (partnerKey: string) => dispatch(MerchantActions.refreshWalletMerchantCoupons(partnerKey)),
  fetchWalletMerchantCoupons: (partnerKey: string, page: number, perPage: number) => dispatch(MerchantActions.fetchWalletMerchantCoupons(partnerKey, page, perPage)),
  openInviteFriend: () => dispatch(NavigationActions.openInviteFriend()),
});

const mapStateToProps = () => createStructuredSelectorWalletMerchant;

export default connect(mapStateToProps, mapDispatchToProps)(WalletMerchant);
