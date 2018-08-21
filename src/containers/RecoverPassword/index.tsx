import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  centerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export interface Props { }
export interface State { }

class RecoverPassword extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.centerText}>
          Empty RecoverPassword
        </Text>
      </View>
    );
  }
}

export default RecoverPassword;
