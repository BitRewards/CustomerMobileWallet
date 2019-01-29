import { createAction } from './helpers';
import { ActionsUnion } from './types';
import {
  MerchantInfo,
  OfferActionItem,
  OfferRewardItem,
} from '../services/responseTypes';

export const OPEN_WALLET_MERCHANT = 'OPEN_WALLET_MERCHANT';
export const OPEN_SPECIAL_ACTION_IN_WALLET_MERCHANT = 'OPEN_SPECIAL_ACTION_IN_WALLET_MERCHANT';
export const OPEN_SPECIAL_REWARD_IN_WALLET_MERCHANT = 'OPEN_SPECIAL_REWARD_IN_WALLET_MERCHANT';
export const OPEN_HISTORY = 'OPEN_HISTORY';
export const OPEN_WALLET_HISTORY = 'OPEN_WALLET_HISTORY';
export const OPEN_FAQ = 'OPEN_FAQ';
export const OPEN_INVITE_FRIEND = 'OPEN INVITE FRIEND';
export const OPEN_WITHDRAW = 'OPEN_WITHDRAW';
export const OPEN_WITHDRAW_WITH_NOTIFICATION = 'OPEN_WITHDRAW_WITH_NOTIFICATION';
export const OPEN_WITHDRAW_AMOUNT = 'OPEN_WITHDRAW_AMOUNT';
export const OPEN_DEPOSIT = 'OPEN_DEPOSIT';
export const OPEN_DEPOSIT_ETH_TO_BIT_STEP1 = 'OPEN_DEPOSIT_ETH_TO_BIT_STEP1';
export const OPEN_DEPOSIT_ETH_TO_BIT_STEP2 = 'OPEN_DEPOSIT_ETH_TO_BIT_STEP2';
export const OPEN_FROM_ETHEREUM_WALLET_STEP1 = 'OPEN_FROM_ETHEREUM_WALLET_STEP1';
export const OPEN_FROM_ETHEREUM_WALLET_STEP2 = 'OPEN_FROM_ETHEREUM_WALLET_STEP2';
export const OPEN_FROM_OTHER_STORE_STEP1 = 'OPEN_FROM_OTHER_STORE_STEP1';
export const OPEN_FROM_OTHER_STORE_STEP2 = 'OPEN_FROM_OTHER_STORE_STEP2';

export const NavigationActions = {
  openWalletMerchant: (merchant: MerchantInfo) => createAction(
    OPEN_WALLET_MERCHANT,
    { merchant },
  ),
  openSpecialActionInWalletMerchant: (actionItem: OfferActionItem) => createAction(
    OPEN_SPECIAL_ACTION_IN_WALLET_MERCHANT,
    { actionItem },
  ),
  openSpecialRewardInWalletMerchant: (rewardItem: OfferRewardItem) => createAction(
    OPEN_SPECIAL_REWARD_IN_WALLET_MERCHANT,
    { rewardItem },
  ),
  openHistory: () => createAction(OPEN_HISTORY),
  openWalletHistory: () => createAction(OPEN_WALLET_HISTORY),
  openFaq: () => createAction(OPEN_FAQ),
  openInviteFriend: () => createAction(OPEN_INVITE_FRIEND),
  openWithdraw: (partnerKey: string) => createAction(
    OPEN_WITHDRAW,
    { partnerKey },
  ),
  openWithdrawWithNotification: (partnerKey: string, amount: number, address: string) => createAction(
    OPEN_WITHDRAW_WITH_NOTIFICATION,
    { partnerKey, amount, address },
  ),
  openWithdrawAmount: (address: string) => createAction(OPEN_WITHDRAW_AMOUNT, { address }),
  openDeposit: (partnerKey: string) => createAction(
    OPEN_DEPOSIT,
    { partnerKey },
  ),
  openDepositEthToBitStep1: (partnerKey: string) => createAction(
    OPEN_DEPOSIT_ETH_TO_BIT_STEP1,
    { partnerKey },
  ),
  openDepositEthToBitStep2: (partnerKey: string, ethereumAddress: string) => createAction(
    OPEN_DEPOSIT_ETH_TO_BIT_STEP2,
    {
      partnerKey,
      ethereumAddress,
    },
  ),
  openDepositFromMyEthereumWalletStep1: (partnerKey: string) => createAction(
    OPEN_FROM_ETHEREUM_WALLET_STEP1,
    { partnerKey },
  ),
  openDepositFromMyEthereumWalletStep2: (partnerKey: string, ethereumAddress: string) => createAction(
    OPEN_FROM_ETHEREUM_WALLET_STEP2,
    {
      partnerKey,
      ethereumAddress,
    },
  ),
  openDepositFromOtherStoreStep1: () => createAction(OPEN_FROM_OTHER_STORE_STEP1),
  openDepositFromOtherStoreStep2: () => createAction(OPEN_FROM_OTHER_STORE_STEP2),

};

export type NavigationActions = ActionsUnion<typeof NavigationActions>;
