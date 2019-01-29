import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Touchable from '../../components/Touchable';
import SocialButton from './SocialButton';
import InviteFriendDialog from '../../components/Dialogs/InviteFriendDialog';
import {
  ShareDialog,
  ShareLinkContent,
} from 'react-native-fbsdk';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  icon: {
    width: 100,
    height: 100,
  },
  inviteFriendText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#303645',
    fontSize: 28,
    fontFamily: 'ProximaNova-Bold',
  },
  mainTextContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  baseText: {
    textAlign: 'center',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 16,
  },
  accentText: {
    fontFamily: 'ProximaNova-Semibold',
  },
  socialButtonsContainer: {
    alignItems: 'center',
  },
  link: {
    color: '#2e404b',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  textInputContainer: {
    alignItems: 'center',
    borderColor: 'rgba(48, 54, 69, 0.3)',
    borderWidth: 1,
    borderRadius: 2,
    marginLeft: 36,
    marginRight: 36,
  },
  copyLinkTextInput: {
    padding: 15,
    paddingRight: 40,
    color: '#2f404a',
    fontSize: 18,
    fontFamily: 'ProximaNova-Semibold',
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
  closeContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
  closeButton: {
    padding: 12,
  },
});

export interface InviteFriendProps {
  navigation: NavigationScreenProp<NavigationState>;
}

export interface InviteFriendState {
  isModalVisible: boolean;
  modalButtonOnPress: () => void;
}

class InviteFriend extends React.Component<InviteFriendProps, InviteFriendState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isModalVisible: false,
      modalButtonOnPress: () => { },
    };
  }

  modalVisible = (value: boolean) => {
    this.setState({ isModalVisible: value });
  }

  handleBack = () => {
    const {
      navigation,
    } = this.props;
    navigation.goBack();
  }

  handleFacebookShare = (shareLink: string): void => {
    const shareLinkContent: ShareLinkContent = {
      contentType: 'link',
      contentUrl: shareLink || '',
    };
    ShareDialog.canShow(shareLinkContent)
      .then((canShow: boolean) => {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      }).then(
      (result: any) => {
        console.warn(JSON.stringify(result, null, 2));
      },
      (error: any) => {
        console.warn('Share fail with error: ' + error);
      },
    );
  }

  render() {
    const { isModalVisible, modalButtonOnPress } = this.state;
    const onRequestClose = () => this.modalVisible(false);
    const emptyFunc = () => null;
    const shareLink = 'https://inprg.com/r/L-ual9D6Co7t';
    const handleFacebookShare = () => this.handleFacebookShare(shareLink);
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView style={styles.safeContainer}>
          <View style={styles.closeContainer}>
            <Touchable onPress={this.handleBack}>
              <View style={styles.closeButton}>
                <Image source={require('../../img/Close.png')} />
              </View>
            </Touchable>
          </View>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={require('../../img/Invite.png')} />
          </View>
          <Text style={styles.inviteFriendText}>Invite a friend!</Text>
          <View style={styles.mainTextContainer}>
            <Text style={styles.baseText}>Your friends will receive a <Text style={styles.accentText}>5% discount</Text></Text>
            <Text style={styles.baseText}>You will receive <Text style={styles.accentText}>5 BIT</Text> for every $1</Text>
            <Text style={styles.baseText}>purchases of friends.</Text>
          </View>
          <View style={styles.socialButtonsContainer}>
            <SocialButton
              icon={require('../../img/fb.png')}
              title='Share'
              backgroundColor='#39579a'
              onPress={emptyFunc}
            />
            <SocialButton
              icon={require('../../img/Tw.png')}
              title='Tweet'
              backgroundColor='#1c95e0'
              onPress={handleFacebookShare}
            />
          </View>
          <Text style={styles.link}>or copy and send the link:</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.copyLinkTextInput}
              value={shareLink}
              onChangeText={emptyFunc}
            />
            <View style={styles.copyIconContainer}>
              <Touchable>
                <Image style={styles.copyIcon} source={require('../../img/copy.png')} />
              </Touchable>
            </View>
          </View>
          <InviteFriendDialog
            onRequestClose={onRequestClose}
            visible={isModalVisible}
            title='Send by email'
            buttonLabel='Send'
            onPress={modalButtonOnPress}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

const mapStateToProps = (state: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriend);
