import * as React from 'react';
import * as renderer from 'react-test-renderer';
import SplashScreen from '../../../src/containers/SplashScreen';
import store from '../../../src/store';

test('SplashScreen renders correctly', () => {
  const tree = renderer.create(
    // @ts-ignore
    <SplashScreen store={store} />,
  );
  expect(tree).toBeDefined();
});
