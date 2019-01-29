import * as React from 'react';
import {
  StyleSheet,
  View,
  Image, ImageSourcePropType,
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
  imageSource?: ImageSourcePropType;
  onPress?: () => void;
}
export interface State { }

class SocialButton extends React.Component<SocialButtonProps, State> {
  render() {
    const {
      imageSource,
      onPress,
    } = this.props;
    return (
      <Touchable onPress={onPress} style={styles.touchable}>
        <View style={styles.container}>
          {imageSource ? (<Image source={imageSource} />) : null}
        </View>
      </Touchable>
    );
  }
}

export default SocialButton;
