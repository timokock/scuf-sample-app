
import * as React from 'react';
import {  shallow } from 'enzyme';

import ListHeader from './ListHeader';
import { Grid, Input, Button } from '@scuf/common';


describe('<ListHeader/>', () => {
    const onFilter = jest.fn();
    it('renders without crashing', () => {
        shallow(<ListHeader title="test" placeholder="test placeholder" onFilter={onFilter} buttonText="test" description="test"/>);
    });

    describe('markdown', () => {
        it('renders a input with proper prop binding', () => {
           const wrapper =  shallow(<ListHeader title="test" placeholder="test placeholder" onFilter={onFilter} buttonText="test" description="test"/>);
           expect(wrapper.find(Input)).toHaveLength(1);
           expect(wrapper.find(Input).prop('placeholder')).toBe('test placeholder');
           expect(wrapper.find(Input).prop('onChange')).toEqual(onFilter);
        });

        it('renders a h1 with proper title', () => {
            const wrapper =  shallow(<ListHeader title="test" placeholder="test placeholder" onFilter={onFilter} buttonText="test" description="test"/>);
            expect(wrapper.find('h1')).toHaveLength(1);
            expect(wrapper.find('h1').text()).toBe('test');
        });

        it('renders a Button when it has a onAdd prop', () => {
            const onAdd = jest.fn();
            const wrapper =  shallow(<ListHeader title="test" placeholder="test placeholder" onFilter={onFilter} onAdd={onAdd} buttonText="test" description="test"/>);
            expect(wrapper.find(Button)).toHaveLength(1);
            wrapper.find(Button).prop('onClick')(null, null);
            expect(onAdd).toHaveBeenCalled();
        });

        it('renders a p tag with the prop description text', () => {
            const onAdd = jest.fn();
            const wrapper =  shallow(<ListHeader title="test" placeholder="test placeholder" onFilter={onFilter} onAdd={onAdd} buttonText="test" description="test"/>);
            expect(wrapper.find('p')).toHaveLength(1);
            expect(wrapper.find('p').text()).toBe('test');
        });
    });
});