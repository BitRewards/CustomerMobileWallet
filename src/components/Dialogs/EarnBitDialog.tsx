import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import ModalDialog from './ModalDialog';
import PrimaryButton from '../PrimaryButton';

const styles = StyleSheet.create({
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
  description: string;
  buttonLabel?: string;
  onPress?: () => void;
}
export interface State { }

class EarnBitDialog extends React.Component<EarnBitDialogProps, State> {
  render() {
    const {
      visible,
      onRequestClose,
      title,
      description,
      buttonLabel,
      onPress,
    } = this.props;
    return (
      <ModalDialog
        onRequestClose={onRequestClose}
        visible={visible}
        shadeColor={'#e8e8e890'}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.description}>
            {description}
          </Text>
          { typeof onPress === 'function' && (
            <PrimaryButton
              title={buttonLabel}
              onPress={onPress}
            />
          )}
        </View>
      </ModalDialog>
    );
  }
}

export default EarnBitDialog;
