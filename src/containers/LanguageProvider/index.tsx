import * as React from 'react';
import { Text } from 'react-native';
import 'intl'; // intl полифил для работы react-intl в react-native.
import { IntlProvider } from 'react-intl';
import { getAvailableSystemLanguageCode } from '../../utils/i18n';

export interface LanguageProviderProps {
  children: React.ReactNode;
  messages: any;
}
export interface State { }

class LanguageProvider extends React.PureComponent<LanguageProviderProps, State> {
  render() {
    const {
      messages,
    } = this.props;
    const locale = getAvailableSystemLanguageCode();
    return (
      <IntlProvider
        locale={locale}
        key={locale}
        messages={messages[locale]}
        textComponent={Text}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

export default LanguageProvider;
