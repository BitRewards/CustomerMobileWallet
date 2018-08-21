import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Wallet from '../../../src/containers/Wallet';
import store from '../../../src/store';

test('Wallet renders correctly', () => {
  const tree = renderer.create(
    // @ts-ignore
    <Wallet store={store} />,
  );
  expect(tree).toBeDefined();
});
