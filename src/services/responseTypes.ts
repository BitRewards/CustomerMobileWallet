export interface Partner {
  key: string;
  title: string;
  image: string | null;
}

export interface MerchantInfo {
  partner: Partner;
  balanceAmount: number;
  fiatAmount: number;
  fiatCurrency: string;
  couponsCount: number;
}

export interface WalletListResponse {
  count: number;
  items: [MerchantInfo];
}

export interface OfferAction {
  id: number;
  title: string;
  description: string;
  image: string;
  actionReward: string;
  partner: Partner;
}

export interface OfferActionItem {
  id: number;
  brand: string;
  image: string;
  action: OfferAction;
}

export interface OfferActionsListResponse {
  count: number;
  items: [OfferActionItem];
}

export interface OfferReward {
  id: number;
  title: string;
  description: string;
  image: string;
  partner: Partner;
}

export interface OfferRewardItem {
  id: number;
  brand: string;
  image: string;
  reward: OfferReward;
}

export interface OfferRewardListResponse {
  count: number;
  items: [OfferRewardItem];
}

export interface MerchantCouponItem {
  id: number;
  partner: Partner;
  status: 'confirmed' | string;
  title: string;
  comment: string | null;
  createdAt: number;
  expiredAt: number;
}

export interface MerchantCouponListResponse {
  count: number;
  items: [MerchantCouponItem];
}
