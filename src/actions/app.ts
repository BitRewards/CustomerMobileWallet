import { createAction } from './helpers';
import { ActionsUnion } from './types';

export const DYNAMIC_INITIAL_ROUTE = 'DYNAMIC_INITIAL_ROUTE';

export const AppActions = {
  dynamicInitialRoute: () => createAction(DYNAMIC_INITIAL_ROUTE),
};

export type AppActions = ActionsUnion<typeof AppActions>;
