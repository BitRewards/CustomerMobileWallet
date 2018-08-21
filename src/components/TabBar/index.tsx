import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  activityBorder: {
    height: 2,
    backgroundColor: '#303645',
  },
});

export interface TabBarProps {
  children: JSX.Element | JSX.Element[];
  onChange?: (index: number) => void;
}
export interface TabBarState {
  activeIndex: number;
}

class TabBar extends React.Component<TabBarProps, TabBarState> {
  constructor(props: TabBarProps) {
    super(props);

    this.state = {
      activeIndex: 0,
    };
  }

  toggleTab = (index: number): void => {
    const {
      onChange,
    } = this.props;
    this.setState({ activeIndex: index }, () => {
      if (typeof onChange === 'function') {
        onChange(index);
      }
    });
  }

  render() {
    const {
      children,
    } = this.props;
    const {
      activeIndex,
    } = this.state;
    const tabsCount = React.Children.count(children);
    const tabs = React.Children.map(children, (child, index: number) => {
      // @ts-ignore
      return React.cloneElement(child, {
        onPress: () => this.toggleTab(index),
        active: activeIndex === index,
      });
    });
    return (
      <View>
        <View style={styles.container}>
          {tabs}
        </View>
        <View style={[styles.activityBorder, { width: `${100 / tabsCount}%`, left: `${activeIndex * (100 / tabsCount)}%` } ]} />
      </View>
    );
  }
}

export default TabBar;
