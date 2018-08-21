import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1dd77912',
    marginTop: 4,
    marginBottom: 16,
    overflow: 'hidden',
    borderRadius: 2,
    paddingEnd: 10,
    paddingStart: 5,
  },
  statusText: {
    fontSize: 14,
    color: '#303545',
    fontFamily: 'ProximaNova-Regular',
  },
  iconConfirmed: {
    marginEnd: 5,
    marginBottom: 5,
    marginStart: 1,
    marginTop: 6,
  },
});

export interface StatusProps {
  status: string;
}

export interface State { }

class Status extends React.Component<StatusProps, State> {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../img/ic_status_confirmed.png')} style={styles.iconConfirmed} />
        <Text style={styles.statusText}>
          {'Сonfirmed'}
        </Text>
      </View>
    );
  }
}

export default Status;
