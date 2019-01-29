import { call, put, takeLatest, fork, Effect } from 'redux-saga/effects';
import Api from '../services/Api';
import * as walletHistoryActions from '../actions/walletHistory';
import { MerchantWalletHistoryResponse } from '../services/responseTypes';

const INITIAL_PAGE = 1;
const DEFAULT_PER_PAGE = 15;

function* merchantWalletHistoryListFlow(action: walletHistoryActions.WalletHistoryActions) {
  try {
    const response = yield call(Api.getTransactionList, action.payload.partnerKey, action.payload.page, action.payload.perPage);
    const responseData: MerchantWalletHistoryResponse = response.data;
    yield put(walletHistoryActions.WalletHistoryActions.fetchWalletHistoryListSuccess(action.payload.page, responseData.items));
  } catch (err) {
    yield put(walletHistoryActions.WalletHistoryActions.fetchWalletHistoryListFailure(err));
  }
}

export function* merchantWalletHistoryListData() {
  yield takeLatest(walletHistoryActions.FETCH_WALLET_HISTORY_LIST_STARTED, merchantWalletHistoryListFlow);
}

function* refreshMerchantWalletHistoryListFlow(action: walletHistoryActions.WalletHistoryActions) {
  yield put(walletHistoryActions.WalletHistoryActions.fetchWalletHistoryList(action.payload.partnerKey, INITIAL_PAGE, DEFAULT_PER_PAGE));
}

export function* refreshMerchantWalletHistoryListData() {
  yield takeLatest(walletHistoryActions.REFRESH_WALLET_HISTORY_LIST, refreshMerchantWalletHistoryListFlow);
}

export const walletHistorySagas: Effect[] = [
  fork(merchantWalletHistoryListData),
  fork(refreshMerchantWalletHistoryListData),
];
