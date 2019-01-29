import * as React from 'react';
import {
  FlatList,
  RefreshControl,
  ListRenderItemInfo,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import Search from '../../components/Search';
import Carousel from '../../components/Carousel';
import TabBar from '../../components/TabBar';
import TabBarButton from '../../components/TabBar/TabBarButton';
import EarnBitItem from '../../components/listItems/EarnBitItem';
import SpendBitItem from '../../components/listItems/SpendBitItem';
import CentredActivityIndicator from '../../components/CentredActivityIndicator';
import { SpecialOfferActions } from '../../actions/specialOffers';
import {
  MerchantInfo,
  OfferActionItem,
  OfferRewardItem,
} from '../../services/responseTypes';
import { NavigationActions } from '../../actions/navigation';
import EmptyList from '../../components/EmptyList';
import { createStructuredSelectorSpecialOffers } from '../../selectors/SpecialOffers';
import { PaginatedListProps } from '../../types/paginatedListProps';
import DevModeDialog from '../../components/Dialogs/DevModeDialog';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  offersHeader: {
    backgroundColor: '#ffffff',
  },
  searchWrapper: {
    marginTop: 15,
    marginBottom: 15,
    marginStart: 16,
    marginEnd: 16,
  },
  carouselWrapper: {
    marginStart: 14,
    marginEnd: 14,
  },
  tabBarsWrapper: {
    marginStart: 14,
    marginEnd: 14,
  },
  centerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  listContainer: {
    paddingTop: 15,
    paddingBottom: 9,
    flexGrow: 1,
  },
});

const DEV_PASSCODE = 'iddqd';

const EARN_BIT_TAB_INDEX = 0;
const REDEEM_BIT_TAB_INDEX = 1;
const PAGE_SIZE_LIMIT = 15;

export interface SpecialOffersDispatchProps {
  refreshOfferActionsList: () => void;
  refreshOfferRewardList: () => void;
  fetchOfferActionsList: (page: number, perPage: number) => void;
  fetchOfferRewardList: (page: number, perPage: number) => void;
  openSpecialActionInWalletMerchant: (actionItem: OfferActionItem) => void;
  openSpecialRewardInWalletMerchant: (rewardItem: OfferRewardItem) => void;
}

export interface SpecialOffersStateProps {
  actionsList: PaginatedListProps<OfferActionItem>;
  rewardsList: PaginatedListProps<OfferRewardItem>;
}

export interface SpecialOffersState {
  activeTab: number;
  filterValue?: string;
  isDevMode: boolean;
}

class SpecialOffers extends React.Component<SpecialOffersStateProps & SpecialOffersDispatchProps, SpecialOffersState> {
  private flatList: any;

  constructor(props: SpecialOffersStateProps & SpecialOffersDispatchProps) {
    super(props);

    this.state = {
      activeTab: 0,
      filterValue: '',
      isDevMode: false,
    };
  }

  componentDidMount() {
    const {
      refreshOfferActionsList,
      refreshOfferRewardList,
    } = this.props;
    refreshOfferActionsList();
    refreshOfferRewardList();
  }

  handleChangeTab = (index: number) => {
    this.setState({ activeTab: index }, this.scrollToTop);
  }

  scrollToTop = () => {
    if (this.flatList) {
      this.flatList.scrollToOffset({ offset: 0, animated: false });
    }
  }

  getFlatListData = (): any => {
    const {
      actionsList,
      rewardsList,
    } = this.props;
    const {
      activeTab,
      filterValue,
    } = this.state;
    const filteredActionItems = actionsList.items.filter(
      (value: OfferActionItem) => {
        const brand = value.brand || '';
        const description = value.action.description || '';
        if (!filterValue || filterValue === '') {
          return true;
        } else if (
          filterValue && (
            brand.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
            || description.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
          )
        ) {
          return true;
        }
        return false;
      },
    );
    const filteredRewardItems = rewardsList.items.filter(
      (value: OfferRewardItem) => {
        const brand = value.brand || '';
        const description = value.reward.description || '';
        const title = value.reward.title || '';
        if (!filterValue || filterValue === '') {
          return true;
        } else if (
          filterValue && (
            brand.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
            || description.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
            || value.reward.partner.title.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
            || title.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
          )
        ) {
          return true;
        }
        return false;
      },
    );
    switch (activeTab) {
      case EARN_BIT_TAB_INDEX:
        return filteredActionItems;
      case REDEEM_BIT_TAB_INDEX:
        return filteredRewardItems;
      default:
        return [];
    }
  }

