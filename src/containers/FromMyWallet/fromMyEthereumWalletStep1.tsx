import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import {
  NavigationInjectedProps,
  SafeAreaView,
} from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Touchable from '../../components/Touchable';
import PrimaryButton from '../../components/PrimaryButton';
import { NavigationActions } from '../../actions/navigation';
import { isValidEthereumAddress } from '../../utils/validate';
import Toast from 'react-native-simple-toast';
import Api from '../../services/Api';

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
    fontSize: 18,
    textAlign: 'center',
    marginTop: 70,
  },
  cryptAddress: {
    padding: 15,
    color: '#2f404a',
    fontSize: 18,
    fontFamily: 'ProximaNova-Regular',
    borderRadius: 2,
    borderColor: 'rgba(48,54,69, 0.3)',
    borderStyle: 'solid',
    borderWidth: 1,
    marginHorizontal: 26,
    marginTop: 25,
  },
  instructionsContainer: {
    backgroundColor: 'rgba(255,198,74, 0.3)',
    marginTop: 17,
    marginHorizontal: 14,
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 20,
    paddingTop: 20,
    marginBottom: 30,
  },
  do: {
    color: '#2e404b',
    fontFamily: 'ProximaNova-Semibold',
    fontSize: 16,
    marginBottom: 5,
  },
  doText: {
    color: '#2e404b',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
  },
  doNot: {
    color: '#ce4242',
    fontFamily: 'ProximaNova-Semibold',
    fontSize: 16,
    marginTop: 17,
    marginBottom: 5,
  },
  doNotText: {
    color: '#ce4242',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
  },
  btnContainer: {
    marginHorizontal: 26,
  },
  closeContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
  closeButton: {
    padding: 12,
  },
});

export interface FromMyWalletProps {
  openDepositFromMyEthereumWalletStep2: (partnerKey: string, ethereumAddress: string) => void;
}

export interface OwnProps {
}

interface StateProps {
}

interface DispatchProps {
  openDepositFromMyEthereumWalletStep2: (partnerKey: string, ethereumAddress: string) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

export interface State {
  ethereumAddress: string;
}

class FromMyWallet extends React.Component<Props & NavigationInjectedProps, State> {
  partnerKey: string | null = null;

  constructor(props: Props & NavigationInjectedProps) {
    super(props);
    this.state = {
      ethereumAddress: '',
    };
  }

  componentDidMount() {
    this.partnerKey = this.props.navigation.getParam('partnerKey', null);
  }

  handleBack = () => {
    const {
      navigation,
    } = this.props;
    navigation.goBack();
  }

  openDepositFromMyEthereumWalletStep2 = () => {
    const {
      openDepositFromMyEthereumWalletStep2,
    } = this.props;
    const {
      ethereumAddress,
    } = this.state;
    if (isValidEthereumAddress(ethereumAddress)) {
      if (typeof this.partnerKey === 'string' && this.partnerKey.length > 0) {
        const partnerKey = this.partnerKey;
        Api.postUpdateBitTokenAddress(ethereumAddress || '').then(() => {
          openDepositFromMyEthereumWalletStep2(partnerKey, ethereumAddress);
        }).catch((error) => {
          Toast.show(Api.getErrorMessage(error, 'ethereum_wallet'), Toast.LONG);
        });
      }
    } else {
      Toast.show('Wrong ethereum address', Toast.LONG);
    }
  }

  onChangeEthAddress = (ethAddress: string) => {
    this.setState({ ethereumAddress: ethAddress });
  }

  render() {
    const {
      ethereumAddress,
    } = this.state;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView style={styles.safeContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Enter your Ethereum wallet address</Text>
            <TextInput
              style={styles.cryptAddress}
              placeholder='Put ethereum address here'
              value={ethereumAddress}
              onChangeText={this.onChangeEthAddress}
            />
            <View style={styles.instructionsContainer}>
              <Text style={styles.do}>DO:</Text>
              <Text style={styles.doText}>Your personal Ethereum wallet address: MetaMask, Mist, MyEtherWallet, Parity, Trust, imToken etc</Text>
              <Text style={styles.doNot}>DO NOT:</Text>
              <Text style={styles.doNotText}>Exchange addresses, other service's addresses, other user's addresses.</Text>
            </View>
            <View style={styles.btnContainer}>
              <PrimaryButton onPress={this.openDepositFromMyEthereumWalletStep2} title='Get the deposit address' />
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
  openDepositFromMyEthereumWalletStep2: (partnerKey: string, ethereumAddress: string) =>
    dispatch(NavigationActions.openDepositFromMyEthereumWalletStep2(partnerKey, ethereumAddress)),
});

export default connect(null, mapDispatchToProps)(FromMyWallet);
