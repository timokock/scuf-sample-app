import * as React from 'react';
import {  shallow } from 'enzyme';

import AppFooter from './Footer';

describe('<AppFooter />', () => {
    it('renders without crashing', () => {
        shallow(<AppFooter />);
    });
});