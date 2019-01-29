import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import {
  NavigationInjectedProps,
  SafeAreaView,
} from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Touchable from '../../components/Touchable';
import PrimaryButton from '../../components/PrimaryButton';
import TextInputWithCopyIcon from '../../components/TextInputWithCopyIcon';
import { NavigationActions } from '../../actions/navigation';
import {createStructuredSelector, Selector} from 'reselect';
import {makeSelectMerchantEthAddress} from '../../selectors/merchant';

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
  titleInput: {
    marginHorizontal: 27,
    marginTop: 20,
  },
  cryptAddress: {
    padding: 16,
    borderRadius: 2,
    borderColor: 'rgba(48,54,69, 0.3)',
    backgroundColor: 'rgba(48,54,69, 0.1)',
    borderStyle: 'solid',
    borderWidth: 1,
    marginHorizontal: 26,
    marginTop: 10,
  },
  cryptAddressText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 18,
    color: 'rgba(47,64,74, 0.6)',
  },
  toAddressContainer: {
    borderColor: 'rgba(48, 54, 69, 0.3)',
    borderWidth: 1,
    borderRadius: 2,
    marginHorizontal: 26,
    marginTop: 10,
  },
  copyTextInput: {
    padding: 16,
    paddingRight: 40,
    color: '#2f404a',
    fontSize: 18,
    fontFamily: 'ProximaNova-Regular',
  },
  copyIconContainer: {
    position: 'absolute',
    top: 16,
    right: 10,
  },
  copyIcon: {
    width: 21,
    height: 23,
  },
  attentionContainer: {
    backgroundColor: 'rgba(255,198,74, 0.2)',
    marginTop: 17,
    marginHorizontal: 14,
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 20,
    paddingTop: 20,
    marginBottom: 25,
  },
  attentionTitle: {
    color: '#2e404b',
    fontFamily: 'ProximaNova-Semibold',
    fontSize: 16,
    marginBottom: 5,
  },
  baseText: {
    color: '#2f404a',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
  },
  boldText: {
    fontFamily: 'ProximaNova-Semibold',
  },
  orangeText: {
    color: '#ff764a',
    fontFamily: 'ProximaNova-Semibold',
    fontWeight: '600',
  },
  btnContainer: {
    marginHorizontal: 26,
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

export interface OwnProps {
}

interface StateProps {
  ethAddress: string;
}

interface DispatchProps {
  openDeposit: (partnerKey: string) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

export interface FromMyWalletState {
  fromEthereumAddress: string | null;
}

class FromMyWallet extends React.Component<Props & NavigationInjectedProps, FromMyWalletState> {
  partnerKey: string | null = null;
  ethereumAddress: string | null = null;

  constructor(props: Props & NavigationInjectedProps) {
    super(props);

    this.state = {
      fromEthereumAddress: props.navigation.getParam('ethereumAddress', null),
    };
  }

  componentDidMount() {
    this.partnerKey = this.props.navigation.getParam('partnerKey', null);
    this.ethereumAddress = this.props.navigation.getParam('ethereumAddress', null);
  }

  handleBack = () => {
    const {
      navigation,
    } = this.props;
    navigation.goBack();
  }

  sent = () => {
    const { openDeposit } = this.props;
    if (typeof this.partnerKey === 'string' && this.partnerKey.length > 0) {
      const partnerKey = this.partnerKey;
      openDeposit(partnerKey);
    }
  }

  render() {
    const {
      fromEthereumAddress,
    } = this.state;
    const {
      openDeposit,
      ethAddress,
    } = this.props;
    const cancel = () => openDeposit(this.partnerKey || '');
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView style={styles.safeContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Send BIT with your Ethereum wallet</Text>
            <Text style={styles.titleInput}>From</Text>
            <View style={styles.cryptAddress}>
              <Text
                numberOfLines={1}
                style={styles.cryptAddressText}
              >
                {fromEthereumAddress}
              </Text>
            </View>
            <Text style={styles.titleInput}>To</Text>
            <TextInputWithCopyIcon
              text={ethAddress}
              textIsCopiedMessage={'Address is copied to clipboard'}
            />
            <View style={styles.attentionContainer}>
              <Text style={styles.attentionTitle}>Attention</Text>
              <Text style={styles.baseText}>1. <Text style={styles.boldText}>Send only BIT</Text>. Don't send ETH or other tokens.</Text>
              <Text style={styles.baseText}>2. Send BIT only from <Text style={styles.boldText}>0x59e382bab5bb642b659613f5aa6f0d011cb8a9tec</Text>.</Text>
              <Text style={styles.baseText}>3. Check the <Text style={styles.orangeText}>instructions</Text> for your wallet.</Text>
            </View>
            <View style={styles.btnContainer}>
              <PrimaryButton onPress={this.sent} title='Done' />
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
  openDeposit: (partnerKey: string) => dispatch(NavigationActions.openDeposit(partnerKey)),
});

const mapStateToProps = (): Selector<any, StateProps> => createStructuredSelector({
  ethAddress: makeSelectMerchantEthAddress,
});

export default connect(mapStateToProps, mapDispatchToProps)(FromMyWallet);
