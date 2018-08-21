import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../services/Api';
import * as walletActions from '../actions/wallet';

function* merchantWalletListFlow() {
  try {
    const responseData = yield call(Api.getPersonWalletList);
    yield put(walletActions.WalletActions.fetchWalletListSuccess(responseData.data.items));
  } catch (err) {
    yield put(walletActions.WalletActions.fetchWalletListFailure(err));
  }
}

export function* merchantWalletListData() {
  yield takeLatest(walletActions.FETCH_WALLET_LIST_STARTED, merchantWalletListFlow);
}
