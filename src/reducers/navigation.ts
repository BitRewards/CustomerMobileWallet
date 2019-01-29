import { StackActions, NavigationActions } from 'react-navigation';
import AppNavigator from '../AppNavigator';

import * as navigationActions from '../actions/navigation';
import * as sessionActions from '../actions/session';
import {
  OfferActionItem,
  OfferRewardItem,
} from '../services/responseTypes';

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
    case navigationActions.OPEN_SPECIAL_ACTION_IN_WALLET_MERCHANT: {
      const actionItem: OfferActionItem = action.payload.actionItem;
      const navigateWalletMerchantAction = NavigationActions.navigate({
        routeName: 'WalletMerchant',
        params: {
          partnerKey: actionItem.action.partner.key,
          specialOfferActionToDisplay: actionItem,
        },
      });
      nextState = getStateForAction(navigateWalletMerchantAction, state);
      break;
    }
    case navigationActions.OPEN_SPECIAL_REWARD_IN_WALLET_MERCHANT: {
      const rewardItem: OfferRewardItem = action.payload.rewardItem;
      const navigateWalletMerchantAction = NavigationActions.navigate({
        routeName: 'WalletMerchant',
        params: {
          partnerKey: rewardItem.reward.partner.key,
          specialOfferRewardToDisplay: rewardItem,
        },
      });
      nextState = getStateForAction(navigateWalletMerchantAction, state);
      break;
    }
    case navigationActions.OPEN_HISTORY: {
      const navigateWalletHistoryAction = NavigationActions.navigate({ routeName: 'History' });
      nextState = getStateForAction(navigateWalletHistoryAction, state);
      break;
    }
    case navigationActions.OPEN_WALLET_HISTORY: {
      const navigateWalletHistoryAction = NavigationActions.navigate({ routeName: 'WalletHistory' });
      nextState = getStateForAction(navigateWalletHistoryAction, state);
      break;
    }
    case navigationActions.OPEN_FAQ: {
      const navigateFaqAction = NavigationActions.navigate({ routeName: 'Faq' });
      nextState = getStateForAction(navigateFaqAction, state);
      break;
    }
    case navigationActions.OPEN_INVITE_FRIEND: {
      const navigateFaqAction = NavigationActions.navigate({ routeName: 'InviteFriend' });
      nextState = getStateForAction(navigateFaqAction, state);
      break;
    }
    case navigationActions.OPEN_WITHDRAW: {
      const navigateWithdrawAction = NavigationActions.navigate({
        routeName: 'Withdraw',
        params: {
          partnerKey: action.payload.partnerKey,
        },
      });
      nextState = getStateForAction(navigateWithdrawAction, state);
      break;
    }
    case navigationActions.OPEN_WITHDRAW_WITH_NOTIFICATION: {
      const navigateWithdrawAction = NavigationActions.navigate({
        routeName: 'Withdraw',
        params: {
          partnerKey: action.payload.partnerKey,
          amount: action.payload.amount,
          address: action.payload.address,
        },
      });
      nextState = getStateForAction(navigateWithdrawAction, state);
      break;
    }
    case navigationActions.OPEN_DEPOSIT: {
      const navigateFaqAction = NavigationActions.navigate({
        routeName: 'Deposit',
        params: {
          partnerKey: action.payload.partnerKey,
        },
      });
      nextState = getStateForAction(navigateFaqAction, state);
      break;
    }
    case navigationActions.OPEN_DEPOSIT_ETH_TO_BIT_STEP1: {
      const navigateFaqAction = NavigationActions.navigate({
        routeName: 'DepositEthToBitStep1',
        params: {
          partnerKey: action.payload.partnerKey,
        },
      });
      nextState = getStateForAction(navigateFaqAction, state);
      break;
    }
    case navigationActions.OPEN_DEPOSIT_ETH_TO_BIT_STEP2: {
      const navigateFaqAction = NavigationActions.navigate({
        routeName: 'DepositEthToBitStep2',
        params: {
          partnerKey: action.payload.partnerKey,
          ethereumAddress: action.payload.ethereumAddress,
        },
      });
      nextState = getStateForAction(navigateFaqAction, state);
      break;
    }
    case navigationActions.OPEN_FROM_ETHEREUM_WALLET_STEP1: {
      const navigateFaqAction = NavigationActions.navigate({
        routeName: 'FromEthereumWalletStep1',
        params: {
          partnerKey: action.payload.partnerKey,
        },
      });
      nextState = getStateForAction(navigateFaqAction, state);
      break;
    }
    case navigationActions.OPEN_FROM_ETHEREUM_WALLET_STEP2: {
      const navigateFaqAction = NavigationActions.navigate({
        routeName: 'FromEthereumWalletStep2',
        params: {
          partnerKey: action.payload.partnerKey,
          ethereumAddress: action.payload.ethereumAddress,
        },
      });
      nextState = getStateForAction(navigateFaqAction, state);
      break;
    }
    case navigationActions.OPEN_FROM_OTHER_STORE_STEP1: {
      const navigateFaqAction = NavigationActions.navigate({ routeName: 'FromOtherStoreStep1' });
      nextState = getStateForAction(navigateFaqAction, state);
      break;
    }
    case navigationActions.OPEN_FROM_OTHER_STORE_STEP2: {
      const navigateFaqAction = NavigationActions.navigate({ routeName: 'FromOtherStoreStep2' });
      nextState = getStateForAction(navigateFaqAction, state);
      break;
    }
    case navigationActions.OPEN_WITHDRAW_AMOUNT: {
      const navigateFaqAction = NavigationActions.navigate({
        routeName: 'WithdrawAmount',
        params: {
          address: action.payload.address,
        },
      });
      nextState = getStateForAction(navigateFaqAction, state);
      break;
    }
    default:
      nextState = getStateForAction(action, state);
      break;
  }
  return nextState || state;
};

export default navigationReducer;
