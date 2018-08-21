import * as React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  ImageSourcePropType,
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

export interface AuthInputFieldProps {
  placeholder: string;
  icon: ImageSourcePropType;
}
export interface State { }

class AuthInputField extends React.Component<AuthInputFieldProps, State> {
  render() {
    const {
      placeholder,
      icon,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <Image source={icon} />
        </View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={'#30364560'}
          underlineColorAndroid='transparent'
        />
      </View>
    );
  }
}

export default AuthInputField;
