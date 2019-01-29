import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Touchable from '../Touchable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 48,
  },
  touchable: {
    flex: 1,
    top: 0,
    bottom: 0,
    height: 48,
    padding: 0,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 14,
    paddingStart: 6,
    paddingEnd: 6,
    width: '100%',
    height: 48,
    backgroundColor: '#ff764a',
    borderRadius: 4,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 17,
    height: 17,
    fontFamily: 'ProximaNova-Semibold',
    color: '#fff',
  },
});

export interface PrimaryButtonProps {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
}
export interface State { }

class PrimaryButton extends React.Component<PrimaryButtonProps, State> {
  render() {
    const {
      title,
      onPress,
      disabled,
    } = this.props;
    return (
      <View style={styles.container}>
        <Touchable
          onPress={onPress}
          disabled={disabled}
          style={styles.touchable}
        >
          <View style={styles.buttonContainer}>
            <Text style={[styles.title]}>
              {title}
            </Text>
          </View>
        </Touchable>
      </View>
    );
  }
}

export default PrimaryButton;
