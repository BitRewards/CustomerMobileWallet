import { createAction } from './helpers';
import { ActionsUnion } from './types';

export const CONNECTION_INFO_CHANGE = 'CONNECTION_INFO_CHANGE';

export const NetInfoActions = {
  /**
   * Set connection info.
   * @param {boolean} isConnected - isConnected.
   */
  connectionInfoChange: (isConnected: boolean) => createAction(CONNECTION_INFO_CHANGE, isConnected),
};

export type NetInfoActions = ActionsUnion<typeof NetInfoActions>;
