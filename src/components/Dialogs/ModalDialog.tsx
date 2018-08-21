import * as React from 'react';
import {
  Modal,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import Touchable from '../Touchable';

const { width, height } = Dimensions.get('window');

const MODAL_DIALOG_SAFE_MARGIN = 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalShadeWrapper: {
    position: 'absolute',
    width,
    height,
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 1000,
  },
  modalShade: {
    position: 'absolute',
    width,
    height,
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  centerContainer: {
    position: 'absolute',
    maxHeight: height - MODAL_DIALOG_SAFE_MARGIN * 2,
    zIndex: 1001,
    margin: MODAL_DIALOG_SAFE_MARGIN,
  },
  itemContainer: {
    paddingTop: MODAL_DIALOG_SAFE_MARGIN,
    overflow: 'scroll',
    zIndex: 1005,
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
  private modal: any;

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
      <Modal
        ref={ref => (this.modal = ref)}
        animationType='fade'
        transparent
        visible={visible}
        onRequestClose={onRequestClose}
      >
        <View style={styles.container}>
          <View style={styles.modalShadeWrapper}>
            <Touchable
              onPress={this.onShadePress}
            >
              <View style={[styles.modalShade, shadeColor ? { backgroundColor: shadeColor } : {}]} />
            </Touchable>
          </View>
          <View style={styles.centerContainer}>
            <View style={styles.itemContainer}>
              {children}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalDialog;
