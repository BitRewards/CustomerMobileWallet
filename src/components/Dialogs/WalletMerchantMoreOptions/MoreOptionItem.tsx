import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Touchable from '../../Touchable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    paddingBottom: 15,
    paddingTop: 15,
  },
  image: {
    width: 26,
    height: 26,
  },
  text: {
    color: '#303545',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 18,
    marginLeft: 22,
  },
});

export interface MoreOptionItemProps {
  text: string;
  image: any;
  style?: any;
  onPress: () => void;
}
export interface State { }

class MoreOptionItem extends React.Component<MoreOptionItemProps, State> {
  render() {
    const { text, image, style, onPress } = this.props;
    return (
      <Touchable onPress={onPress}>
        <View style={[styles.container, style]}>
          <Image resizeMode='contain' style={styles.image} source={image} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </Touchable>
    );
  }
}

export default MoreOptionItem;
