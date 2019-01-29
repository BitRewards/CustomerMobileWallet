import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Faq from '../../../src/containers/Faq';
import store from '../../../src/store';

test('Faq renders correctly', () => {
  const tree = renderer.create(
    // @ts-ignore
    <Faq store={store} />,
  );
  expect(tree).toBeDefined();
});
