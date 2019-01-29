import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    color: '#30364580',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
});

export interface EmptyListProps {
  emptyMessage: string;
}

export interface State { }

class EmptyList extends React.Component<EmptyListProps, State> {
  render() {
    const {
      emptyMessage,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.centerText}>
          {emptyMessage}
        </Text>
      </View>
    );
  }
}

export default EmptyList;
