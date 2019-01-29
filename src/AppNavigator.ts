import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { createBottomBarOptions } from './components/BottomBar/styles';
import SplashScreen from './containers/SplashScreen';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import RecoverPassword from './containers/RecoverPassword';
import SpecialOffers from './containers/SpecialOffers';
import Wallet from './containers/Wallet';
import WalletMerchant from './containers/WalletMerchant';
import Profile from './containers/Profile';
import Other from './containers/Other';
import History from './containers/History';
import WalletHistory from './containers/WalletHistory';
import Faq from './containers/Faq';
import InviteFriend from './containers/InviteFriend';
import Withdraw from './containers/WalletMerchant/Withdraw';
import WithdrawAmount from './containers/WalletMerchant/Withdraw/amount';
import Deposit from './containers/Deposit';
import DepositEthToBitStep1 from './containers/FromMyWallet/exchangeEthToBitStep1';
import DepositEthToBitStep2 from './containers/FromMyWallet/exchangeEthToBitStep2';
import FromOtherStoreStep1 from './containers/FromMyWallet/fromOtherStoreStep1';
import FromOtherStoreStep2 from './containers/FromMyWallet/fromOtherStoreStep2';
import FromEthereumWalletStep1 from './containers/FromMyWallet/fromMyEthereumWalletStep1';
import FromEthereumWalletStep2 from './containers/FromMyWallet/fromMyEthereumWalletStep2';

const Main = createBottomTabNavigator({
  SpecialOffers: {
    screen: SpecialOffers,
    navigationOptions: createBottomBarOptions('app.navigation.bottomLabel.SpecialOffers', require('./img/ic_special_offers.png')),
  },
  Wallet: {
    screen: Wallet,
    navigationOptions: createBottomBarOptions('app.navigation.bottomLabel.Wallet', require('./img/ic_wallets.png')),
  },
  Profile: {
    screen: Profile,
    navigationOptions: createBottomBarOptions('app.navigation.bottomLabel.Profile', require('./img/ic_profile.png')),
  },
  Other: {
    screen: Other,
    navigationOptions: createBottomBarOptions('app.navigation.bottomLabel.Other', require('./img/ic_others.png')),
  },
});

const AppNavigator = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: { header: null },
  },
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: { header: null },
  },
  Login: {
    screen: Login,
    navigationOptions: { header: null },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: { header: null },
  },
  RecoverPassword: {
    screen: RecoverPassword,
    navigationOptions: { header: null },
  },
  WalletMerchant: {
    screen: WalletMerchant,
    navigationOptions: { header: null },
  },
  Withdraw: {
    screen: Withdraw,
    navigationOptions: { header: null },
  },
  Deposit: {
    screen: Deposit,
    navigationOptions: { header: null },
  },
  DepositEthToBitStep1: {
    screen: DepositEthToBitStep1,
    navigationOptions: { header: null },
  },
  DepositEthToBitStep2: {
    screen: DepositEthToBitStep2,
    navigationOptions: { header: null },
  },
  FromOtherStoreStep1: {
    screen: FromOtherStoreStep1,
    navigationOptions: { header: null },
  },
  FromOtherStoreStep2: {
    screen: FromOtherStoreStep2,
    navigationOptions: { header: null },
  },
  FromEthereumWalletStep1: {
    screen: FromEthereumWalletStep1,
    navigationOptions: { header: null },
  },
  FromEthereumWalletStep2: {
    screen: FromEthereumWalletStep2,
    navigationOptions: { header: null },
  },
  WithdrawAmount: {
    screen: WithdrawAmount,
    navigationOptions: { header: null },
  },
  History: {
    screen: History,
  },
  WalletHistory: {
    screen: WalletHistory,
  },
  Faq: {
    screen: Faq,
  },
  InviteFriend: {
    screen: InviteFriend,
    navigationOptions: { header: null },
  },
});

export default AppNavigator;
