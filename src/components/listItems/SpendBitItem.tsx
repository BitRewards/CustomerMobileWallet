import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import ItemContainer from './ItemContainer';
import Touchable from '../Touchable';
import BitImage from '../BitImage'

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
  buttonContainer: {
    width: 100,
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 20,
    height: 40,
    backgroundColor: '#ff764a',
    alignItems: 'center',
    justifyContent: 'center',
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

export interface EarnBitItemProps {
  onPress?: () => void;
  image?: string;
  brand?: string;
  partnerTitle?: string;
  title?: string;
  description?: string;
}
export interface State { }

class SpendBitItem extends React.Component<EarnBitItemProps, State> {
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
      brand,
      partnerTitle,
      title,
      description,
      image,
    } = this.props;
    return (
      <ItemContainer>
        <View style={styles.container}>
          <View style={styles.infoColumn}>
            <View style={styles.merchantTitleWrapper}>
              <Text style={styles.merchantText}>{`${brand || ''} `}</Text><Text style={styles.merchantLightText}>{`/${partnerTitle}`}</Text>
            </View>
            <Text style={styles.discountText}>
              {title}
            </Text>
            <Text style={styles.descriptionText}>
              {description}
            </Text>
            <View style={styles.buttonContainer}>
              <Touchable onPress={this.handleClick}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>
                    {'200 BIT'}
                  </Text>
                </View>
              </Touchable>
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

export default SpendBitItem;
