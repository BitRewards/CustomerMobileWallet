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
import OtherOptionItem from '../../components/listItems/OtherOptionItem';
import Separator from '../../components/listItems/Separator';
import { NavigationActions } from '../../actions/navigation';

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
  },
});

interface OptionItem {
  title: string;
  onPress: () => void;
}

export interface OtherProps {
  openFaq: () => void;
}

export interface State { }

class Other extends React.Component<OtherProps, State> {
  static navigationOptions = {
    title: 'Other',
    headerStyle: {
      backgroundColor: '#ffffff',
    },
  };

  private flatList: any;

  getFlatListData = () => {
    const {
      openFaq,
    } = this.props;
    return [
      { title: 'Settings', onPress: () => {} },
      { title: 'Faq', onPress: openFaq },
    ];
  }

  renderItem = (listItemInfo: ListRenderItemInfo<OptionItem>) => {
    const {
      item,
    } = listItemInfo;
    return (
      <OtherOptionItem
        title={item.title}
        onPress={item.onPress}
      />
    );
  }

  renderSeparator = () => {
    return (
      <Separator />
    );
  }

  keyExtractor = (item: any, index: number) => `other-${index}`;

  render() {
    const flatListData = this.getFlatListData();
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#ffffff'
        />
        <View style={styles.container}>
          <FlatList
            ref={ref => (this.flatList = ref)}
            contentContainerStyle={styles.listContainer}
            data={flatListData}
            extraData={this.props}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openFaq: () => dispatch(NavigationActions.openFaq()),
});

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Other);
