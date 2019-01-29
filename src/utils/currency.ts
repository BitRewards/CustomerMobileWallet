interface CurrencySymbolMap {
  [key: string]: string;
}

const currencySymbolMap: CurrencySymbolMap = {
  USD: '$',
  RUB: '₽',
};

/**
 * Приводит фиатную валюту к строке в соответствующем формате.
 * Например:
 * USD - '$60'
 * RUB - '60₽'
 *
 * @param {number} fiatAmount - количество фиатной валюты.
 * @param {string} fiatCurrency - код фиатной валюты.
 * @param {number} toFixed - кол-во знаков после запятой, по умолчанию 1.
 * @return {string}
 */
export function getFiatCurrencyString(fiatAmount: number, fiatCurrency: string, toFixed: number = 1): string {
  let currencySymbol: string = '';
  Object.keys(currencySymbolMap).forEach(key => {
    if (key === fiatCurrency) {
      currencySymbol = currencySymbolMap[key];
    }
  });
  const isRight: boolean = fiatCurrency === 'RUB';
  return isRight
    ? `${fiatAmount.toFixed(toFixed)}${currencySymbol}`
    : `${currencySymbol}${fiatAmount.toFixed(toFixed)}`;
}

/**
 * Приводит число количества битов в строку. Максимум 2 знака после запятой, в конце приставка BIT.
 *
 * @param {number} balanceAmount - float количество битов.
 * @return {string} - количество битов в формате '888.88 BIT'.
 */
export function getBitValueString(balanceAmount: number): string {
  if (typeof balanceAmount !== 'number') {
    return '0 BIT';
  }
  return `${balanceAmount.toFixed(2)} BIT`;
}

/**
 * Конвертация BIT
 *
 * @param {number | string} balance - текущий баланс пользователя.
 * @param {number | string} exchangeRate - курс валюты к BIT.
 * @param {string} fiatCurrency - код фиатной валюты.
 * @param {number} toFixed - кол-во знаков после запятой, по умолчанию 1.
 * @return {string} - количество битов в формате '888.88 BIT'.
 */
export function exchangeBITtoAnotherCurrency(balance: string | number, exchangeRate: string | number, fiatCurrency: string = 'USD', toFixed: number = 1): string {
  const balanceInExchangeRate = Number(balance) * Number(exchangeRate);
  return getFiatCurrencyString(balanceInExchangeRate, fiatCurrency, toFixed);
}
