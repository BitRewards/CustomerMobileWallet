import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import ClickableItemContainer from './ClickableItemContainer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingTop: 22,
    paddingBottom: 22,
  },
  titleLine: {
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 12,
    color: '#222222',
    fontFamily: 'ProximaNova-Regular',
  },
  subTitleText: {
    fontSize: 12,
    color: '#30364560',
    fontFamily: 'ProximaNova-Regular',
  },
  descriptionText: {
    fontSize: 16,
    color: '#222222',
    fontFamily: 'ProximaNova-Bold',
  },
});

export interface EarnBitItemProps {
  brand?: string;
  merchantName?: string;
  description?: string;
  image?: string;
  onPress?: () => void;
}
export interface State { }

class EarnBitItem extends React.Component<EarnBitItemProps, State> {

  renderBrand = () => {
    const {
      brand,
      merchantName,
    } = this.props;
    if (!brand && merchantName) {
      return (
        <Text style={styles.titleText}>
          {merchantName}
        </Text>
      );
    }
    if (brand && merchantName) {
      return (
        <View style={styles.titleLine}>
          <Text style={styles.titleText}>
            {brand}
          </Text>
          <Text style={styles.subTitleText}>
            {` /${merchantName}`}
          </Text>
        </View>
      );
    }
    return (null);
  }

  render() {
    const {
      description,
      image,
      onPress,
    } = this.props;
    return (
      <ClickableItemContainer
        onPress={onPress}
        image={image}
      >
        <View style={styles.container}>
          {this.renderBrand()}
          <Text style={styles.descriptionText}>
            {description || 'Earn 500 BIT and exchange them for coffee!'}
          </Text>
        </View>
      </ClickableItemContainer>
    );
  }
}

export default EarnBitItem;
