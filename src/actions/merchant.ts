/**
 * Кошелек мерчанта.
 */

import { createAction } from './helpers';
import { ActionsUnion } from './types';
import {
  MerchantActionItem,
  MerchantRewardItem,
  MerchantCouponItem, PartnerInfoResponse,
} from '../services/responseTypes'

export const FETCH_WALLET_MERCHANT_INFO_STARTED = 'FETCH_WALLET_MERCHANT_INFO_STARTED';
export const FETCH_WALLET_MERCHANT_INFO_SUCCESS = 'FETCH_WALLET_MERCHANT_INFO_SUCCESS';
export const FETCH_WALLET_MERCHANT_INFO_FAILURE = 'FETCH_WALLET_MERCHANT_INFO_FAILURE';

export const REFRESH_WALLET_MERCHANT_COUPONS = 'REFRESH_WALLET_MERCHANT_COUPONS';
export const FETCH_WALLET_MERCHANT_COUPONS_STARTED = 'FETCH_WALLET_MERCHANT_COUPONS_STARTED';
export const FETCH_WALLET_MERCHANT_COUPONS_SUCCESS = 'FETCH_WALLET_MERCHANT_COUPONS_SUCCESS';
export const FETCH_WALLET_MERCHANT_COUPONS_FAILURE = 'FETCH_WALLET_MERCHANT_COUPONS_FAILURE';

export const REFRESH_WALLET_MERCHANT_ACTIONS = 'REFRESH_WALLET_MERCHANT_ACTIONS';
export const FETCH_WALLET_MERCHANT_ACTIONS_STARTED = 'FETCH_WALLET_MERCHANT_ACTIONS_STARTED';
export const FETCH_WALLET_MERCHANT_ACTIONS_SUCCESS = 'FETCH_WALLET_MERCHANT_ACTIONS_SUCCESS';
export const FETCH_WALLET_MERCHANT_ACTIONS_FAILURE = 'FETCH_WALLET_MERCHANT_ACTIONS_FAILURE';

export const REFRESH_WALLET_MERCHANT_REWARDS = 'REFRESH_WALLET_MERCHANT_REWARDS';
export const FETCH_WALLET_MERCHANT_REWARDS_STARTED = 'FETCH_WALLET_MERCHANT_REWARDS_STARTED';
export const FETCH_WALLET_MERCHANT_REWARDS_SUCCESS = 'FETCH_WALLET_MERCHANT_REWARDS_SUCCESS';
export const FETCH_WALLET_MERCHANT_REWARDS_FAILURE = 'FETCH_WALLET_MERCHANT_REWARDS_FAILURE';

export const POST_REWARD_ACQUIRE_STARTED = 'POST_REWARD_ACQUIRE_STARTED';
export const POST_REWARD_ACQUIRE_SUCCESS = 'POST_REWARD_ACQUIRE_SUCCESS';
export const POST_REWARD_ACQUIRE_FAILURE = 'POST_REWARD_ACQUIRE_FAILURE';

export const POST_REWARD_PAYOUT_STARTED = 'POST_REWARD_PAYOUT_STARTED';
export const POST_REWARD_PAYOUT_SUCCESS = 'POST_REWARD_PAYOUT_SUCCESS';
export const POST_REWARD_PAYOUT_FAILURE = 'POST_REWARD_PAYOUT_FAILURE';

export const FETCH_ACTION_INFO_STARTED = 'FETCH_ACTION_INFO_STARTED';
export const FETCH_ACTION_INFO_SUCCESS = 'FETCH_ACTION_INFO_SUCCESS';
export const FETCH_ACTION_INFO_FAILURE = 'FETCH_ACTION_INFO_FAILURE';

export const FETCH_REWARD_INFO_STARTED = 'FETCH_REWARD_INFO_STARTED';
export const FETCH_REWARD_INFO_SUCCESS = 'FETCH_REWARD_INFO_SUCCESS';
export const FETCH_REWARD_INFO_FAILURE = 'FETCH_REWARD_INFO_FAILURE';

export const REFRESH_WALLET_MERCHANT_LIMITS = 'REFRESH_WALLET_MERCHANT_LIMITS';
export const FETCH_WALLET_MERCHANT_LIMITS_STARTED = 'FETCH_WALLET_MERCHANT_LIMITS_STARTED';
export const FETCH_WALLET_MERCHANT_LIMITS_SUCCESS = 'FETCH_WALLET_MERCHANT_LIMITS_SUCCESS';
export const FETCH_WALLET_MERCHANT_LIMITS_FAILURE = 'FETCH_WALLET_MERCHANT_LIMITS_FAILURE';

