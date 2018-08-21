/**
 * Кошелек мерчанта.
 */

import { createAction } from './helpers';
import { ActionsUnion } from './types';
import { MerchantCouponItem } from '../services/responseTypes';

export const FETCH_WALLET_MERCHANT_INFO_STARTED = 'FETCH_WALLET_MERCHANT_INFO_STARTED';
export const FETCH_WALLET_MERCHANT_INFO_SUCCESS = 'FETCH_WALLET_MERCHANT_INFO_SUCCESS';
export const FETCH_WALLET_MERCHANT_INFO_FAILURE = 'FETCH_WALLET_MERCHANT_INFO_FAILURE';
export const FETCH_WALLET_MERCHANT_COUPONS_STARTED = 'FETCH_WALLET_MERCHANT_COUPONS_STARTED';
export const FETCH_WALLET_MERCHANT_COUPONS_SUCCESS = 'FETCH_WALLET_MERCHANT_COUPONS_SUCCESS';
export const FETCH_WALLET_MERCHANT_COUPONS_FAILURE = 'FETCH_WALLET_MERCHANT_COUPONS_FAILURE';

export const MerchantActions = {
  fetchWalletMerchantInfo: (partnerKey: string) => createAction(
    FETCH_WALLET_MERCHANT_INFO_STARTED,
    { partnerKey },
  ),
  fetchWalletMerchantInfoSuccess: (data: any) => createAction(FETCH_WALLET_MERCHANT_INFO_SUCCESS, data),
  fetchWalletMerchantInfoFailure: (error: any) => createAction(FETCH_WALLET_MERCHANT_INFO_FAILURE, error),
  fetchWalletMerchantCoupons: (partnerKey: string) => createAction(
    FETCH_WALLET_MERCHANT_COUPONS_STARTED,
    { partnerKey },
  ),
  fetchWalletMerchantCouponsSuccess: (data: [MerchantCouponItem]) => createAction(FETCH_WALLET_MERCHANT_COUPONS_SUCCESS, data),
  fetchWalletMerchantCouponsFailure: (error: any) => createAction(FETCH_WALLET_MERCHANT_COUPONS_FAILURE, error),
};

export type MerchantActions = ActionsUnion<typeof MerchantActions>;
