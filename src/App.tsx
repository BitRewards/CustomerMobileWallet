import * as React from 'react';
import { connect, Provider} from 'react-redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import store from './store';
import AppNavigator from './AppNavigator';
import { translationMessages } from './utils/i18n';
import LanguageProvider from './containers/LanguageProvider';

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
  render() {
    return (
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <AppWithNavigationState />
        </LanguageProvider>
      </Provider>
    );
  }
}

export default App;
