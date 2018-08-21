import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Touchable from '../../Touchable';

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    height: 50,
  },
  container: {
    marginStart: 2,
    marginEnd: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#30364540',
  },
});

export interface SocialButtonProps {
  onPress?: () => void;
}
export interface State { }

class SocialButton extends React.Component<SocialButtonProps, State> {
  render() {
    const {
      onPress,
    } = this.props;
    return (
      <Touchable onPress={onPress} style={styles.touchable}>
        <View style={styles.container}>
          <Text>
            {''}
          </Text>
        </View>
      </Touchable>
    );
  }
}

export default SocialButton;
