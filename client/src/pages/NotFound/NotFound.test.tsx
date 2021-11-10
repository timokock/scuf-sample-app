import * as React from 'react';
import {  shallow } from 'enzyme';

import NotFoundPage from './NotFound';


describe('<NotFoundPage />', () => {
    it('renders without crashing', () => {
        shallow(<NotFoundPage/>);
    });

    it('renders a div', () => {
       const wrapper = shallow(<NotFoundPage/>);
       expect(wrapper.is('div')).toBeTruthy();
    });
});