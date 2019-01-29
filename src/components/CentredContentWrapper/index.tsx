import * as React from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  ScrollView,
  StatusBar,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  minHeightWrapper: {
    minHeight: height - (StatusBar.currentHeight ? StatusBar.currentHeight : 0),
  },
});

export interface CentredContentWrapperProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode[];
}

export interface State {}

class CentredContentWrapper extends React.Component<CentredContentWrapperProps, State> {
  render() {
    const {
      children,
    } = this.props;
    return (
      <View
        {...this.props}
        style={styles.container}
      >
        <KeyboardAwareScrollView
          style={styles.container}
        >
          <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.minHeightWrapper}>
              {children}
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default CentredContentWrapper;
