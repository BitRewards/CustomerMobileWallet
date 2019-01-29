import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../services/Api';
import * as historyActions from '../actions/history';
import { PersonTransactionListResponse } from '../services/responseTypes';

const INITIAL_PAGE = 1;
const DEFAULT_PER_PAGE = 15;

function* transactionHistoryFlow(action: historyActions.HistoryActions) {
  try {
    const response = yield call(Api.getPersonTransactionList, action.payload.page, action.payload.perPage);
    const responseData: PersonTransactionListResponse = response.data;
    yield put(historyActions.HistoryActions.fetchTransactionListSuccess(action.payload.page, responseData.items));
  } catch (err) {
    yield put(historyActions.HistoryActions.fetchTransactionListFailure(err));
  }
}

export function* transactionHistoryData() {
  yield takeLatest(historyActions.FETCH_TRANSACTION_LIST_STARTED, transactionHistoryFlow);
}

function* refreshTransactionHistoryFlow() {
  yield put(historyActions.HistoryActions.fetchTransactionList(INITIAL_PAGE, DEFAULT_PER_PAGE));
}

export function* refreshTransactionHistoryData() {
  yield takeLatest(historyActions.REFRESH_TRANSACTION_LIST, refreshTransactionHistoryFlow);
}
