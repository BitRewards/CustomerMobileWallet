import { createAction } from './helpers';
import { ActionsUnion } from './types';

export const CHANGE_LOCALE = 'CHANGE_LOCALE';

export const LanguageActions = {
  changeLocale: (locale: string) => createAction(CHANGE_LOCALE, locale),
};

export type LanguageActions = ActionsUnion<typeof LanguageActions>;
