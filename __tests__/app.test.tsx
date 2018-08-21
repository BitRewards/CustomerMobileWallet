import * as React from 'react';
import * as renderer from 'react-test-renderer';
import App from '../src/App';

test('App renders correctly', () => {
  const tree = renderer.create(
    <App />,
  );
  expect(tree).toBeDefined();
});
