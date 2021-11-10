import * as React from 'react';
import {  shallow } from 'enzyme';

import { App } from './App';
import AppHeader from './partials/Header/Header';
import AppFooter from './partials/Footer/Footer';
import AppSidebar from './partials/Sidebar/Sidebar';
import BaseRouteView from './partials/BaseRouteView/BaseRouteView';

describe('<IndexPage />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  describe('content', () => {
    it('contains required layout components', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(AppHeader)).toHaveLength(1);
      expect(wrapper.find(AppFooter)).toHaveLength(1);
      expect(wrapper.find(AppSidebar)).toHaveLength(1);
      expect(wrapper.find(BaseRouteView)).toHaveLength(1);
    });
  });
});