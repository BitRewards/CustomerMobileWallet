import * as React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import * as SvgUri from 'react-native-svg-uri';
import ErrorBoundary from '../ErrorBoundary';

const styles = StyleSheet.create({
  errorContainer: {
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
  },
});

export interface BitImageProps {
  width?: number | string;
  height?: number | string;
  uri: string;
}
export interface State { }

class BitImage extends React.Component<BitImageProps, State> {

  renderErrorView = (error: any, info: any) => {
    return (
      <View style={styles.errorContainer} />
    );
  }

  render() {
    const {
      width,
      height,
      uri,
    } = this.props;
    return (
      <ErrorBoundary
        renderErrorView={this.renderErrorView}
      >
        <View>
          { (typeof uri === 'string') && (
            // @ts-ignore
            <SvgUri
              width={width}
              height={height}
              source={{uri}}
            />
          )
          }
        </View>
      </ErrorBoundary>
    );
  }
}

export default BitImage;
