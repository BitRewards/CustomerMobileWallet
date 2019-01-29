import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import moment from 'moment';
import ModalDialog from '../ModalDialog';
import { MerchantWalletHistoryItem } from '../../../services/responseTypes';
import {getFiatCurrencyString} from '../../../utils/currency';

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'column',
    paddingStart: 22,
    paddingEnd: 22,
    paddingTop: 41,
    paddingBottom: 41,
  },
  title: {
    color: '#303645',
    fontSize: 22,
    fontFamily: 'ProximaNova-Semibold',
    marginBottom: 8,
  },
  infoLine: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  labelBox: {
    flex: 1,
  },
  valueBox: {
    flex: 2,
  },
  valueText: {
    color: '#303645',
    fontSize: 16,
    fontFamily: 'ProximaNova-Regular',
  },
});

export interface WalletHistoryInfoDialogProps {
  /**
   * The `visible` prop determines whether your modal is visible.
   */
  visible?: boolean;
  /**
   * The `onRequestClose` prop allows passing a function that will be called once the modal has been dismissed.
   * _On the Android platform, this is a required function._
   */
  onRequestClose?: () => void;
  item?: MerchantWalletHistoryItem | null;
}
export interface State { }

class WalletHistoryInfoDialog extends React.Component<WalletHistoryInfoDialogProps, State> {

  renderInfoLine = (label: string, value?: string | Element | null) => {
    let content = null;
    if (value && typeof value === 'string') {
      content = (
        <Text style={styles.valueText}>
          {value}
        </Text>
      );
    } else if (value) {
      content = value;
    }
    return (
      <View style={styles.infoLine}>
        <View style={styles.labelBox}>
          <Text>
            {label}
          </Text>
        </View>
        <View style={styles.valueBox}>
          {content}
        </View>
      </View>
    );
  }

  render() {
    const {
      visible,
      onRequestClose,
      item,
    } = this.props;
    const id = item ? String(item.id) : undefined;
    let displayDate = '';
    let ammount = '';
    try {
      if (item && Object.prototype.hasOwnProperty.call(item, 'changedAt')) {
        const date = moment.unix(item.changedAt);
        displayDate = date.format('DD.MM.YYYY hh:mm a');
      }
    } catch (e) {
      console.warn(JSON.stringify(e, null, 2));
    }
    if (item) {
      ammount = `≈${getFiatCurrencyString(item.fiatChangeBalanceAmount, item.fiatChangeBalanceCurrency)}`;
    }
    return (
      <ModalDialog
        onRequestClose={onRequestClose}
        visible={visible}
        shadeColor={'#e8e8e890'}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {'Details'}
          </Text>
          {this.renderInfoLine('ID', id)}
          {this.renderInfoLine('Date/time', displayDate)}
          {this.renderInfoLine('Ammount', ammount)}
        </View>
      </ModalDialog>
    );
  }
}

export default WalletHistoryInfoDialog;
