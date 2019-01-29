import * as React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AuthLogo from '../../components/AuthLogo';
import PrimaryButton from '../../components/PrimaryButton';
import SocialButton from '../../components/Login/SocialButton';
import AuthInputField from '../../components/Login/AuthInputField';
import * as sessionActions from '../../actions/session';
import * as facebookSdkActions from '../../actions/facebookSdk';
import Touchable from '../../components/Touchable';
import CentredContentWrapper from '../../components/CentredContentWrapper';

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
    marginTop: 24,
    marginBottom: 24,
    flex: 1,
  },
  formWrapper: {
    width: 300,
    height: 87,
    marginBottom: 33,
  },
  buttonWrapper: {
    marginTop: 16,
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
    width: 52,
    height: 52,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrowWrapper: {
    top: 0,
    left: 0,
    width: 42,
    height: 40,
    position: 'absolute',
  },
  backArrowBox: {
    width: 42,
    height: 40,
    padding: 7,
  },
  backArrowImage: {
    width: 20,
    height: 18,
    margin: 4,
  },
  sendCodeAgain: {
    fontSize: 14,
    fontFamily: 'ProximaNova-Regular',
    color: '#ff764a',
    borderBottomWidth: 1,
    borderBottomColor: '#ff764a',
    alignSelf: 'center',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'ProximaNova-Regular',
    color: 'red',
    alignSelf: 'center',
  },
});

export interface LoginProps {
  login: (authToken: string) => void;
  loginViaFacebook: () => void;
  sendEmailCodeReset: () => void;
  sendEmailCode: (email: string) => void;
  isEmailSending: boolean;
  loginFlowStep: 1 | 2;
  checkEmailCode: (email: string, code: string) => void;
  sendEmailError: any;
  sendCodeError: any;
}

export interface LoginState {
  email: string;
  code: string;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      email: '',
      code: '',
    };
  }

  componentDidMount() {
    const { sendEmailCodeReset } = this.props;
    sendEmailCodeReset();
  }

  onSendEmailCode = () => {
    const {
      sendEmailCode,
    } = this.props;
    const {
      email,
    } = this.state;
    sendEmailCode(email);
  }

  onLoginPress = () => {
    const {
      checkEmailCode,
      loginFlowStep,
    } = this.props;
    const {
      email,
      code,
    } = this.state;
    if (loginFlowStep === 1) {
      this.onSendEmailCode();
    }
    if (loginFlowStep === 2) {
      checkEmailCode(email, code);
    }
  }

  onFacebookLoginPress = () => {
    const { loginViaFacebook } = this.props;
    loginViaFacebook();
  }

  onEmailInputChange = (email: string) => {
    this.setState({ email });
  }

  onCodeInputChange = (code: string) => {
    this.setState({ code });
  }

  onSendEmailCodeReset = () => {
    const { sendEmailCodeReset } = this.props;
    sendEmailCodeReset();
  }

  render() {
    const {
      email,
      code,
    } = this.state;
    const {
      isEmailSending,
      loginFlowStep,
      sendEmailError,
      sendCodeError,
    } = this.props;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#ffffff'
        />
        <CentredContentWrapper style={styles.container}>
          { loginFlowStep === 2 && (
            <View style={styles.backArrowWrapper}>
              <Touchable onPress={this.onSendEmailCodeReset}>
                <View style={styles.backArrowBox}>
                  <Image source={require('../../img/back_arrow.png')} style={styles.backArrowImage} />
                </View>
              </Touchable>
            </View>
          )}
          <View style={styles.centerWrapper}>
            <View style={styles.logoWrapper}>
              <AuthLogo />
            </View>
            <View style={styles.formWrapper}>
              <AuthInputField
                placeholder={'Email'}
                icon={require('../../img/ic_login_email.png')}
                editable={!isEmailSending}
                value={email}
                onChangeText={this.onEmailInputChange}
                keyboardType={'email-address'}
                isError={sendEmailError !== null}
              />
              { loginFlowStep === 2 && (
                <View>
                  <AuthInputField
                    placeholder={'6 digit code from email'}
                    icon={require('../../img/ic_login_password.png')}
                    editable={!isEmailSending}
                    value={code}
                    onChangeText={this.onCodeInputChange}
                    keyboardType={'numeric'}
                    maxLength={6}
                    isError={sendCodeError !== null}
                  />
                  <Touchable
                    onPress={this.onSendEmailCode}
                    disabled={isEmailSending}
                  >
                    <Text style={styles.sendCodeAgain}>
                      {'Send code once again'}
                    </Text>
                  </Touchable>
                </View>
              )}
              { sendEmailError !== null && (
                <Text style={styles.errorText}>
                  {'Make sure you enter a correct email address.'}
                </Text>
              )}
              { sendCodeError !== null && (
                <Text style={styles.errorText}>
                  {'The code is invalid. Find the right code in email.'}
                </Text>
              )}
            </View>
            <View style={styles.buttonWrapper}>
              <PrimaryButton
                title={'SIGN IN'}
                onPress={this.onLoginPress}
                disabled={isEmailSending}
              />
            </View>
            <View style={styles.socialWrapper}>
              <Text style={styles.socialLabel}>
                {'or use Facebook to login:'}
              </Text>
              <View style={styles.socialIconsWrapper}>
                <SocialButton
                  onPress={this.onFacebookLoginPress}
                  imageSource={require('../../img/ic-FB.png')}
                />
              </View>
            </View>
          </View>
        </CentredContentWrapper>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (authToken: string) => dispatch(sessionActions.SessionActions.login(authToken)),
  loginViaFacebook: () => dispatch(facebookSdkActions.LoginViaFacebookActions.loginViaFacebook()),
  sendEmailCodeReset: () => dispatch(sessionActions.SessionActions.sendEmailCodeReset()),
  sendEmailCode: (email: string) => dispatch(sessionActions.SessionActions.sendEmailCode(email)),
  checkEmailCode: (email: string, code: string) => dispatch(sessionActions.SessionActions.checkEmailCode(email, code)),
});

const mapStateToProps = (state: any) => ({
  isEmailSending: state.session.get('isEmailSending'),
  loginFlowStep: state.session.get('loginFlowStep'),
  sendEmailError: state.session.get('sendEmailError'),
  sendCodeError: state.session.get('sendCodeError'),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
