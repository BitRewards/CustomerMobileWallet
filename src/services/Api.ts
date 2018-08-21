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
} from './responseTypes';

const API_BASE_URL = 'http://crm.inprg.com/api-client';

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

  static get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return Api.getAxios().get(url, config);
  }

  static post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return Api.getAxios().post(url, data, config);
  }

  /**
   * Загружает список транзакций для определенного мерчанта.
   *
   * @param {string} partnerKey - ключ мерчанта, например: 'test-partner-key'
   * @param {number} page - загружаемая страница.
   * @param {number} perPage - количество элементов на странице.
   * @return {AxiosPromise<Object>}
   */
  static getTransactionList<T = any>(partnerKey: string, page: number, perPage: number): AxiosPromise<T> {
    return Api.get(`/${partnerKey}/transaction`, {
      params: {
        page,
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
  static getPersonTransactionList<T = any>(page: number, perPage: number): AxiosPromise<T> {
    return Api.get('/transaction', {
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

}

export default Api;
