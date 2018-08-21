import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: 241,
    height: 63,
  },
  logoContainer: {
    width: 241,
    height: 52,
  },
  slogan: {
    position: 'absolute',
    bottom: 0,
    left: 60,
    fontSize: 14,
    color: '#2d404c',
    fontFamily: 'ProximaNova-Regular',
  },
});

export interface Props { }
export interface State { }

class AuthLogo extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../../img/Logo_BR.png')} />
        </View>
        <Text style={styles.slogan}>
          {'Shopping becomes mining'}
        </Text>
      </View>
    );
  }
}

export default AuthLogo;
