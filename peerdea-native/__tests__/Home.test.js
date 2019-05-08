import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import {shallow, render, ShallowWrapper} from 'enzyme';
import HomeScreen from '../screens/HomeScreen';
import React from 'react';
import {View, Text, Image} from 'react-native';
import { Button } from 'react-native-elements';
    
import renderer from 'react-test-renderer';

const createTestProps = (props: Object) => ({
  navigation: {
    navigate: jest.fn()
  },
  ...props
});

describe('HomeScreen', () => {
  let wrapper: ShallowWrapper;
  let props: Object;

  describe('Rendering', () => {
    beforeEach(() => {
      props = createTestProps({});
      wrapper = shallow(<HomeScreen {...props} />);
    });

    it('should render the home page without crashing', () => {
      const tree = renderer.create(<HomeScreen {...props} />).toJSON();
      expect(tree).toBeTruthy();
    });

    it('should render the View Element', () => {
      expect(wrapper.find(View)).toHaveLength(1);
    });

    it('should render the Text Element', () => {
      expect(wrapper.find(Text)).toHaveLength(1);
    });

    it('should render the Image Element', () => {
      expect(wrapper.find(Image)).toHaveLength(1);
    });

    it('should render the Button Element', () => {
      expect(wrapper.find(Button)).toHaveLength(2);
    });
  });
});