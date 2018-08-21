import { createAction } from './helpers';
import { ActionsUnion } from './types';
import { MerchantInfo } from '../services/responseTypes';

export const OPEN_WALLET_MERCHANT = 'OPEN_WALLET_MERCHANT';
export const OPEN_WALLET_HISTORY = 'OPEN_WALLET_HISTORY';

export const NavigationActions = {
  openWalletMerchant: (merchant: MerchantInfo) => createAction(
    OPEN_WALLET_MERCHANT,
    { merchant },
  ),
  openWalletHistory: () => createAction(OPEN_WALLET_HISTORY),
};

export type NavigationActions = ActionsUnion<typeof NavigationActions>;
