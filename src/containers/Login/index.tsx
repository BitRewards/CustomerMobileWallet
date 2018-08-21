import * as React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AuthLogo from '../../components/AuthLogo';
import PrimaryButton from '../../components/PrimaryButton';
import SocialButton from '../../components/Login/SocialButton';
import AuthInputField from '../../components/Login/AuthInputField';
import * as sessionActions from '../../actions/session';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  centerWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  logoWrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  formWrapper: {
    width: 300,
    height: 87,
    marginBottom: 33,
  },
  buttonWrapper: {
    marginTop: 10,
    marginBottom: 10,
    width: 212,
    height: 48,
  },
  socialWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLabel: {
    fontSize: 12,
    fontFamily: 'ProximaNova-Regular',
    color: '#2e404b',
  },
  socialIconsWrapper: {
    flexDirection: 'row',
    width: 272,
    height: 52,
    marginTop: 15,
  },
});

export interface LoginProps {
  login: () => any;
}

export interface State { }

class Login extends React.Component<LoginProps, State> {
  onLoginPress = () => {
    const { login } = this.props;
    login();
  }

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#ffffff'
        />
        <View style={styles.container}>
          <View style={styles.centerWrapper}>
            <View style={styles.logoWrapper}>
              <AuthLogo />
            </View>
            <View style={styles.formWrapper}>
              <AuthInputField
                placeholder={'Email'}
                icon={require('../../img/ic_login_email.png')}
              />
              <AuthInputField
                placeholder={'Password'}
                icon={require('../../img/ic_login_password.png')}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <PrimaryButton
                title={'Log in'}
                onPress={this.onLoginPress}
              />
            </View>
            <View style={styles.socialWrapper}>
              <Text style={styles.socialLabel}>
                {'or use one of the social networks to login:'}
              </Text>
              <View style={styles.socialIconsWrapper}>
                <SocialButton />
                <SocialButton />
                <SocialButton />
                <SocialButton />
                <SocialButton />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: () => dispatch(sessionActions.SessionActions.login()),
});

const mapStateToProps = (state: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
