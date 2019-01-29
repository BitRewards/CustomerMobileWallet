import * as React from 'react';
import {
  NetInfo,
} from 'react-native';
import { connect, Provider} from 'react-redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import store from './store';
import AppNavigator from './AppNavigator';
import { translationMessages } from './utils/i18n';
import LanguageProvider from './containers/LanguageProvider';
import { NetInfoActions } from './actions/netInfo';
import ConnectionIndicator from './containers/ConnectionIndicator';

export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const ReduxifyNavigatorApp = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = (state: any) => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(ReduxifyNavigatorApp);

export interface Props { }
export interface State { }

class App extends React.Component<Props, State> {

  handleConnectionInfoChange = (isConnected) => {
    store.dispatch(NetInfoActions.connectionInfoChange(isConnected));
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectionInfoChange,
    );
    NetInfo.isConnected.fetch().done(
      (isConnected) => {
        this.handleConnectionInfoChange(isConnected);
      },
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectionInfoChange,
    );
  }

  render() {
    return (
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <ConnectionIndicator>
            <AppWithNavigationState />
          </ConnectionIndicator>
        </LanguageProvider>
      </Provider>
    );
  }
}

export default App;
