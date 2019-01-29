import * as React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Touchable from '../../components/Touchable';
import * as sessionActions from '../../actions/session';
import * as profileActions from '../../actions/profile';

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  profileHeader: {
    backgroundColor: '#ffffff',
  },
  headerCentredText: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    paddingStart: 14,
    paddingEnd: 14,
  },
  profileAvatarWrapper: {
    paddingTop: 8,
  },
  profileAvatar: {
    width: 73,
    height: 73,
    borderRadius: 40,
    alignSelf: 'center',
  },
  userName: {
    fontSize: 30,
    color: '#303645',
    fontFamily: 'ProximaNova-Bold',
  },
  listContainer: {
    paddingTop: 15,
    paddingBottom: 9,
  },
  listHeaderText: {
    fontSize: 15,
    color: '#303645',
    fontFamily: 'ProximaNova-Regular',
    marginStart: 26,
    marginEnd: 26,
    marginBottom: 8,
    textAlign: 'center',
  },
  logoutButtonContainer: {
    top: 0,
    right: 0,
    position: 'absolute',
  },
  logoutButton: {
    padding: 17,
  },
  logoutButtonText: {
    fontSize: 17,
    color: '#ff764a',
    fontFamily: 'ProximaNova-Regular',
  },
});

export interface ProfileProps {
  logout: () => void;
  fetchCurrentUser: (partnerKey: string) => void;
  isFetching: boolean;
  email: string | null;
  name: string | null;
  picture: string | null;
}

export interface State { }

class Profile extends React.Component<ProfileProps, State> {

  componentDidMount() {
    const {
      fetchCurrentUser,
    } = this.props;
    fetchCurrentUser('test-partner-key');
  }

  logoutPress = () => {
    const { logout } = this.props;
    logout();
  }

  renderItem = (listItemInfo: ListRenderItemInfo<any>) => {
    return (
      null
    );
  }

  keyExtractor = (item: any, index: number) => `offer-${index}`;

  render() {
    const {
      email,
      name,
    } = this.props;
    const userName = name ? name : email;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#ffffff'
        />
        <View style={styles.container}>
          <View style={styles.profileHeader}>
            <View style={styles.profileAvatarWrapper}>
              <View style={styles.profileAvatar}>
                <Image source={require('../../img/empty_ava.png')} />
              </View>
            </View>
            <View style={styles.headerCentredText}>
              <Text style={styles.userName}>
                {userName || ' '}
              </Text>
            </View>
            <View style={styles.logoutButtonContainer}>
              <Touchable onPress={this.logoutPress}>
                <View style={styles.logoutButton}>
                  <Text style={styles.logoutButtonText}>
                    {'Log out'}
                  </Text>
                </View>
              </Touchable>
            </View>
          </View>
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={[
            ]}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            ListHeaderComponent={<Text style={styles.listHeaderText}>{'Your loyalty card'}</Text>}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(sessionActions.SessionActions.logout()),
  fetchCurrentUser: (partnerKey: string) => dispatch(profileActions.ProfileActions.fetchCurrentUser(partnerKey)),
});

const mapStateToProps = (state: any) => ({
  isFetching: state.profile.get('isFetching'),
  email: state.profile.get('email'),
  name: state.profile.get('name'),
  picture: state.profile.get('picture'),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
