import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import * as moment from 'moment';
import Touchable from '../Touchable';
import Status from '../Status';
import { MerchantWalletHistoryItem } from '../../services/responseTypes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginTop: 4,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
  },
  contentRow: {
    paddingStart: 26,
    paddingEnd: 26,
    paddingTop: 27,
    paddingBottom: 19,
  },
  historyTitleRow: {
    flexDirection: 'row',
    marginBottom: 19,
  },
  row: {
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 12,
    color: '#303545',
    fontFamily: 'ProximaNova-Regular',
  },
  operationText: {
    flex: 1,
    fontSize: 14,
    color: '#303545',
    fontFamily: 'ProximaNova-Semibold',
  },
  bitValue: {
    fontSize: 18,
    color: '#303545',
    fontFamily: 'ProximaNova-Bold',
  },
  addressNumber: {
    flex: 1,
    fontSize: 18,
    color: '#303545',
    fontFamily: 'ProximaNova-Bold',
  },
  bitSubValue: {
    fontSize: 14,
    color: '#30354550',
    fontFamily: 'ProximaNova-Regular',
  },
  noData: {
    color: 'red',
  },
});

export interface MerchantHistoryItemProps {
  onPress?: () => void;
  item: MerchantWalletHistoryItem;
}
export interface State { }

class MerchantHistoryItem extends React.Component<MerchantHistoryItemProps, State> {
  render() {
    const {
      item,
      onPress,
    } = this.props;
    let displayDate = '--.--.--, --:-- am';
    try {
      const date = moment.unix(item.changedAt);
      displayDate = date.format('DD.MM.YYYY hh:mm a');
    } catch (err) {
      console.warn(JSON.stringify(err, null, 2));
    }
    return (
      <View style={styles.container}>
        <Touchable onPress={onPress}>
          <View style={styles.contentRow}>
            <View style={styles.historyTitleRow}>
              <Text style={styles.titleText}>
                {`ID ${item.id || 0}. ${displayDate}`}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.operationText}>
                {`${item.title}`}
              </Text>
              <Text style={styles.bitValue}>
                {`${item.changeBalanceAmount} BIT`}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.addressNumber, styles.noData]}>
                {/* '0x59************6552' */}
              </Text>
              <Text style={[styles.bitSubValue]}>
                {`≈${item.fiatChangeBalanceAmount}₽`}
              </Text>
            </View>
            <View style={styles.row}>
              <Status status={item.status} />
            </View>
          </View>
        </Touchable>
      </View>
    );
  }
}

export default MerchantHistoryItem;
