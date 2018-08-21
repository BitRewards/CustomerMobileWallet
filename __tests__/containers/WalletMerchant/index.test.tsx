import * as React from 'react';
import * as renderer from 'react-test-renderer';
import WalletMerchant from '../../../src/containers/WalletMerchant';
import store from '../../../src/store';

test('WalletMerchant renders correctly', () => {
  const tree = renderer.create(
    // @ts-ignore
    <WalletMerchant store={store} />,
  );
  expect(tree).toBeDefined();
});
