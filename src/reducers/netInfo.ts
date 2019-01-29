import { fromJS } from 'immutable';
import * as netInfoActions from '../actions/netInfo';
import { Reducer } from 'redux';

const initialState = fromJS({
  isConnected: false,
});

export const netInfoReducer: (state: any, action: any) => Reducer = (state = initialState, action: netInfoActions.NetInfoActions) => {
  switch (action.type) {
    case netInfoActions.CONNECTION_INFO_CHANGE: {
      return state
        .set('isConnected', action.payload);
    }
    default:
      return state;
  }
};

export default netInfoReducer;
