import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import ModalDialog from './ModalDialog';
import PrimaryButton from '../PrimaryButton';

const { width } = Dimensions.get('window');

const MODAL_DIALOG_SAFE_MARGIN = 24;

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: 'white',
    flex: 1,
    flexGrow: 1,
    width: width - MODAL_DIALOG_SAFE_MARGIN * 2,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    borderRadius: 4,
  },
  contentContainer: {
    flexDirection: 'column',
    paddingStart: 22,
    paddingEnd: 22,
    paddingTop: 41,
    paddingBottom: 41,
  },
  title: {
    fontSize: 22,
    color: '#303645',
    fontFamily: 'ProximaNova-Bold',
    marginBottom: 18,
  },
  description: {
    fontSize: 16,
    color: '#303645',
    fontFamily: 'ProximaNova-Regular',
    marginBottom: 25,
  },
});

export interface EarnBitDialogProps {
  children: JSX.Element | JSX.Element[];
  /**
   * The `visible` prop determines whether your modal is visible.
   */
  visible?: boolean;
  /**
   * The `onRequestClose` prop allows passing a function that will be called once the modal has been dismissed.
   * _On the Android platform, this is a required function._
   */
  onRequestClose?: () => void;
}
export interface State { }

class EarnBitDialog extends React.Component<EarnBitDialogProps, State> {
  render() {
    const {
      visible,
      onRequestClose,
    } = this.props;
    return (
      <ModalDialog
        onRequestClose={onRequestClose}
        visible={visible}
        shadeColor={'#e8e8e890'}
      >
        <View style={styles.modalBackground}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              {'Discount $2'}
            </Text>
            <Text style={styles.description}>
              {'Use $2 discount for purchase over $5000'}
            </Text>
            <PrimaryButton title={'200 BIT'} />
          </View>
        </View>
      </ModalDialog>
    );
  }
}

export default EarnBitDialog;
