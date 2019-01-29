import axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
} from 'axios';
import {
  WalletListResponse,
  OfferActionsListResponse,
  OfferRewardListResponse,
  MerchantCouponListResponse,
  MerchantFaqListResponse,
  PersonTransactionListResponse,
  CurrentUserResponse,
  MerchantActionsListResponse,
  MerchantRewardsListResponse,
  LoginResponse,
  TranslationsResponse,
  MerchantWithdrawHistory,
  MerchantDepositHistory,
  MerchantWalletHistoryResponse,
  Payout,
  PartnerInfoResponse,
} from './responseTypes';
import store from '../store';
import * as sessionActions from '../actions/session';

/**
 * @Note
 * 'https://app.bitrewards.com/api-client' - production.
 * 'https://crm.inprg.com/api-client' - develop.
 * 'https://crm-beta.inprg.com/api-client' - beta.
 * 'https://crm-delta.inprg.com/api-client' - delta.
 * 'https://crm-gamma.inprg.com/api-client' - gamma.
 */
export const API_BASE_URL = 'https://app.bitrewards.com/api-client';

class Api {
  static tokenName = 'authToken';
  private static instance: Api;
  private static authToken: string;
  private axiosInstance: AxiosInstance;
  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.response.use(
      response => response,
      (onError) => {
        if (onError.response.status === 401) {
          store.dispatch(sessionActions.SessionActions.logout());
        }
        return Promise.reject(onError);
      },
    );
  }

  static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  static getAxios(): AxiosInstance {
    return Api.getInstance().axiosInstance;
  }

  static setAuthToken(token: string) {
    this.authToken = token;
    Api.getInstance().axiosInstance.defaults.headers.common['X-Auth-Token'] = this.authToken;
  }

  static setBaseUrl(baseUrl: string) {
    Api.getInstance().axiosInstance.defaults.baseURL = baseUrl;
  }

  static getBaseUrl(): string | undefined {
    return Api.getInstance().axiosInstance.defaults.baseURL;
  }

  static get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return Api.getAxios().get(url, config);
  }

  static post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return Api.getAxios().post(url, data, config);
  }

  /**
   * @param {object} error - json объект ошибки, полученный от сервера.
   * @param {string} [textField] - искомое поле, ошибку по которому необходимо отобразить.
   *
   * @return {string} текст ошибки.
   */
  static getErrorMessage(error: any, textField?: string): string {
    if (textField && error && error.response && error.response.data && Array.isArray(error.response.data.errors)) {
      const { errors } = error.response.data;
      let result: string | null = null;
      errors.forEach((e: any) => {
        if (e.field && e.field === textField && e.message) {
          result = e.message;
        }
      });
      if (typeof result === 'string') {
        return result;
      }
    }
    if (error && error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
    return 'Unknown error';
  }

  /**
   * Получает таблицу строк всех доступных локалей.
   */
  static getTranslationsList<T = TranslationsResponse>(): AxiosPromise<T> {
    return Api.get('/translation');
  }

  /**
   * Оправка кода подтверждения на email пользователя.
   *
   * @param {string} email - email, на кторый будет отправлен код подтверждения.
   */
  static postSendEmailVerificationCode<T = any>(email: string): AxiosPromise<T> {
    return Api.post('/tempAuth/sendEmailVerificationCode', {
      email,
    });
  }

  /**
   * Авторизация по коду, полученному на email.
   *
   * @param {string} email - email, на кторый был отправлен код подтверждения.
   * @param {string} code - код, который пользователь получил на email.
   */
  static postCheckEmailVerificationCode<T = LoginResponse>(email: string, code: string): AxiosPromise<T> {
    return Api.post('/tempAuth/checkEmailVerificationCode', {
      email,
      code,
    });
  }

  /**
   * Авторизация через facebook accessToken.
   *
   * @param {string} accessToken - токен, полученный в результате авторизации через facebook sdk.
   * @return {AxiosPromise<Object>}
   */
  static postLoginByFacebook<T = LoginResponse>(accessToken: string): AxiosPromise<T> {
    return Api.post('/tempAuth/loginByFacebook', {
      access_token: accessToken,
    });
  }

  /**
   * Загружает список транзакций для определенного мерчанта.
   *
   * @param {string} partnerKey - ключ мерчанта, например: 'test-partner-key'
   * @param {number} page - загружаемая страница.
   * @param {number} perPage - количество элементов на странице.
   * @return {AxiosPromise<Object>}
   */
  static getTransactionList<T = MerchantWalletHistoryResponse>(partnerKey: string, page: number, perPage: number): AxiosPromise<T> {
    return Api.get(`/${partnerKey}/transaction`, {
      params: {
        page,
        perPage,
      },
    });
  }

  /**
   * Загружает список транзакций для мультиаккаунта.
   *
   * @param {number} page - загружаемая страница.
   * @param {number} perPage - количество элементов на странице.
   * @return {AxiosPromise<Object>}
   */
  static getPersonTransactionList<T = PersonTransactionListResponse>(page: number, perPage: number): AxiosPromise<T> {
    return Api.get('/transaction', {
      params: {
        page,
        perPage,
      },
    });
  }

  /**
   * Загружает историю списка транзакций для определенного мерчанта.
   *
   * @param {string} partnerKey - ключ мерчанта, например: 'test-partner-key'
   * @param {number} page - загружаемая страница.
   * @param {number} perPage - количество элементов на странице.
   * @return {AxiosPromise<Object>}
   */
  static getMerchantWithdrawHistory<T = MerchantWithdrawHistory>(partnerKey: string, page: number, perPage: number): AxiosPromise<T> {
    return Api.get(`/${partnerKey}/transaction/withdrawHistory`, {
      params: {
        page,
        perPage,
      },
    });
  }

  /**
   * Загружает историю списка deposit транзакций для определенного мерчанта.
   *
   * @param {string} partnerKey - ключ мерчанта, например: 'test-partner-key'
   * @param {number} page - загружаемая страница.
   * @param {number} perPage - количество элементов на странице.
   * @return {AxiosPromise<Object>}
   */
  static getMerchantDepositHistory<T = MerchantDepositHistory>(partnerKey: string, page: number, perPage: number): AxiosPromise<T> {
    return Api.get(`/${partnerKey}/transaction/depositHistory`, {
      params: {
        page,
        perPage,
      },
    });
  }

  /**
   * Загружает данные мерчанта.
   *
   * @param {string} partnerKey - ключ мерчанта, например: 'test-partner-key'
   * @return {AxiosPromise<Object>}
   */
  static getMerchantData<T = any>(partnerKey: string): AxiosPromise<T> {
    return Api.get(`/${partnerKey}/page`);
  }

  static getLimitsAndFeeMerchant<T = PartnerInfoResponse>(partnerKey: string): AxiosPromise<T> {
    return Api.get(`/${partnerKey}`);
  }

  /**
   * Загружает список мерчантов пользователя.
   *
   * @return {AxiosPromise<Object>}
   */
  static getPersonWalletList<T = WalletListResponse>(): AxiosPromise<T> {
    return Api.get(`/wallet`);
  }

  /**
   * Загружает данные для кошелька мерчанта.
   *
   * @param {string} partnerKey - ключ мерчанта, например: 'test-partner-key'
   * @return {AxiosPromise<Object>}
   */
  static getMerchantWallet<T = any>(partnerKey: string): AxiosPromise<T> {
    return Api.get(`/${partnerKey}/wallet`);
  }

  /**
   * Загружает список купонов мерчанта.
   *
   * @param {string} partnerKey - ключ мерчанта, например: 'test-partner-key'
   * @return {AxiosPromise<Object>}
   */
  static getMerchantCouponList<T = MerchantCouponListResponse>(partnerKey: string): AxiosPromise<T> {
    return Api.get(`/${partnerKey}/coupon`);
  }

  /**
   * Загружает actions list для экрана special offers.
   *
   * @param {number} page - загружаемая страница.
   * @param {number} perPage - количество элементов на странице.
   * @return {AxiosPromise<Object>}
   */
  static getOfferActionsList<T = OfferActionsListResponse>(page: number, perPage: number): AxiosPromise<T> {
    return Api.get('/offer/action', {
      params: {
        page,
        perPage,
      },
    });
  }

  /**
   * Загружает reward list для экрана special offers.
   *
   * @param {number} page - загружаемая страница.
   * @param {number} perPage - количество элементов на странице.
   * @return {AxiosPromise<Object>}
   */
  static getOfferRewardList<T = OfferRewardListResponse>(page: number, perPage: number): AxiosPromise<T> {
    return Api.get('/offer/reward', {
      params: {
        page,
        perPage,
      },
    });
  }

  /**
   * Загружает информацию о экшене по id.
   *
   * @param {number} actionId - целочисленный id экшна.
   */
  static getActionInfo<T = any>(actionId: number): AxiosPromise<T> {
    return Api.get(`/action/${actionId}`);
  }

  /**
   * Загружает информацию о реварде по id.
   *
   * @param {number} rewardId - целочисленный id реварда.
   */
  static getRewardInfo<T = any>(rewardId: number): AxiosPromise<T> {
    return Api.get(`/reward/${rewardId}`);
  }

  /**
   * Загружает actions list для экрана merchant wallet.
   *
   * @param {string} partnerKey - ключ мерчанта, например: 'test-partner-key'
   * @param {number} page - загружаемая страница.
   * @param {number} perPage - количество элементов на странице.
   * @return {AxiosPromise<Object>}
   */
  static getMerchantActionsList<T = MerchantActionsListResponse>(partnerKey: string, page: number, perPage: number): AxiosPromise<T> {
    return Api.get(`/${partnerKey}/action`, {
      params: {
        page,
        perPage,
      },
    });
  }

  /**
   * Загружает reward list для экрана merchant wallet.
   *
   * @param {string} partnerKey - ключ мерчанта, например: 'test-partner-key'
   * @param {number} page - загружаемая страница.
   * @param {number} perPage - количество элементов на странице.
   * @return {AxiosPromise<Object>}
   */
  static getMerchantRewardList<T = MerchantRewardsListResponse>(partnerKey: string, page: number, perPage: number): AxiosPromise<T> {
    return Api.get(`/${partnerKey}/reward`, {
      params: {
        page,
        perPage,
      },
    });
  }

  /**
   * Загружает курс BIT в разных валютах.
   *
   * @return {AxiosPromise<Object>}
   */
  static getFiatCurrency<T = any>(): AxiosPromise<T> {
    return Api.get('currency/fiatRates');
  }

  /**
   * Загружает faq мерчанта.
   *
   * @param {string} partnerKey - ключ мерчанта, например: 'test-partner-key'
   * @return {AxiosPromise<Object>}
   */
  static getMerchantFaqList<T = MerchantFaqListResponse>(partnerKey: string): AxiosPromise<T> {
    return Api.get(`/${partnerKey}/support/faq`);
  }

  /**
   * Загружает данные пользователя мерчанта.
   *
   * @param {string} partnerKey - ключ мерчанта, например: 'test-partner-key'
   * @return {AxiosPromise<Object>}
   */
  static getCurrentMerchantUser<T = CurrentUserResponse>(partnerKey: string): AxiosPromise<T> {
    return Api.get(`/${partnerKey}/user/me`);
  }

  /**
   * Покупка скидок. В ответ придет транзакция с redeemUrl, который открывается по нажатию кнопки "использовать".
   *
   * @param {number} rewardId - целочисленный id приобретаемого реварда.
   * @return {AxiosPromise<Object>}
   */
  static postRewardAcquire<T = any>(rewardId: number): AxiosPromise<T> {
    return Api.post(`/reward/${rewardId}/acquire`);
  }

  /**
   * Отправляет информацию о совершении определенного действия.
   *
   * @param {number} actionId - целочисленный id экшна, по которому произошло социальное действие.
   * @return {AxiosPromise<Object>}
   */
  static postActionPerform<T = any>(actionId: number): AxiosPromise<T> {
    return Api.post(`/action/${actionId}/perform`);
  }

  /**
   * Отправляет информацию о совершении  withdraw payout.
   *
   * @param {string} partnerKey - ключ мерчанта, например: 'test-partner-key'
   * @param {number} tokenAmount - количество bit, которое будет переведено.
   * @param {string} withdrawETH - адрес кошелька
   * @return {AxiosPromise<Object>}
   */
  static postPayout<T = Payout>(partnerKey: string, tokenAmount: number, withdrawETH: string): AxiosPromise<T> {
    return Api.post(`/${partnerKey}/reward/bitrewardsPayout`, {
      token_amount: tokenAmount,
      withdraw_eth: withdrawETH,
    });
  }

  /**
   * Сохранение бит кошелька.
   *
   * @param {string} ethereumWallet - адрес ethereum кошелька.
   */
  static postUpdateBitTokenAddress<T = any>(ethereumWallet: string): AxiosPromise<T> {
    return Api.post(`/user/updateBitTokenAddress`, {
      ethereum_wallet: ethereumWallet,
    });
  }

  /**
   * Сохранение ethereum кошелька.
   *
   * @param {string} ethereumWallet - адрес ethereum кошелька.
   */
  static postUpdateEthereumAddress<T = any>(ethereumWallet: string): AxiosPromise<T> {
    return Api.post(`/user/updateEthereumAddress`, {
      ethereum_wallet: ethereumWallet,
    });
  }

}

export default Api;
