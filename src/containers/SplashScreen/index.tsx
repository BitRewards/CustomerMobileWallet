import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StyleSheet, Text, View } from 'react-native';
import { AppActions } from '../../actions/app';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  centerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export interface SplashScreenProps {
  dynamicInitialRoute: () => void;
}

export interface State { }

class SplashScreen extends React.Component<SplashScreenProps, State> {
  componentDidMount() {
    const {
      dynamicInitialRoute,
    } = this.props;
    dynamicInitialRoute();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.centerText}>
          Empty SplashScreen
        </Text>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dynamicInitialRoute: () => dispatch(AppActions.dynamicInitialRoute()),
});

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
