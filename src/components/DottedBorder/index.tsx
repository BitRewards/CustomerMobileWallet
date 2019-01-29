import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  line: {
    left: 0,
    height: 0,
    borderStyle: 'dotted',
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});

export interface DotterBorderProps {
  width?: number;
  height?: number;
  borderColor?: string;
  borderWidth: number;
}

export interface State { }

export default class DotterBorder extends React.Component<DotterBorderProps, State> {

  render() {
    const { width, height, borderColor, borderWidth } = this.props;
    return (
      <View
        removeClippedSubviews
        style={[
          {
            top: -borderWidth / 2,
            left: -borderWidth / 2,
            width,
            height,
            overflow: 'hidden',
          },
        ]}
      >
        <View
          style={[
            styles.line,
            {
              width,
              height,
              borderColor,
              borderWidth,
            },
          ]}
        />
      </View>
    );
  }
}