  getEmptyMessage = (): string => {
    const {
      activeTab,
    } = this.state;
    switch (activeTab) {
      case EARN_BIT_TAB_INDEX:
        return 'list of actions is empty';
      case REDEEM_BIT_TAB_INDEX:
        return 'list of rewards is empty';
      default:
        return '';
    }
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
        const actionItem: OfferActionItem = item;
        const earnBitPress = () => this.onEarnBitPress(actionItem);
        const actionImage = actionItem.image ? actionItem.image : actionItem.action.partner.image;
        return (
          <EarnBitItem
            image={actionImage}
            brand={actionItem.brand}
            merchantName={actionItem.action.partner.title}
            description={actionItem.action.title}
            onPress={earnBitPress}
          />
        );
      case REDEEM_BIT_TAB_INDEX:
        const rewardItem: OfferRewardItem = item;
        const spendBitPress = () => this.onSpendBitPress(rewardItem);
        const rewardImage = rewardItem.image ? rewardItem.image : rewardItem.reward.partner.image;
        return (
          <SpendBitItem
            image={rewardImage}
            brand={rewardItem.brand}
            partnerTitle={rewardItem.reward.partner.title}
            title={rewardItem.reward.title}
            description={rewardItem.reward.description}
            price={`${rewardItem.reward.priceBitTokensStr} BIT`}
            onPress={spendBitPress}
          />
        );
      default:
        return null;
    }
  }

  keyExtractor = (item: any, index: number) => `offer-${index}`;

  onRefresh = () => {
    const {
      activeTab,
    } = this.state;
    const {
      refreshOfferActionsList,
      refreshOfferRewardList,
    } = this.props;
    switch (activeTab) {
      case EARN_BIT_TAB_INDEX:
        refreshOfferActionsList();
        break;
      case REDEEM_BIT_TAB_INDEX:
        refreshOfferRewardList();
        break;
      default:
        return;
    }
  }

  loadNext = () => {
    const {
      activeTab,
    } = this.state;
    const {
      fetchOfferActionsList,
      fetchOfferRewardList,
      actionsList,
      rewardsList,
    } = this.props;
    switch (activeTab) {
      case EARN_BIT_TAB_INDEX:
        if (!actionsList.isReachedEnd) {
          fetchOfferActionsList(actionsList.lastLoadedPage + 1, PAGE_SIZE_LIMIT);
        }
        break;
      case REDEEM_BIT_TAB_INDEX:
        if (!rewardsList.isReachedEnd) {
          fetchOfferRewardList(rewardsList.lastLoadedPage + 1, PAGE_SIZE_LIMIT);
        }
        break;
      default:
        return;
    }
  }

  onEarnBitPress = (item: OfferActionItem) => {
    const {
      openSpecialActionInWalletMerchant,
    } = this.props;
    openSpecialActionInWalletMerchant(item);
  }

  onSpendBitPress = (item: OfferRewardItem) => {
    const {
      openSpecialRewardInWalletMerchant,
    } = this.props;
    openSpecialRewardInWalletMerchant(item);
  }

  onSearchChange = (text: string) => {
    this.setState({ filterValue: text });
  }

  onSearchSubmitEditing = () => {
    const {
      filterValue,
    } = this.state;
    if (filterValue && filterValue.toLowerCase() === DEV_PASSCODE) {
      this.setState({ isDevMode: true });
    }
  }

  onCloseDevMode = () => {
    this.setState({ isDevMode: false });
  }

  render() {
    const {
      actionsList,
      rewardsList,
    } = this.props;
    const {
      filterValue,
      isDevMode,
    } = this.state;
    const flatListData = this.getFlatListData();
    const isFetching = actionsList.isFetching || rewardsList.isFetching;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='#ffffff'
          />
          <View style={styles.offersHeader}>
            <View style={styles.searchWrapper}>
              <Search
                value={filterValue}
                onChangeText={this.onSearchChange}
                onSubmitEditing={this.onSearchSubmitEditing}
              />
            </View>
            {
              false && (
                <View style={styles.carouselWrapper}>
                  <Carousel/>
                </View>
              )
            }
            <View style={styles.tabBarsWrapper}>
              <TabBar onChange={this.handleChangeTab}>
                <TabBarButton title='Earn BIT' />
                <TabBarButton title='Redeem BIT' />
              </TabBar>
            </View>
          </View>
          { flatListData.length === 0 && isFetching && (
              <CentredActivityIndicator />
            )
          }
          {
            !(flatListData.length === 0 && isFetching) && (
              <FlatList
                ref={ref => (this.flatList = ref)}
                refreshControl={(
                  <RefreshControl
                    refreshing={actionsList.isRefreshing || rewardsList.isRefreshing}
                    onRefresh={this.onRefresh}
                  />
                )}
                contentContainerStyle={styles.listContainer}
                data={flatListData}
                extraData={[this.props, filterValue]}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                onEndReached={this.loadNext}
                onEndReachedThreshold={0.3}
                ListEmptyComponent={<EmptyList emptyMessage={this.getEmptyMessage()} />}
              />
            )
          }
          <DevModeDialog
            visible={isDevMode}
            onRequestClose={this.onCloseDevMode}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  refreshOfferActionsList: () => dispatch(SpecialOfferActions.refreshOfferActionsList()),
  refreshOfferRewardList: () => dispatch(SpecialOfferActions.refreshOfferRewardList()),
  fetchOfferActionsList: (page: number, perPage: number) => dispatch(SpecialOfferActions.fetchOfferActionsList(page, perPage)),
  fetchOfferRewardList: (page: number, perPage: number) => dispatch(SpecialOfferActions.fetchOfferRewardList(page, perPage)),
  openWalletMerchant: (merchant: MerchantInfo) => dispatch(NavigationActions.openWalletMerchant(merchant)),
  openSpecialActionInWalletMerchant: (actionItem: OfferActionItem) => dispatch(NavigationActions.openSpecialActionInWalletMerchant(actionItem)),
  openSpecialRewardInWalletMerchant: (rewardItem: OfferRewardItem) => dispatch(NavigationActions.openSpecialRewardInWalletMerchant(rewardItem)),
});

const mapStateToProps = () => createStructuredSelectorSpecialOffers;

export default connect(mapStateToProps, mapDispatchToProps)(SpecialOffers);
