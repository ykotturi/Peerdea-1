import 'react-native';
import React from 'react';
import Login from 'components/sessions/login';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Login />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});