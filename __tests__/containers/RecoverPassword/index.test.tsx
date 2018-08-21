import * as React from 'react';
import * as renderer from 'react-test-renderer';
import RecoverPassword from '../../../src/containers/RecoverPassword';

test('RecoverPassword renders correctly', () => {
  const tree = renderer.create(
    <RecoverPassword />,
  );
  expect(tree).toBeDefined();
});
