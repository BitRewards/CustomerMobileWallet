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
import OtherOptionItem from '../../components/listItems/OtherOptionItem'
import Separator from '../../components/listItems/Separator'

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

export interface Props { }

export interface State { }

class Other extends React.Component<Props, State> {
  private flatList: any;

  getFlatListData = () => {
    return [
      { title: 'Settings' },
      { title: 'FAQ' },
    ];
  }

  renderItem = (listItemInfo: ListRenderItemInfo<any>) => {
    const {
      item,
    } = listItemInfo;
    return (
      <OtherOptionItem
        title={item.title}
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

const mapDispatchToProps = () => ({
});

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Other);
