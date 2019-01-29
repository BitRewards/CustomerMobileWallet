import * as React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Touchable from '../../../components/Touchable';
import PrimaryButton from '../../../components/PrimaryButton';
import DottedBorder from '../../../components/DottedBorder';
import { MerchantActions } from '../../../actions/merchant';
import { exchangeBITtoAnotherCurrency } from '../../../utils/currency';
import { CurrencyRates } from '../../../services/responseTypes';

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
    marginHorizontal: 27,
  },
  titleInput: {
    marginHorizontal: 27,
    marginTop: 20,
  },
  amountTextInputContainer: {
    flex: 1,
  },
  amountTextInput: {
    padding: 12,
    borderRadius: 2,
    borderColor: 'rgba(48,54,69, 0.3)',
    borderStyle: 'solid',
    borderWidth: 1,
    marginHorizontal: 26,
    marginTop: 10,
    fontSize: 22,
    fontFamily: 'ProximaNova-Semibold',
    color: '#303645',
  },
  amountTextInputCurrency: {
    position: 'absolute',
    right: 40,
    top: 27,
    fontFamily: 'ProximaNova-Regular',
    color: '#303645',
    opacity: 0.6,
    fontSize: 15,
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
  minAndMaxContainer: {
    height: 70,
    flexDirection: 'row',
    marginHorizontal: 21,
    marginTop: 14,
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(48,54,69, 0.2)',
  },
  minMaxRowContainer: {
    flex: 1,
    height: 50,
    backgroundColor: 'rgba(49,54,72, 0.05)',
    marginHorizontal: 5,
    justifyContent: 'center',
    padding: 12,
  },
  storeTerms: {
    flex: 1,
    height: 50,
    marginHorizontal: 5,
    margin: 12,
    marginTop: 6,
    flexDirection: 'row',
  },
  storeTermsImage: {
    paddingHorizontal: 5,
  },
  minMaxText: {
    fontFamily: 'ProximaNova-Regular',
    fontSize: 14,
    color: '#2e404b',
  },
  minMaxNumber: {
    fontFamily: 'ProximaNova-Semibold',
    fontWeight: '600',
    color: '#2e404b',
  },
  feeContainer: {
    marginHorizontal: 26,
    height: 110,
    justifyContent: 'space-around',
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(48,54,69, 0.2)',
  },
  feeRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  baseText: {
    fontFamily: 'ProximaNova-Regular',
    color: '#303645',
    fontSize: 14,
  },
  currencyText: {
    fontFamily: 'ProximaNova-Regular',
    color: '#303645',
    opacity: 0.6,
    fontSize: 15,
    textAlign: 'right',
  },
  totalContainer: {
    marginHorizontal: 26,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 16,
  },
  btnContainer: {
    marginHorizontal: 26,
    marginTop: 30,
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
  postRewardPayout: (partnerKey: string, tokenAmount: number, withdrawETH: string) => void;
  partnerKey: string;
  currencyRates: CurrencyRates;
  settings: any;
}

export interface State {
  amount: number;
}

class FromMyWallet extends React.Component<FromMyWalletProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      amount: 0,
    };
  }

  handleBack = () => {
    const {
      navigation,
    } = this.props;
    navigation.goBack();
  }

  onChangeAmount = (amountText: string): void => {
    const amount = Number(amountText);
    if (Number.isNaN(amount) || typeof amount !== 'number') {
      return;
    }
    this.setState({ amount });
  }

  setTextButton = (): string => {
    return `Transfer ${this.state.amount || ''} ${this.state.amount ? 'BIT' : ''}`;
  }

  withdrawBIT = (): void => {
    const { postRewardPayout, partnerKey } = this.props;
    const { amount } = this.state;
    const address = this.props.navigation.getParam('address', null);
    postRewardPayout(partnerKey, amount, address);
  }

  feeAmount = (): any => {
    const { settings } = this.props;
    const { amount } = this.state;
    return (amount / 100) * settings.withdrawFeeAmount;
  }

  amountCharged = () => {
    const { amount } = this.state;
    return amount + this.feeAmount();
  }

  render() {
    const { currencyRates, settings } = this.props;
    const { amount } = this.state;
    const onChangeAmount = (text: string) => this.onChangeAmount(text);
    const setTextButton = () => this.setTextButton();
    const withdrawBIT = () => this.withdrawBIT();
    const address = this.props.navigation.getParam('address', null);
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView style={styles.safeContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Fill in the amount input form with the number of BIT you want to get on your Ethereum wallet</Text>
            <Text style={styles.titleInput}>Recipient</Text>
            <View style={styles.cryptAddress}>
              <Text
                numberOfLines={1}
                style={styles.cryptAddressText}
              >
                {address}
              </Text>
            </View>
            <Text style={styles.titleInput}>Amount</Text>
            <View style={styles.amountTextInputContainer}>
              <TextInput
                onChangeText={onChangeAmount}
                value={amount.toString()}
                style={styles.amountTextInput}
                keyboardType='numeric'
              />
              <Text style={styles.amountTextInputCurrency}>{exchangeBITtoAnotherCurrency(amount, currencyRates.USD, 'USD', 0)}</Text>
            </View>
            <View style={styles.minAndMaxContainer}>
              <View style={styles.storeTerms}>
                <Text>Store terms</Text>
                <Image style={styles.storeTermsImage} source={require('../../../img/_.png')} />
              </View>
              <View style={styles.minMaxRowContainer}>
                <Text style={styles.minMaxText}>Minimum</Text>
                <Text style={styles.minMaxNumber}>{settings.minWithdraw}</Text>
              </View>
              <View style={styles.minMaxRowContainer}>
                <Text style={styles.minMaxText}>Maximum</Text>
                <Text style={styles.minMaxNumber}>{settings.maxWithdraw}</Text>
              </View>
            </View>
            <View style={styles.feeContainer}>
              <View style={styles.feeRowContainer}>
                <Text style={styles.baseText}>{settings.withdrawFeeAmount}% shop withdrawal fee</Text>
                <DottedBorder borderWidth={1} />
                <View>
                  <Text>{this.feeAmount()} BIT</Text>
                  <Text style={styles.currencyText}>{exchangeBITtoAnotherCurrency(this.feeAmount(), currencyRates.USD, 'USD', 0)}</Text>
                </View>
              </View>
              <View style={styles.feeRowContainer}>
                <Text style={styles.baseText}>Amount charged</Text>
                <DottedBorder borderWidth={1} />
                <View>
                  <Text>{this.amountCharged()} BIT</Text>
                  <Text style={styles.currencyText}>{exchangeBITtoAnotherCurrency(this.amountCharged(), currencyRates.USD, 'USD', 0)}</Text>
                </View>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.baseText}>Total amount to be credited</Text>
              <View>
                <Text>{amount} BIT</Text>
                <Text style={styles.currencyText}>{exchangeBITtoAnotherCurrency(amount, currencyRates.USD, 'USD', 0)}</Text>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <PrimaryButton onPress={withdrawBIT} title={setTextButton()} />
            </View>
          </View>
          <View style={styles.closeContainer}>
            <Touchable onPress={this.handleBack}>
              <View style={styles.closeButton}>
                <Image source={require('../../../img/Close.png')} />
              </View>
            </Touchable>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  postRewardPayout: (partnerKey: string, tokenAmount: number, withdrawETH: string) =>
    dispatch(MerchantActions.postRewardPayout(partnerKey, tokenAmount, withdrawETH)),
});

const mapSateToProps = (state: any) => ({
  partnerKey: state.merchant.get('partnerKey'),
  currencyRates: state.currency.get('currencyRates'),
  settings: state.merchant.get('settings').toJS(),
});

export default connect(mapSateToProps, mapDispatchToProps)(FromMyWallet);
