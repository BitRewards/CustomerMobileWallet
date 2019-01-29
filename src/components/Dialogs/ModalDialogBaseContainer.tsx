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
    width: '100%',
    maxHeight: height - MODAL_DIALOG_SAFE_MARGIN * 2,
    overflow: 'scroll',
    zIndex: 1001,
  },
  itemContainer: {
    paddingTop: MODAL_DIALOG_SAFE_MARGIN,
    overflow: 'scroll',
    zIndex: 1005,
  },
  modalBackgroundWrapper: {
    margin: MODAL_DIALOG_SAFE_MARGIN,
  },
  modalBackground: {
    backgroundColor: 'white',
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    borderRadius: 4,
  },
});

export interface ModalDialogBaseContainerProps {
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
  isDisableWidthGrow?: boolean;
}
export interface State { }

class ModalDialogBaseContainer extends React.Component<ModalDialogBaseContainerProps, State> {
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
      isDisableWidthGrow,
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
              <View style={styles.modalBackgroundWrapper}>
                <View style={[styles.modalBackground, isDisableWidthGrow ? { flexGrow: 0 } : { flexGrow: 1 }]}>
                  {children}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalDialogBaseContainer;
