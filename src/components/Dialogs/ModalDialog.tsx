import * as React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import Touchable from '../Touchable';
import ModalDialogBaseContainer from './ModalDialogBaseContainer';

const styles = StyleSheet.create({
  modalCloseWrapper: {
    position: 'absolute',
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1006,
  },
});

export interface ModalDialogProps {
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
  shadeColor?: string;
}
export interface State { }

class ModalDialog extends React.Component<ModalDialogProps, State> {

  onShadePress = () => {
    const {
      onRequestClose,
    } = this.props;
    if (typeof onRequestClose === 'function') {
      onRequestClose();
    }
  }

  render() {
    const {
      children,
      visible,
      onRequestClose,
      shadeColor,
    } = this.props;
    return (
      <ModalDialogBaseContainer
        visible={visible}
        onRequestClose={onRequestClose}
        shadeColor={shadeColor}
      >
        <View>
          <Touchable onPress={this.onShadePress} style={styles.modalCloseWrapper}>
            <View style={styles.modalCloseWrapper}>
              <Image source={require('../../img/Close_modal.png')} />
            </View>
          </Touchable>
          {children}
        </View>
      </ModalDialogBaseContainer>
    );
  }
}

export default ModalDialog;
