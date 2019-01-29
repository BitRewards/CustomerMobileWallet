import * as React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  ImageSourcePropType,
  TextInputProps,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#30364540',
    marginBottom: 20,
  },
  iconWrapper: {
    width: 20,
    marginEnd: 16,
  },
  input: {
    flex: 1,
    color: '#303645',
    fontSize: 17,
    fontFamily: 'ProximaNova-Regular',
    lineHeight: 17,
    height: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export interface AuthInputFieldProps extends TextInputProps {
  icon: ImageSourcePropType;
  isError?: boolean;
}
export interface State { }

class AuthInputField extends React.Component<AuthInputFieldProps, State> {
  render() {
    const {
      icon,
      isError,
    } = this.props;
    return (
      <View style={[styles.container, isError ? { borderBottomColor: 'red' } : { borderBottomColor: '#30364540' }]}>
        <View style={styles.iconWrapper}>
          <Image source={icon} />
        </View>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#30364560'}
          underlineColorAndroid='transparent'
          {...this.props}
        />
      </View>
    );
  }
}

export default AuthInputField;
