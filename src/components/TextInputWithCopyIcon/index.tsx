import * as React from 'react';
import { View, Text, Image, StyleSheet, Clipboard } from 'react-native';
import Toast from 'react-native-simple-toast';
import Touchable from '../../components/Touchable';

const styles = StyleSheet.create({
  toAdressContainer: {
    borderColor: 'rgba(48, 54, 69, 0.3)',
    borderWidth: 1,
    borderRadius: 2,
    marginHorizontal: 26,
    marginTop: 10,
  },
  copyTextInput: {
    padding: 16,
    paddingRight: 40,
    color: '#2f404a',
    fontSize: 18,
    fontFamily: 'ProximaNova-Regular',
  },
  copyIconContainer: {
    position: 'absolute',
    top: 16,
    right: 10,
  },
  copyIcon: {
    width: 21,
    height: 23,
  },
});

export interface TextInputWithCopyIconProps {
  text: string;
  textIsCopiedMessage?: string;
}

export interface State { }

class TextInputWithCopyIcon extends React.Component<TextInputWithCopyIconProps, State> {

  copyAddress = (): void => {
    const {
      text,
      textIsCopiedMessage,
    } = this.props;
    Clipboard.setString(text);
    const message = textIsCopiedMessage || 'text is copied to clipboard';
    Toast.show(message, Toast.LONG);
  }

  render() {
    const { text } = this.props;
    return (
      <View style={styles.toAdressContainer}>
        <Text
          numberOfLines={1}
          style={styles.copyTextInput}
        >
          {text}
        </Text>
        <View style={styles.copyIconContainer}>
          <Touchable onPress={this.copyAddress}>
            <Image style={styles.copyIcon} source={require('../../img/copy.png')} />
          </Touchable>
        </View>
      </View>
    );
  }
}

export default TextInputWithCopyIcon;
