import * as React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { FaqActions } from '../../actions/faq';
import { FaqItem } from '../../services/responseTypes';
import FaqListItem from '../../components/listItems/FaqListItem';
import CentredActivityIndicator from '../../components/CentredActivityIndicator';

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
    paddingTop: 11,
  },
});

export interface FaqProps {
  fetchFaq: (partnerKey: string) => void;
  isFetching: boolean;
  items: [FaqItem];
  error: any;
}

export interface State { }

class Faq extends React.Component<FaqProps, State> {
  static navigationOptions = {
    title: 'FAQ',
    headerStyle: {
      backgroundColor: '#ffffff',
    },
  };

  private flatList: any;

  componentDidMount() {
    const {
      fetchFaq,
    } = this.props;
    fetchFaq('test-partner-key');
  }

  getFlatListData = () => {
    const {
      items,
    } = this.props;
    return items;
  }

  renderItem = (listItemInfo: ListRenderItemInfo<FaqItem>) => {
    const {
      item,
    } = listItemInfo;
    return (
      <FaqListItem item={item} />
    );
  }

  keyExtractor = (item: any, index: number) => `faq-${index}`;

  render() {
    const flatListData = this.getFlatListData();
    const {
      isFetching,
    } = this.props;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#ffffff'
        />
        <View style={styles.container}>
          { isFetching && (
            <CentredActivityIndicator />
          )}
          { !isFetching && (
            <FlatList
              ref={ref => (this.flatList = ref)}
              contentContainerStyle={styles.listContainer}
              data={flatListData}
              extraData={this.props}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchFaq: (partnerKey: string) => dispatch(FaqActions.fetchFaqList(partnerKey)),
});

const mapStateToProps = (state: any) => ({
  isFetching: state.faq.get('isFetching'),
  items: state.faq.get('items').toJS(),
  error: state.faq.get('error'),
});

export default connect(mapStateToProps, mapDispatchToProps)(Faq);