export const MerchantActions = {
  fetchWalletMerchantInfo: (partnerKey: string) => createAction(
    FETCH_WALLET_MERCHANT_INFO_STARTED,
    { partnerKey },
  ),
  fetchWalletMerchantInfoSuccess: (data: any) => createAction(FETCH_WALLET_MERCHANT_INFO_SUCCESS, data),
  fetchWalletMerchantInfoFailure: (error: any) => createAction(FETCH_WALLET_MERCHANT_INFO_FAILURE, error),
  refreshWalletMerchantCoupons: (partnerKey: string) => createAction(
    REFRESH_WALLET_MERCHANT_COUPONS,
    { partnerKey },
  ),
  fetchWalletMerchantCoupons: (partnerKey: string, page: number, perPage: number) => createAction(
    FETCH_WALLET_MERCHANT_COUPONS_STARTED,
    {
      partnerKey,
      page,
      perPage,
    },
  ),
  fetchWalletMerchantCouponsSuccess: (items: [MerchantCouponItem], page: number) => createAction(
    FETCH_WALLET_MERCHANT_COUPONS_SUCCESS,
    {
      items,
      page,
    },
  ),
  fetchWalletMerchantCouponsFailure: (error: any) => createAction(FETCH_WALLET_MERCHANT_COUPONS_FAILURE, error),
  refreshWalletMerchantActions: (partnerKey: string) => createAction(
    REFRESH_WALLET_MERCHANT_ACTIONS,
    { partnerKey },
  ),
  fetchWalletMerchantActions: (partnerKey: string, page: number, perPage: number) => createAction(
    FETCH_WALLET_MERCHANT_ACTIONS_STARTED,
    {
      partnerKey,
      page,
      perPage,
    },
  ),
  fetchWalletMerchantActionsSuccess: (items: [MerchantActionItem], page: number) => createAction(
    FETCH_WALLET_MERCHANT_ACTIONS_SUCCESS,
    {
      items,
      page,
    },
  ),
  fetchWalletMerchantActionsFailure: (error: any) => createAction(FETCH_WALLET_MERCHANT_ACTIONS_FAILURE, error),
  refreshWalletMerchantRewards: (partnerKey: string) => createAction(
    REFRESH_WALLET_MERCHANT_REWARDS,
    { partnerKey },
  ),
  fetchWalletMerchantRewards: (partnerKey: string, page: number, perPage: number) => createAction(
    FETCH_WALLET_MERCHANT_REWARDS_STARTED,
    {
      partnerKey,
      page,
      perPage,
    },
  ),
  fetchWalletMerchantRewardsSuccess: (items: [MerchantRewardItem], page: number) => createAction(
    FETCH_WALLET_MERCHANT_REWARDS_SUCCESS,
    {
      items,
      page,
    },
  ),
  fetchWalletMerchantRewardsFailure: (error: any) => createAction(FETCH_WALLET_MERCHANT_REWARDS_FAILURE, error),
  postRewardAcquire: (rewardId: number) => createAction(
    POST_REWARD_ACQUIRE_STARTED,
    { rewardId },
  ),
  postRewardAcquireSuccess: (data: any) => createAction(
    POST_REWARD_ACQUIRE_SUCCESS,
    data,
  ),
  postRewardAcquireError: (error: any) => createAction(
    POST_REWARD_ACQUIRE_FAILURE,
    error,
  ),
  postRewardPayout: (partnerKey: string, tokenAmount: number, withdrawETH: string) => createAction(
    POST_REWARD_PAYOUT_STARTED,
    {
      partnerKey,
      tokenAmount,
      withdrawETH,
    },
  ),
  postRewardPayoutSuccess: (data: any) => createAction(
    POST_REWARD_PAYOUT_SUCCESS,
    data,
  ),
  postRewardPayoutError: (error: any) => createAction(
    POST_REWARD_PAYOUT_FAILURE,
    error,
  ),
  fetchActionInfo: (actionId: number) => createAction(
    FETCH_ACTION_INFO_STARTED,
    { actionId },
  ),
  fetchActionInfoSuccess: (data: any) => createAction(
    FETCH_ACTION_INFO_SUCCESS,
    data,
  ),
  fetchActionInfoFailure: (error: any) => createAction(
    FETCH_ACTION_INFO_FAILURE,
    error,
  ),
  fetchRewardInfo: (rewardId: number) => createAction(
    FETCH_REWARD_INFO_STARTED,
    { rewardId },
  ),
  fetchRewardInfoSuccess: (data: any) => createAction(
    FETCH_REWARD_INFO_SUCCESS,
    data,
  ),
  fetchRewardInfoFailure: (error: any) => createAction(
    FETCH_REWARD_INFO_FAILURE,
    error,
  ),
  fetchWalletMerchantLimitsStarted: (partnerKey: string) => createAction(
    FETCH_WALLET_MERCHANT_LIMITS_STARTED,
    { partnerKey },
  ),
  fetchWalletMerchantLimitsSuccess: (data: PartnerInfoResponse) => createAction(
    FETCH_WALLET_MERCHANT_LIMITS_SUCCESS,
    { data },
  ),
  fetchWalletMerchantLimitsFailure: (error: any) => createAction(
    FETCH_WALLET_MERCHANT_LIMITS_FAILURE,
    error,
  ),
};

export type MerchantActions = ActionsUnion<typeof MerchantActions>;
