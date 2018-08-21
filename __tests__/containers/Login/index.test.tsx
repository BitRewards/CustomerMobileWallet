import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Login from '../../../src/containers/Login';
import store from '../../../src/store';

test('Login renders correctly', () => {
  const tree = renderer.create(
    // @ts-ignore
    <Login store={store} />,
  );
  expect(tree).toBeDefined();
});
