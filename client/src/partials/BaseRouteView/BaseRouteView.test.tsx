import * as React from 'react';
import {  shallow } from 'enzyme';

import { BaseRouteView } from './BaseRouteView';
import { RouteView } from 'react-mobx-router5';
import GlobalRouterStore from '@Stores/RouterStore';


describe('<BaseRouteView />', () => {
    it('renders without crashing', () => {
        shallow(<BaseRouteView route={GlobalRouterStore} />);
    });

    it('renders a RouteView', () => {
        const wrapper = shallow(<BaseRouteView route={GlobalRouterStore}/>);
        expect(wrapper.is(RouteView)).toBeTruthy();
    });
});