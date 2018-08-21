import { StackActions, NavigationActions } from 'react-navigation';
import AppNavigator from '../AppNavigator';

import * as navigationActions from '../actions/navigation';
import * as sessionActions from '../actions/session';

const getStateForAction = (action: any, state?: any) => {
  return AppNavigator.router.getStateForAction(action, state);
};

const firstAction = AppNavigator.router.getActionForPathAndParams('SplashScreen');
const initialState = getStateForAction(firstAction);

export const navigationReducer = (state = initialState, action: any) => {
  let nextState;
  switch (action.type) {
    case sessionActions.LOGOUT: {
      const resetToLoginAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login' }),
        ],
      });
      nextState = getStateForAction(resetToLoginAction, state);
      break;
    }
    case sessionActions.LOGIN_REQUEST: {
      const resetToLoginAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login' }),
        ],
      });
      nextState = getStateForAction(resetToLoginAction, state);
      break;
    }
    case sessionActions.LOGIN_SUCCESS: {
      const resetToMainAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Main' }),
        ],
      });
      nextState = getStateForAction(resetToMainAction, state);
      break;
    }
    case navigationActions.OPEN_WALLET_MERCHANT: {
      const navigateWalletMerchantAction = NavigationActions.navigate({
        routeName: 'WalletMerchant',
        params: {
          partnerKey: action.payload.merchant.partner.key,
        },
      });
      nextState = getStateForAction(navigateWalletMerchantAction, state);
      break;
    }
    case navigationActions.OPEN_WALLET_HISTORY: {
      const navigateWalletHistoryAction = NavigationActions.navigate({ routeName: 'History' });
      nextState = getStateForAction(navigateWalletHistoryAction, state);
      break;
    }
    default:
      nextState = getStateForAction(action, state);
      break;
  }
  return nextState || state;
};

export default navigationReducer;
