import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bcbbc1',
    height: 1,
  },
});

export interface SeparatorProps {
  style?: object;
}

export interface State { }

class Separator extends React.Component<SeparatorProps, State> {
  render() {
    const {
      style,
    } = this.props;
    return (
      <View style={[styles.container, style ? style : {}]} />
    );
  }
}

export default Separator;
