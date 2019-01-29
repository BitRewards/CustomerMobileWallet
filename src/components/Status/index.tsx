import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { Status as StatusType } from '../../services/responseTypes';

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
  status: StatusType;
}

export interface State { }

class Status extends React.Component<StatusProps, State> {
  render() {
    const {
      status,
    } = this.props;
    let backgroundColor = '#1dd77912';
    let color = '#303545';
    let statusText = 'unknown';
    let imgSource = require('../../img/ic_status_confirmed.png');
    switch (status) {
      case 'confirmed':
        backgroundColor = '#1dd77912';
        color = '#303545';
        statusText = 'Сonfirmed';
        imgSource = require('../../img/ic_status_confirmed.png');
        break;
      case 'pending':
        backgroundColor = '#30364512';
        color = '#30354558';
        statusText = 'Pending';
        imgSource = require('../../img/ic_status_pending.png');
        break;
      case 'rejected':
        backgroundColor = '#f07e7e';
        color = '#fff';
        statusText = 'Rejected';
        imgSource = require('../../img/ic_status_rejected.png');
        break;
      default:
    }
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Image source={imgSource} style={styles.iconConfirmed} />
        <Text style={[styles.statusText, { color }]}>
          {statusText}
        </Text>
      </View>
    );
  }
}

export default Status;
