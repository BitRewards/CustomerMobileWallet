import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  getBitValueString,
  exchangeBITtoAnotherCurrency,
} from '../../../utils/currency';
import PrimaryButton from '../../../components/PrimaryButton';
import { CurrencyRates } from '../../../services/responseTypes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {
    color: '#303645',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
  },
  balance: {
    color: '#303645',
    fontFamily: 'ProximaNova-Bold',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 5,
  },
  subBalance: {
    fontSize: 15,
    color: '#30364564',
    fontFamily: 'ProximaNova-Semibold',
    textAlign: 'center',
  },
  helpText: {
    color: '#303545',
    fontFamily: 'ProximaNova-Regular',
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 46,
    marginTop: 22,
  },
  cryptAddressInput: {
    padding: 15,
    color: '#2f404a',
    fontSize: 18,
    fontFamily: 'ProximaNova-Regular',
    borderRadius: 2,
    borderColor: 'rgba(48,54,69, 0.3)',
    borderStyle: 'solid',
    borderWidth: 1,
    marginHorizontal: 35,
    marginTop: 20,
  },
  btnContainer: {
    marginHorizontal: 35,
    marginVertical: 20,
    paddingBottom: 16,
  },
});

export interface WithdrawHeaderProps {
  balanceAmount: number;
  currencyRates: CurrencyRates;
  fiatCurrency: string;
  onPress?: () => void;
  onChangeEthAddress: (ethAddress: string) => void;
}

export interface WithdrawHeaderState {
  ethAddress: string;
}

class WithdrawHeader extends React.Component<WithdrawHeaderProps, WithdrawHeaderState> {

  constructor(props: WithdrawHeaderProps) {
    super(props);

    this.state = {
      ethAddress: '',
    };
  }

  onChangeEthAddress = (ethAddress: string): void => {
    const {
      onChangeEthAddress,
    } = this.props;
    onChangeEthAddress(ethAddress);
    this.setState({ ethAddress });
  }

  render() {
    const {
      balanceAmount,
      currencyRates,
      fiatCurrency,
      onPress,
    } = this.props;
    const {
      ethAddress,
    } = this.state;
    const exchangeRate = Object.prototype.hasOwnProperty.call(currencyRates, fiatCurrency)
      // @ts-ignore
      ? currencyRates[fiatCurrency]
      : currencyRates.USD;
    return (
        <View style={styles.container}>
          <ScrollView scrollEnabled={false}>
            <Text style={styles.title}>
              {'Your balance'}
            </Text>
            <Text style={styles.balance}>
              {getBitValueString(balanceAmount)}
            </Text>
            <Text style={styles.subBalance}>
              {`≈${exchangeBITtoAnotherCurrency(balanceAmount, exchangeRate, fiatCurrency)}`}
            </Text>
            <Text style={styles.helpText}>
              {'You may transfer your BIT tokens to your Ethereum wallet'}
            </Text>
            <TextInput
              style={styles.cryptAddressInput}
              selectionColor={'#ff764a'}
              placeholder='Put the ethereum address here'
              onChangeText={this.onChangeEthAddress}
              value={ethAddress}
              maxLength={42}
            />
            <View style={styles.btnContainer}>
              <PrimaryButton
                onPress={onPress}
                title='Set the amount'
              />
            </View>
          </ScrollView>
        </View>
    );
  }
}

export default WithdrawHeader;
