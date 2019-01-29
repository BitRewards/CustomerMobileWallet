import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import ClickableItemContainer from './ClickableItemContainer';
import { getBitValueString } from '../../utils/currency';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingTop: 22,
    paddingBottom: 22,
  },
  titleText: {
    fontSize: 15,
    color: '#303645',
    fontFamily: 'ProximaNova-Regular',
  },
  bitText: {
    fontSize: 18,
    color: '#303645',
    fontFamily: 'ProximaNova-Bold',
  },
});

export interface MerchantItemProps {
  onPress?: () => void;
  highlight?: boolean;
  image?: string;
  title: string;
  balanceAmount: number;
}
export interface State { }

class MerchantItem extends React.Component<MerchantItemProps, State> {
  render() {
    const {
      onPress,
      highlight,
      image,
      title,
      balanceAmount,
    } = this.props;
    return (
      <ClickableItemContainer
        onPress={onPress}
        image={image}
        highlight={highlight}
      >
        <View style={styles.container}>
          <Text style={styles.titleText}>
            {title || ' '}
          </Text>
          <Text style={styles.bitText}>
            {getBitValueString(balanceAmount)}
          </Text>
        </View>
      </ClickableItemContainer>
    );
  }
}

export default MerchantItem;
