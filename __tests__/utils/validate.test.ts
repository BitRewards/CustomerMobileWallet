import { isValidEthereumAddress } from '../../src/utils/validate';

test('Validate empty ethereum address', () => {
  const ethereumAddress = '';
  const result = isValidEthereumAddress(ethereumAddress);
  expect(result).toBeFalsy();
});

test('Validate valid ethereum address', () => {
  const ethereumAddress = '0x123456789012345678901234567890abcdefabcd';
  const result = isValidEthereumAddress(ethereumAddress);
  expect(result).toBeTruthy();
});
