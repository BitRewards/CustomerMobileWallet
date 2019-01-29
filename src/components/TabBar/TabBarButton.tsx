import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Touchable from '../Touchable';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingTop: 18,
    paddingBottom: 14,
    paddingStart: 6,
    paddingEnd: 6,
    height: 44,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 16,
    height: 16,
    fontFamily: 'ProximaNova-Bold',
    color: '#22222245',
  },
  active: {
    color: '#303645',
  },
  touchable: {
    flex: 1,
    height: 44,
  },
});

export interface TabBarProps {
  title?: string;
  active?: boolean;
  onPress?: () => void;
}
export interface State { }

class TabBar extends React.Component<TabBarProps, State> {
  render() {
    const {
      title,
      active,
      onPress,
    } = this.props;
    return (
      <Touchable onPress={onPress} style={styles.touchable}>
        <View style={styles.container}>
          <Text style={[styles.title, active ? styles.active : {}]}>
            {title}
          </Text>
        </View>
      </Touchable>
    );
  }
}

export default TabBar;
