import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import Touchable from '../../components/Touchable';

const styles = StyleSheet.create({
  touchable: {
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(20, 20, 20, 0.5)',
    shadowOffset: { width: 4, height: 2 },
    shadowRadius: 10,
    borderColor: '#e0e1e4',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    elevation: 4,
    backgroundColor: '#fff',
    marginTop: 2,
    marginLeft: 14,
    marginRight: 14,
    marginBottom: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 60,
    height: 60,
    padding: 0,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff7744',
  },
  image: {
    flex: 1,
    width: 25,
    height: 25,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingStart: 15,
    paddingEnd: 12,
  },
  bodyText: {
    color: '#303645',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    fontWeight: '400',
  },
  bodyArrow: {
    width: 8,
    height: 13,
  },
});

export interface TypeDepositProps {
  text: string;
  image: ImageSourcePropType;
  onPress?: () => void;
}

export interface State { }

class TypeDeposit extends React.Component<TypeDepositProps, State> {

  render() {
    const { image, text, onPress } = this.props;
    return (
      <Touchable style={styles.touchable} onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image resizeMode='contain' style={styles.image} source={image} />
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.bodyText}>{text}</Text>
            <Image resizeMode='center' style={styles.bodyArrow} source={require('../../img/chevron_arrow.png')} />
          </View>
        </View>
      </Touchable>
    );
  }
}

export default TypeDeposit;
