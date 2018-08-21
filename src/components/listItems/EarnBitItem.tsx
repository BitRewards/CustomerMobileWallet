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
  titleText: {
    fontSize: 12,
    color: '#222222',
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
  description?: string;
  image?: string;
  onPress?: () => void;
}
export interface State { }

class EarnBitItem extends React.Component<EarnBitItemProps, State> {
  render() {
    const {
      brand,
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
          <Text style={styles.titleText}>
            {brand || 'BitRewards'}
          </Text>
          <Text style={styles.descriptionText}>
            {description || 'Earn 500 BIT and exchange them for coffee!'}
          </Text>
        </View>
      </ClickableItemContainer>
    );
  }
}

export default EarnBitItem;
