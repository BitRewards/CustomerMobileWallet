import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../services/Api';
import * as historyActions from '../actions/history';

function* transactionHistoryFlow(action: historyActions.HistoryActions) {
  try {
    const responseData = yield call(Api.getPersonTransactionList, action.payload.page, action.payload.perPage);
    yield put(historyActions.HistoryActions.fetchTransactionListSuccess(responseData.data.items));
  } catch (err) {
    yield put(historyActions.HistoryActions.fetchTransactionListFailure(err));
  }
}

export function* transactionHistoryData() {
  yield takeLatest(historyActions.FETCH_TRANSACTION_LIST_STARTED, transactionHistoryFlow);
}
