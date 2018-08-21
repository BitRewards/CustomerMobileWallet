import * as React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export interface Props { }
export interface State { }

class CentredActivityIndicator extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator animating size='large' />
      </View>
    );
  }
}

export default CentredActivityIndicator;
