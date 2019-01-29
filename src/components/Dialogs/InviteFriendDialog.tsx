import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
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
  baseText: {
    padding: 15,
    color: '#2f404a',
    fontSize: 17,
    fontFamily: 'ProximaNova-Regular',
    borderColor: 'rgba(48, 54, 69, 0.3)',
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 15,
  },
  messageText: {
    padding: 17,
    paddingTop: 17,
  },
});

export interface InviteFriendDialogProps {
  /**
   * The `visible` prop determines whether your modal is visible.
   */
  visible?: boolean;
  /**
   * The `onRequestClose` prop allows passing a function that will be called once the modal has been dismissed.
   * _On the Android platform, this is a required function._
   */
  onRequestClose?: () => void;
  title: string;
  buttonLabel?: string;
  onPress?: () => void;
}
export interface State { }

class InviteFriendDialog extends React.Component<InviteFriendDialogProps, State> {
  render() {
    const {
      visible,
      onRequestClose,
      title,
      buttonLabel,
      onPress,
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
              {title}
            </Text>
            <TextInput style={styles.baseText} placeholder='Recipient’s email' />
            <TextInput style={styles.baseText} placeholder='Senders name' />
            <TextInput
              multiline
              style={[styles.baseText, styles.messageText]}
              numberOfLines={4}
              defaultValue='Hello! «Test Shop» store is offering my friends a 5% discount on their first purchase. I was thinking you might be interested :)'
            />
            {typeof onPress === 'function' && (
              <PrimaryButton
                title={buttonLabel}
                onPress={onPress}
              />
            )}
          </View>
        </View>
      </ModalDialog>
    );
  }
}

export default InviteFriendDialog;
