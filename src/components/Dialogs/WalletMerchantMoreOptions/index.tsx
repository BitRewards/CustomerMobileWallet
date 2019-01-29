import * as React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { NavigationActions } from '../../../actions/navigation';
import ModalDialogBaseContainer from '../ModalDialogBaseContainer';
import MoreOptionItem from './MoreOptionItem';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  middleContainerWithBorders: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(48,54,69, 0.04)',
  },
});

export interface WalletMerchantMoreOptionsProps {
  /**
   * The `visible` prop determines whether your modal is visible.
   */
  visible?: boolean;
  /**
   * The `onRequestClose` prop allows passing a function that will be called once the modal has been dismissed.
   * _On the Android platform, this is a required function._
   */
  onRequestClose?: () => void;
  openWithdraw: (partnerKey: string) => void;
  openDeposit: (partnerKey: string) => void;
  openWalletHistory: () => void;
  partnerKey: string;
}
export interface State { }

class WalletMerchantMoreOptions extends React.Component<WalletMerchantMoreOptionsProps, State> {

  onClose = (): void => {
    const {
      onRequestClose,
    } = this.props;
    if (typeof onRequestClose === 'function') {
      onRequestClose();
    }
  }

  openWithdraw = (): void => {
    const {
      openWithdraw,
      partnerKey,
    } = this.props;
    openWithdraw(partnerKey);
    this.onClose();
  }

  openHistory = (): void => {
    const {
      openWalletHistory,
    } = this.props;
    openWalletHistory();
    this.onClose();
  }

  openDeposit = () => {
    const {
      onRequestClose,
      openDeposit,
      partnerKey,
    } = this.props;
    if (typeof onRequestClose === 'function') {
      onRequestClose();
    }
    openDeposit(partnerKey);
  }

  render() {
    const {
      visible,
      onRequestClose,
    } = this.props;
    return (
      <ModalDialogBaseContainer
        visible={visible}
        onRequestClose={onRequestClose}
        shadeColor={'#e8e8e890'}
        isDisableWidthGrow={true}
      >
        <View style={styles.container}>
          <MoreOptionItem
            onPress={this.openDeposit}
            image={require('../../../img/Deposit.png')}
            text='Deposit BIT'
          />
          <MoreOptionItem
            onPress={this.openWithdraw}
            image={require('../../../img/Withdraw.png')}
            text='Withdraw BIT'
            style={styles.middleContainerWithBorders}
          />
          <MoreOptionItem
            onPress={this.openHistory}
            image={require('../../../img/History.png')}
            text='Wallet history'
          />
        </View>
      </ModalDialogBaseContainer>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openWithdraw: (partnerKey: string) => dispatch(NavigationActions.openWithdraw(partnerKey)),
  openDeposit: (partnerKey: string) => dispatch(NavigationActions.openDeposit(partnerKey)),
  openWalletHistory: () => dispatch(NavigationActions.openWalletHistory()),
});

const mapStateToProps = (state: any) => ({
  partnerKey: state.merchant.get('partnerKey'),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletMerchantMoreOptions);
