import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  redRow: {
    height: 42,
    backgroundColor: '#f16262',
    justifyContent: 'center',
  },
  centerText: {
    fontSize: 20,
    lineHeight: 42,
    textAlign: 'center',
    color: '#fff',
  },
});

export interface OwnProps {
  children: React.ReactNode;
}

interface StateProps {
  isConnected: boolean;
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps & OwnProps;

export interface State { }

class ConnectionIndicator extends React.Component<Props, State> {
  render() {
    const {
      isConnected,
    } = this.props;
    return (
      <View style={styles.container}>
        {React.Children.only(this.props.children)}
        { !isConnected && (
          <View style={styles.redRow}>
            <Text style={styles.centerText}>
              {'Oops... you offline :('}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = (): DispatchProps => ({
});

const mapStateToProps = (state: any): StateProps => ({
  isConnected: state.netInfo.get('isConnected'),
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(ConnectionIndicator);
