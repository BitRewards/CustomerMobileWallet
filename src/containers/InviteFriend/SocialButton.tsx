import * as React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
} from 'react-native';
import Touchable from '../../components/Touchable';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 46,
    width: width / 1.2,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'ProximaNova-Semibold',
    fontSize: 16,
    flex: 1,
  },
  icon: {
    position: 'absolute',
    left: 18,
    width: 23,
    height: 23,
  },
});

export interface SocialButtonProps {
  backgroundColor: string;
  icon: any;
  title: string;
  onPress: () => void;
}

export interface State { }
export default class SocialButton extends React.Component<SocialButtonProps, State> {

  render() {
    const { onPress } = this.props;
    return (
      <Touchable
        onPress={onPress}
        style={styles.container}
      >
        <View style={[styles.container, { backgroundColor: this.props.backgroundColor }]}>
          <Image resizeMode='contain' style={styles.icon} source={this.props.icon} />
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </Touchable>
    );
  }
}
