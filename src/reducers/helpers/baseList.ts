import { fromJS, List } from 'immutable';
import { AnyAction, Reducer } from 'redux';
import * as sessionActions from '../../actions/session';

const initialState = fromJS({
  isRefreshing: false,
  isFetching: false,
  items: [],
  error: null,
});

/**
 * Базовая фабрика для reducer'а простого списка.
 *
 * @param {string} FETCH_LIST_STARTED_TYPE - тип действия при котором происходит старт загрузки списка.
 * @param {string} FETCH_LIST_SUCCESS_TYPE - тип действия при котором происходит успешная загрузка списка.
 * @param {string} FETCH_LIST_FAILURE_TYPE - тип действия при котором происходит ошибка загрузки списка.
 * @param {string} [REFRESH_LIST_TYPE] - тип действия при котором необходимо обновить список.
 * @return {Object} reducer списка.
 */
export function reducerListFactory(
  FETCH_LIST_STARTED_TYPE: string,
  FETCH_LIST_SUCCESS_TYPE: string,
  FETCH_LIST_FAILURE_TYPE: string,
  REFRESH_LIST_TYPE?: string,
): Reducer {
  return (state = initialState, action: AnyAction) => {
    if (REFRESH_LIST_TYPE && action.type === REFRESH_LIST_TYPE) {
      return state
        .set('isRefreshing', true)
        .set('items', List([]))
        .set('error', null);
    }
    switch (action.type) {
      case FETCH_LIST_STARTED_TYPE: {
        return state
          .set('isFetching', true)
          .set('error', null);
      }
      case FETCH_LIST_SUCCESS_TYPE: {
        return state
          .set('isRefreshing', false)
          .set('isFetching', false)
          .set('items', List(action.payload))
          .set('error', null);
      }
      case FETCH_LIST_FAILURE_TYPE: {
        return state
          .set('isRefreshing', false)
          .set('isFetching', false)
          .set('error', action.payload);
      }
      case sessionActions.LOGOUT: {
        return initialState;
      }
      default:
        return state;
    }
  };
}
