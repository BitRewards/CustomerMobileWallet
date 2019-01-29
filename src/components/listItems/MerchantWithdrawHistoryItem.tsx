import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Touchable from '../Touchable';
import Status from '../Status';
import { MerchantWithdrawHistoryItem } from '../../services/responseTypes';

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
  item: MerchantWithdrawHistoryItem;
}
export interface State { }

class WithdrawHistoryItem extends React.Component<MerchantHistoryItemProps, State> {
  render() {
    const {
      item,
      onPress,
    } = this.props;
    const displayDate = item.createdAtStr;
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
                {'Withdraw'}
              </Text>
              <Text style={styles.bitValue}>
                {`${item.payout}`}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.addressNumber, styles.noData]}>
                {/* '0x59************6552' */}
              </Text>
              <Text style={[styles.bitSubValue]}>
                {`≈${item.payoutInPartnerCurrency}`}
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

export default WithdrawHistoryItem;
