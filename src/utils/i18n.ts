import { Platform, NativeModules } from 'react-native';
import { addLocaleData } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as ru from 'react-intl/locale-data/ru';
import * as enTranslationMessages from '../translations/en.json';
import * as ruTranslationMessages from '../translations/ru.json';

addLocaleData(en);
addLocaleData(ru);

export const appLocales = [
  'en',
  'ru',
];

export const DEFAULT_LOCALE = appLocales[0];

const formatTranslationMessages = (locale: string, messages: any) => {
  const defaultFormattedMessages: any = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};
  const flattenFormattedMessages = (formattedMessages: object, key: string) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key];
    return {...formattedMessages, [key]: formattedMessage};
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  ru: formatTranslationMessages('ru', ruTranslationMessages),
};

/**
 * Возвращает текущую локализацию девайса.
 * @return {string} - текущая локализация девайса. Например - 'ru'.
 */
export function getSystemLanguageCode() {
  let systemLanguage = 'en';
  try {
    systemLanguage = (Platform.OS === 'android')
      ? NativeModules.I18nManager.localeIdentifier
      : NativeModules.SettingsManager.settings.AppleLocale;
  } catch (e) {
    console.warn(`getSystemLanguageCode() - ${e}.\nReturn default 'en' language`);
  }
  return systemLanguage.substring(0, 2);
}

/**
 * Возвращает текущую поддерживаемую локализацию девайса.
 * @return {string} - текущая поддерживаемая локализация девайса. Например - 'ru'.
 */
export function getAvailableSystemLanguageCode() {
  const systemLanguage = getSystemLanguageCode();
  if (appLocales.indexOf(systemLanguage) === -1) {
    return DEFAULT_LOCALE;
  }
  return systemLanguage;
}
