import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import ItemContainer from './ItemContainer';
import Touchable from '../Touchable';
import BitImage from '../BitImage';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 24,
    paddingStart: 26,
    paddingEnd: 12,
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'column',
    paddingEnd: 8,
  },
  iconColumn: {
    flexDirection: 'column',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff764a',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  merchantTitleWrapper: {
    flexDirection: 'row',
  },
  discountText: {
    fontSize: 22,
    color: '#303645',
    fontFamily: 'ProximaNova-Bold',
  },
  descriptionText: {
    fontSize: 16,
    color: '#30364560',
    fontFamily: 'ProximaNova-Regular',
    marginBottom: 17,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  buttonContainer: {
    minWidth: 100,
    flexGrow: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 20,
    height: 40,
    backgroundColor: '#ff764a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingEnd: 8,
    paddingStart: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'ProximaNova-Bold',
  },
  merchantText: {
    color: '#303645',
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular',
  },
  merchantLightText: {
    color: '#30364550',
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular',
  },
});

export interface RedeemBitItemProps {
  id: number;
  onPress?: () => void;
  image?: string;
  title?: string;
  price: string;
  description?: string;
}
export interface State { }

class RedeemBitItem extends React.Component<RedeemBitItemProps, State> {
  handleClick = () => {
    const {
      onPress,
    } = this.props;
    if (typeof onPress === 'function') {
      onPress();
    }
  }

  render() {
    const {
      title,
      description,
      image,
      price,
    } = this.props;
    return (
      <ItemContainer>
        <View style={styles.container}>
          <View style={styles.infoColumn}>
            <Text style={styles.discountText}>
              {title}
            </Text>
            <Text style={styles.descriptionText}>
              {description}
            </Text>
            <View style={styles.buttonWrapper}>
              <View style={styles.buttonContainer}>
                <Touchable onPress={this.handleClick}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>
                      {price}
                    </Text>
                  </View>
                </Touchable>
              </View>
            </View>
          </View>
          <View style={styles.iconColumn}>
            <View style={styles.iconBox}>
              { (typeof image === 'string') && (
                // @ts-ignore
                <BitImage
                  width='50'
                  height='50'
                  uri={image}
                />
              )
              }
            </View>
          </View>
        </View>
      </ItemContainer>
    );
  }
}

export default RedeemBitItem;
