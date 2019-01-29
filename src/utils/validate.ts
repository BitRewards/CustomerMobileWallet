
/**
 * Валидирует адрес ethereum кошелька.
 *
 * @param {string} ethereumAddress - проверяемый адрес ethereum кошелька.
 * @return {boolean} - Возвращает true, если адрес ethereum кошелька валиден.
 */
export function isValidEthereumAddress(ethereumAddress: string) {
  const regCheckAddress = /^(0x)[0-9a-f]{40}$/i;
  const validAddress = ethereumAddress.match(regCheckAddress);
  return validAddress !== null;
}
