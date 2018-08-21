import * as React from 'react';
import {
  FlatList,
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
import EarnBitDialog from '../../components/Dialogs/EarnBitDialog';
import {
  OfferActionItem,
  OfferRewardItem,
} from '../../services/responseTypes';

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
  },
});

const EARN_BIT_TAB_INDEX = 0;
const REDEEM_BIT_TAB_INDEX = 1;

export interface SpecialOffersProps {
  fetchOfferActionsList: (page: number, perPage: number) => any;
  fetchOfferRewardList: (page: number, perPage: number) => any;
  isFetching: boolean;
  actionItems: [OfferActionItem];
  rewardItems: any;
  error: any;
}

export interface SpecialOffersState {
  activeTab: number;
  isModalVisible: boolean;
}

class SpecialOffers extends React.Component<SpecialOffersProps, SpecialOffersState> {
  private flatList: any;

  constructor(props: SpecialOffersProps) {
    super(props);

    this.state = {
      activeTab: 0,
      isModalVisible: false,
    };
  }

  componentDidMount() {
    const {
      fetchOfferActionsList,
      fetchOfferRewardList,
    } = this.props;
    fetchOfferActionsList(1, 15);
    fetchOfferRewardList(1, 15);
  }

  handleChangeTab = (index: number) => {
    this.setState({ activeTab: index }, this.scrollToTop);
  }

  scrollToTop = () => {
    if (this.flatList) {
      this.flatList.scrollToOffset({ offset: 0, animated: false });
    }
  }

  getFlatListData = () => {
    const {
      actionItems,
      rewardItems,
    } = this.props;
    const {
      activeTab,
    } = this.state;
    switch (activeTab) {
      case EARN_BIT_TAB_INDEX:
        return actionItems;
      case REDEEM_BIT_TAB_INDEX:
        return rewardItems;
      default:
        return [];
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
        return (
          <EarnBitItem
            image={'https://crm.inprg.com/assets/icons/gift.svg'}
            brand={actionItem.brand}
            description={actionItem.action.description}
            onPress={this.onEarnBitPress}
          />
        );
      case REDEEM_BIT_TAB_INDEX:
        const rewardItem: OfferRewardItem = item;
        return (
          <SpendBitItem
            image={'https://crm.inprg.com/assets/icons/gift.svg'}
            brand={rewardItem.brand}
            partnerTitle={rewardItem.reward.partner.title}
            title={rewardItem.reward.title}
            description={rewardItem.reward.description}
          />
        );
      default:
        return null;
    }
  }

  keyExtractor = (item: any, index: number) => `offer-${index}`;

  onEarnBitPress = () => {
    this.setState({ isModalVisible: true });
  }

  closeModal = () => {
    this.setState({ isModalVisible: false });
  }

  render() {
    const {
      isFetching,
    } = this.props;
    const {
      isModalVisible,
    } = this.state;
    const flatListData = this.getFlatListData();
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='#ffffff'
          />
          <View style={styles.offersHeader}>
            <View style={styles.searchWrapper}>
              <Search />
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
                contentContainerStyle={styles.listContainer}
                data={flatListData}
                extraData={this.props}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
              />
            )
          }
          <EarnBitDialog
            onRequestClose={this.closeModal}
            visible={isModalVisible}
          >
          </EarnBitDialog>
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchOfferActionsList: (page: number, perPage: number) => dispatch(SpecialOfferActions.fetchOfferActionsList(page, perPage)),
  fetchOfferRewardList: (page: number, perPage: number) => dispatch(SpecialOfferActions.fetchOfferRewardList(page, perPage)),
});

const mapStateToProps = (state: any) => ({
  isFetching: state.specialOffers.get('isFetching'),
  actionItems: state.specialOffers.get('actionItems').toJS(),
  rewardItems: state.specialOffers.get('rewardItems').toJS(),
  error: state.specialOffers.get('error'),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecialOffers);
