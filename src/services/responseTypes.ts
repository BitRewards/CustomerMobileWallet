export type Status = 'confirmed' | 'pending' | 'rejected';

export interface LoginResponse {
  auth_token: string;
}

export interface TranslationsMap {
  [key: string]: string;
}

export interface TranslationsResponse {
  [key: string]: TranslationsMap;
}

export interface Partner {
  key: string;
  title: string;
  image?: string;
  settings?: PartnerSettings;
}

export interface PartnerSettings {
  minWithdraw: string;
  maxWithdraw: string;
  withdrawFeeAmount: number;
  withdrawFeeType: 'percent' | string;
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
  priceBitTokens: number;
  priceBitTokensStr: string;
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

interface MerchantNestedOfferAction {
  id: number;
  brand?: string;
  image?: string;
  action?: OfferAction;
  affiliateUrl?: string | null;
  merchantUrl?: string | null;
}

export interface MerchantActionItem {
  id: number;
  type: 'Signup' | 'CustomBonus' | 'ShareVk' | 'ShareFb' | 'OrderCashback' | 'OrderReferral' | 'JoinFb' | 'JoinVk' | 'AffiliateActionAdmitad' | string;
  value: string;
  raw_value: number;
  value_type: 'fixed';
  title: string;
  description: string;
  config: any;
  partner_id: number;
  status: string;
  is_system: number;
  viewData: any;
  partnerLogoPicture?: string;
  specialOfferAction?: MerchantNestedOfferAction;
  max_created_at_timestamp: number;
  can_be_done: boolean;
  impossible_reason: string;
  iconClass: 'sign-up' | 'gift';
  bonusAmount: string;
}

export interface MerchantActionsListResponse {
  count: number;
  items: [MerchantActionItem];
}

interface MerchantNestedOfferReward {
  id: number;
  brand?: string;
  image?: string;
  reward?: OfferReward;
}

export interface MerchantRewardItem {
  id: number;
  type: 'GiftdDiscount' | 'BitrewardsPayout';
  price: number;
  priceAmount: number;
  priceBitTokens: number;
  priceBitTokensStr: string;
  value: string;
  valueAmount: number;
  valueType: 'fixed' | string;
  title: string;
  description: string;
  image: string;
  specialOfferReward?: MerchantNestedOfferReward;
}

export interface MerchantRewardsListResponse {
  count: number;
  items: [MerchantRewardItem];
}

export interface MerchantCouponItem {
  id: number;
  partner: Partner;
  status: Status;
  title: string;
  comment?: string;
  redeemUrl?: string;
  createdAt: number;
  expiredAt: number;
}

export interface MerchantCouponListResponse {
  count: number;
  items: [MerchantCouponItem];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MerchantFaqListResponse {
  count: number;
  items: [FaqItem];
}

export interface PersonTransactionItem {
  id: number;
  partner: Partner;
  type: 'reward' | string;
  status: Status;
  title: string;
  image: 'spent' | string;
  changeBalanceAmount: number;
  fiatChangeBalanceAmount: number;
  fiatChangeBalanceCurrency: string;
  changedAt: number;
}

export interface PersonTransactionListResponse {
  count: number;
  items: [PersonTransactionItem];
}

export interface CurrentUserResponse {
  email: string;
  key: string;
  name: string | null;
  picture: string | null;
  phone: string | null;
  balance: number;
  codes: [string];
  tracking: string;
  title: string;
}

export interface MerchantWithdrawHistory {
  count: number;
  items: [MerchantWithdrawHistoryItem];
}

export interface MerchantWithdrawHistoryItem {
  id: number;
  status: Status;
  recipient: string;
  payout: string;
  payoutAmount: number;
  payoutInPartnerCurrency: string;
  feeType: null;
  feeValue: null;
  fee: string;
  feeAmount: number;
  createdAtStr: string;
  createdAt: number;
}

export interface MerchantDepositHistory {
  count: number;
  items: [MerchantDepositHistoryItem];
}

export interface MerchantDepositHistoryItem {
  id: number;
  status: Status;
  sender: string;
  deposit: string;
  depositAmount: number;
  payoutInPartnerCurrency: string;
  createdAt: number;
  createdAtStr: string;
}

export interface Payout {
  id: number;
  status: Status;
  recipient: string;
  payout: string;
  payoutAmount: number;
  payoutInPartnerCurrency: string;
  feeType: null;
  feeValue: null;
  fee: string;
  feeAmount: number;
  createdAtStr: string;
  createdAt: number;
}

export interface CurrencyRates {
  RUB: string;
  UAH: string;
  KZT: string;
  GEL: string;
  EUR: string;
  USD: string;
  BYN: string;
}

export interface MerchantWalletHistoryResponse {
  count: number;
  items: [MerchantWalletHistoryItem];
}

export interface MerchantWalletHistoryItem {
  id: number;
  partner: Partner;
  type: 'action' | string;
  status: Status;
  title: string;
  image: string;
  changeBalanceAmount: number;
  fiatChangeBalanceAmount: number;
  fiatChangeBalanceCurrency: string;
  changedAt: number;
  redeemUrl: string | null;
}

export interface PartnerInfoResponse {
  key: string;
  title: string;
  image: string | null;
  settings: PartnerSettings;
  ethAddress: string;
}
