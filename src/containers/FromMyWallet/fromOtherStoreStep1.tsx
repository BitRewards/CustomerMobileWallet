import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Touchable from '../../components/Touchable';
import PrimaryButton from '../../components/PrimaryButton';
import TextInputWithCopyIcon from '../../components/TextInputWithCopyIcon';
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
    textAlign: 'center',
    marginTop: 50,
    marginHorizontal: 27,
  },
  instructionsContainer: {
    marginTop: 17,
    marginHorizontal: 14,
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 20,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  numContainer: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    backgroundColor: 'rgba(48,53,70, 0.06)',
  },
  attentionTitle: {
    color: '#2e404b',
    fontFamily: 'ProximaNova-Semibold',
    fontSize: 16,
    marginBottom: 5,
  },
  baseText: {
    color: '#2e404b',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    marginLeft: 13,
  },
  num: {
    fontSize: 15,
    fontFamily: 'ProximaNova-Semibold',
    color: '#303545',
  },
  boldText: {
    fontFamily: 'ProximaNova-Semibold',
  },
  btnContainer: {
    marginHorizontal: 26,
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

export interface FromMyWalletProps {
  navigation: NavigationScreenProp<NavigationState>;
  openDepositFromOtherStoreStep2: () => void;
}

export interface State { }

class FromMyWallet extends React.Component<FromMyWalletProps, State> {

  handleBack = () => {
    const {
      navigation,
    } = this.props;
    navigation.goBack();
  }

  render() {
    const { openDepositFromOtherStoreStep2 } = this.props;
    const goNext = () => openDepositFromOtherStoreStep2();
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView style={styles.safeContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Fill in the address'es input sender's form with this Ethereum address</Text>
            <TextInputWithCopyIcon text='0x59e382bab5bb642b659613f5aa6f0d011cb8a95c' />
            <View style={styles.instructionsContainer}>
              <View style={styles.row}>
                <View style={styles.numContainer}>
                  <Text style={styles.num}>1</Text>
                </View>
                <Text style={styles.baseText}>Перейдите в программу лояльности магазина, откуда хотите перенести свои BIT;</Text>
              </View>
              <View style={styles.row}>
                <View style={styles.numContainer}>
                  <Text style={styles.num}>2</Text>
                </View>
                <Text style={styles.baseText}>
                  Перейдите в раздел <Text style={styles.boldText}>Withdraw BIT</Text> и нажмите на кнопку
                  <Text style={styles.boldText}>Withdraw BIT</Text>;
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.numContainer}>
                  <Text style={styles.num}>3</Text>
                </View>
                <Text style={styles.baseText}>Вставьте скопированный ethereum адрес в соответствующее поле.</Text>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <PrimaryButton onPress={goNext} title='Fill in the magic number' />
            </View>
          </View>
          <View style={styles.closeContainer}>
            <Touchable onPress={this.handleBack}>
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
  openDepositFromOtherStoreStep2: () => dispatch(NavigationActions.openDepositFromOtherStoreStep2()),
});

export default connect(null, mapDispatchToProps)(FromMyWallet);
