import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import * as moment from 'moment';
import Touchable from '../Touchable';
import Status from '../Status';
import { PersonTransactionItem } from '../../services/responseTypes';
import {
  getBitValueString,
  getFiatCurrencyString,
} from '../../utils/currency';
import BitImage from '../BitImage';

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
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 11,
    paddingBottom: 19,
  },
  merchantRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#30364516',
    flexDirection: 'row',
    alignItems: 'center',
  },
  merchantLogo: {
    backgroundColor: '#ff764a',
    width: 24,
    height: 24,
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 5,
    marginEnd: 5,
  },
  partnerTitle: {
    fontSize: 14,
    color: '#303545',
    fontFamily: 'ProximaNova-Regular',
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    color: '#303545',
    fontFamily: 'ProximaNova-Regular',
  },
  iconRow: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  operationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff764a',
  },
  descriptionsBox: {
    paddingStart: 10,
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bitSubValue: {
    fontSize: 14,
    color: '#30354550',
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'right',
    flex: 1,
  },
  titleRow: {
    minHeight: 34,
    alignItems: 'center',
    flexDirection: 'row',
  },
  operationText: {
    flex: 1,
    fontSize: 16,
    color: '#303545',
    fontFamily: 'ProximaNova-Bold',
  },
  bitValue: {
    fontSize: 18,
    color: '#303545',
    fontFamily: 'ProximaNova-Bold',
    textAlign: 'right',
    flex: 1,
  },
});

export interface WalletHistoryItemProps {
  onPress?: () => void;
  item: PersonTransactionItem;
}
export interface State { }

class WalletHistoryItem extends React.Component<WalletHistoryItemProps, State> {
  render() {
    const {
      onPress,
      item,
    } = this.props;
    let displayDate = '--.--.--, --:-- am';
    try {
      const date = moment.unix(item.changedAt);
      displayDate = date.format('DD.MM.YYYY hh:mm a');
    } catch (err) {
      console.warn(JSON.stringify(err, null, 2));
    }
    const partnerTitle = item && item.partner && item.partner.title ? item.partner.title : '';
    return (
      <View style={styles.container}>
        <Touchable onPress={onPress}>
          <View style={styles.contentRow}>
            <View style={styles.merchantRow}>
              <View style={styles.merchantLogo}>
                <BitImage
                  uri={item.partner.image}
                  width={24}
                  height={24}
                />
              </View>
              <Text style={styles.partnerTitle}>
                {partnerTitle}
              </Text>
              <Text style={styles.dateText}>
                {displayDate}
              </Text>
            </View>
            <View style={styles.iconRow}>
              <View style={styles.operationIcon}>
                <BitImage
                  uri={item.image}
                  width={50}
                  height={50}
                />
              </View>
              <View style={styles.descriptionsBox}>
                <View style={styles.titleRow}>
                  <Text style={styles.operationText}>
                    {`${item.title}`}
                  </Text>
                  <Text style={styles.bitValue}>
                    {getBitValueString(item.changeBalanceAmount)}
                  </Text>
                </View>
                <View style={styles.statusRow}>
                  <Status status={item.status} />
                  <Text style={[styles.bitSubValue]}>
                    {`≈${getFiatCurrencyString(item.fiatChangeBalanceAmount, item.fiatChangeBalanceCurrency)}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Touchable>
      </View>
    );
  }
}

export default WalletHistoryItem;
