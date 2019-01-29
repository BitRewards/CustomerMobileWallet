import { call, put, takeLatest, fork, Effect } from 'redux-saga/effects';
import Api from '../services/Api';
import * as depositHistoryActions from '../actions/depositHistory';
import { MerchantDepositHistory } from '../services/responseTypes';

const INITIAL_PAGE = 1;
const DEFAULT_PER_PAGE = 15;

function* depositHistoryListFlow(action: walletHistoryActions.WalletHistoryActions) {
  try {
    const response = yield call(Api.getMerchantDepositHistory, action.payload.partnerKey, action.payload.page, action.payload.perPage);
    const responseData: MerchantDepositHistory = response.data;
    yield put(depositHistoryActions.DepositHistoryActions.fetchDepositHistoryListSuccess(action.payload.page, responseData.items));
  } catch (err) {
    yield put(depositHistoryActions.DepositHistoryActions.fetchDepositHistoryListFailure(err));
  }
}

export function* depositHistoryListData() {
  yield takeLatest(depositHistoryActions.FETCH_DEPOSIT_HISTORY_LIST_STARTED, depositHistoryListFlow);
}

function* refreshDepositHistoryListFlow(action: walletHistoryActions.WalletHistoryActions) {
  yield put(depositHistoryActions.DepositHistoryActions.fetchDepositHistoryList(action.payload.partnerKey, INITIAL_PAGE, DEFAULT_PER_PAGE));
}

export function* refreshDepositHistoryListData() {
  yield takeLatest(depositHistoryActions.REFRESH_DEPOSIT_HISTORY_LIST, refreshDepositHistoryListFlow);
}

export const depositHistorySagas: Effect[] = [
  fork(depositHistoryListData),
  fork(refreshDepositHistoryListData),
];
