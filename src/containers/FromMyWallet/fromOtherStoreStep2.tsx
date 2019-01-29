import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Touchable from '../../components/Touchable';
import PrimaryButton from '../../components/PrimaryButton';
import { NavigationActions } from '../../actions/navigation';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  title: {
    color: '#303645',
    fontFamily: 'ProximaNova-Semibold',
    fontSize: 20,
    textAlign: 'left',
    marginTop: 50,
    marginHorizontal: 26,
  },
  cryptAddress: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 18,
    padding: 16,
    borderRadius: 2,
    borderColor: 'rgba(48,54,69, 0.3)',
    borderStyle: 'solid',
    borderWidth: 1,
    marginHorizontal: 26,
    marginTop: 25,
  },
  baseText: {
    color: '#2f404a',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    marginHorizontal: 26,
    marginTop: 22,
  },
  orangeText: {
    color: '#ff764a',
    fontFamily: 'ProximaNova-Semibold',
    fontWeight: '600',
    marginHorizontal: 26,
    marginTop: 10,
  },
  btnContainer: {
    marginHorizontal: 26,
    marginTop: 36,
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  arrowButton: {
    padding: 12,
  },
  closeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  closeButton: {
    padding: 12,
  },
});

export interface FromOtherShopStep2Props {
  navigation: NavigationScreenProp<NavigationState>;
  openDeposit: () => void;
}

export interface State { }

class FromMyWallet extends React.Component<FromOtherShopStep2Props, State> {

  handleBack = () => {
    const {
      navigation,
    } = this.props;
    navigation.goBack();
  }

  getBIT = () => {
    const { openDeposit } = this.props;
    openDeposit();
  }

  render() {
    const { openDeposit } = this.props;
    const cancel = () => openDeposit();
    const getBIT = () => this.getBIT();
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView style={styles.safeContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Fill in this input form with transaction ID from sender</Text>
            <TextInput
              style={styles.cryptAddress}
              placeholder='Put transaction ID here'
            />
            <Text style={styles.baseText}>Transaction ID is necessary for payment's identification. You can get it in the store, from where you've sent BIT to this shop.</Text>
            <Text style={styles.orangeText}>Didn't get the transaction ID?</Text>
            <View style={styles.btnContainer}>
              <PrimaryButton onPress={getBIT} title='Get BIT' />
            </View>
          </View>
          <View style={styles.arrowContainer}>
            <Touchable onPress={this.handleBack}>
              <View style={styles.arrowButton}>
                <Image source={require('../../img/back_arrow.png')} />
              </View>
            </Touchable>
          </View>
          <View style={styles.closeContainer}>
            <Touchable onPress={cancel}>
              <View style={styles.closeButton}>
                <Image source={require('../../img/Close.png')} />
              </View>
            </Touchable>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openDeposit: () => dispatch(NavigationActions.openDeposit()),
});

export default connect(null, mapDispatchToProps)(FromMyWallet);
