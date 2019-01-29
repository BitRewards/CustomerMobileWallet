import { call, Effect, fork, put, takeLatest } from 'redux-saga/effects';
import Api from '../services/Api';
import * as historyActions from '../actions/withdrawHistory';
import { MerchantWithdrawHistory } from '../services/responseTypes';

const INITIAL_PAGE = 1;
const DEFAULT_PER_PAGE = 15;

function* transactionWithdrawHistoryFlow(action: historyActions.HistoryActions) {
  try {
    const response = yield call(Api.getMerchantWithdrawHistory, action.payload.partnerKey, action.payload.page, action.payload.perPage);
    const responseData: MerchantWithdrawHistory = response.data;
    yield put(historyActions.HistoryActions.fetchHistoryTransactionListSuccess(action.payload.page, responseData.items));
  } catch (err) {
    yield put(historyActions.HistoryActions.fetchHistoryTransactionListFailure(err));
  }
}

function* transactionWithdrawHistoryData() {
  yield takeLatest(historyActions.FETCH_HISTORY_TRANSACTION_LIST_STARTED, transactionWithdrawHistoryFlow);
}

function* refreshTransactionWithdrawHistoryFlow(action: historyActions.HistoryActions) {
  yield put(historyActions.HistoryActions.fetchHistoryTransactionList(action.payload.partnerKey, INITIAL_PAGE, DEFAULT_PER_PAGE));
}

function* refreshTransactionWithdrawHistoryData() {
  yield takeLatest(historyActions.REFRESH_HISTORY_TRANSACTION_LIST, refreshTransactionWithdrawHistoryFlow);
}

export const withdrawHistorySagas: Effect[] = [
  fork(transactionWithdrawHistoryData),
  fork(refreshTransactionWithdrawHistoryData),
];
