import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Other from '../../../src/containers/Other';
import store from '../../../src/store';

test('Other renders correctly', () => {
  const tree = renderer.create(
    // @ts-ignore
    <Other store={store} />,
  );
  expect(tree).toBeDefined();
});
