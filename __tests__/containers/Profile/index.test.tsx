import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Profile from '../../../src/containers/Profile';
import store from '../../../src/store';

test('Profile renders correctly', () => {
  const tree = renderer.create(
    // @ts-ignore
    <Profile store={store} />,
  );
  expect(tree).toBeDefined();
});
