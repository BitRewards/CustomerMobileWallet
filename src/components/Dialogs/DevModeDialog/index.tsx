import * as React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  Button,
} from 'react-native';
import Touchable from '../../Touchable';
import Api, { API_BASE_URL } from '../../../services/Api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
  },
  devContainer: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
  },
  toolbarSpace: {
    flex: 1,
    flexGrow: 1,
  },
  closeContainer: {
    paddingTop: 16,
  },
  closeButton: {
    padding: 12,
  },
  optionLabel: {
    fontFamily: 'ProximaNova-Regular',
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  optionValue: {
    fontFamily: 'ProximaNova-Bold',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  inputContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#00000010',
    borderRadius: 10,
    height: 36,
    padding: 7,
    flexDirection: 'row',
    margin: 8,
  },
  centerText: {
    flex: 1,
    padding: 0,
    fontSize: 17,
    color: '#000000',
    fontFamily: 'ProximaNova-Regular',
    borderWidth: 0,
  },
  buttonsContainer: {
    flexGrow: 0,
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
});

export interface DevModeDialogProps {
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
export interface State {
  baseUrl: string | undefined;
  newBaseUrlValue: string;
}

class DevModeDialog extends React.Component<DevModeDialogProps, State> {
  private modal: any;

  constructor(props: DevModeDialogProps) {
    super(props);

    this.state = {
      baseUrl: Api.getBaseUrl(),
      newBaseUrlValue: '',
    };
  }

  onClosePress = () => {
    const {
      onRequestClose,
    } = this.props;
    if (typeof onRequestClose === 'function') {
      onRequestClose();
    }
  }

  onChangeText = (text: string) => {
    this.setState({newBaseUrlValue: text.toLowerCase()});
  }

  updateBaseUrl = (value: string) => {
    Api.setBaseUrl(value);
    this.setState({baseUrl: Api.getBaseUrl()});
  }

  resetBaseUrl = () => {
    Api.setBaseUrl(API_BASE_URL);
    this.setState({baseUrl: Api.getBaseUrl()});
  }

  renderQuickSetButton = (url: string) => {
    const updateNewValue = () => this.updateBaseUrl(url);
    return (
      <Button
        title={url}
        onPress={updateNewValue}
      />
    );
  }

  render() {
    const {
      visible,
      onRequestClose,
    } = this.props;
    const {
      baseUrl,
      newBaseUrlValue,
    } = this.state;
    const updateNewValue = () => this.updateBaseUrl(newBaseUrlValue);
    return (
      <Modal
        ref={ref => (this.modal = ref)}
        animationType='fade'
        transparent
        visible={visible}
        onRequestClose={onRequestClose}
      >
        <View style={styles.container}>
          <StatusBar
            barStyle='dark-content'
            backgroundColor='#ff764a'
          />
          <View style={styles.devContainer}>
            <View style={styles.toolbar}>
              <View style={styles.toolbarSpace} />
              <View style={styles.closeContainer}>
                <Touchable onPress={this.onClosePress}>
                  <View style={styles.closeButton}>
                    <Image source={require('../../../img/Close.png')} />
                  </View>
                </Touchable>
              </View>
            </View>
            <Text style={styles.optionLabel}>{'Current base url:'}</Text>
            <Text style={styles.optionValue}>{baseUrl}</Text>
            <Text style={styles.optionLabel}>{'Set new value:'}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.centerText}
                placeholder='base url'
                selectionColor={'#ff764a'}
                placeholderTextColor='#00000040'
                underlineColorAndroid='transparent'
                onChangeText={this.onChangeText}
                onSubmitEditing={updateNewValue}
                value={newBaseUrlValue}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <Button title={'update base url'} onPress={updateNewValue} />
              <Button title={'reset base url'} onPress={this.resetBaseUrl} color={'red'} />
            </View>
            <Text style={styles.optionLabel}>{'List of common dev urls:'}</Text>
            <View style={styles.buttonsContainer}>
              {this.renderQuickSetButton('https://crm-alpha.inprg.com/api-client')}
              {this.renderQuickSetButton('https://crm-beta.inprg.com/api-client')}
              {this.renderQuickSetButton('https://crm-delta.inprg.com/api-client')}
              {this.renderQuickSetButton('https://crm-gamma.inprg.com/api-client')}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default DevModeDialog;
