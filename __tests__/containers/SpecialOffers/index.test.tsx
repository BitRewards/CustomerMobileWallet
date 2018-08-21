import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SpecialOffers from '../../../src/containers/SpecialOffers';
import store from '../../../src/store';

test('SpecialOffers renders correctly', () => {
  const tree = renderer.create(
    // @ts-ignore
    <SpecialOffers store={store} />,
  );
  expect(tree).toBeDefined();
});
