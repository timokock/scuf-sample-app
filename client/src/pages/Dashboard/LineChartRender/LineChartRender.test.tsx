
import * as React from 'react';
import {  shallow } from 'enzyme';

import LineChartRender from './LineChartRender';
import { Chart } from '@scuf/charts';
import { Grid, Card } from '@scuf/common';



describe('<LineChartRender />', () => {
    let data = [{ name: 'test', data: [1, 2], color: 'blue'}];
    let title = 'test title';
    let content = 'test content';
    it('renders without crashing', () => {
        shallow(<LineChartRender data={data} title={title}/>);
    });

    describe('markup', () => {
        it('is a Grid.Column width one child Line', () => {
            let wrapper = shallow(<LineChartRender data={data} title={title}/>);
            expect(wrapper.is(Chart)).toBeTruthy();
            expect(wrapper.childAt(0).is(Chart.Line)).toBeTruthy();
        });

        it('contains a chart with one Chart.Line', () => {
            let wrapper = shallow(<LineChartRender data={data} title={title}/>);
            expect(wrapper.is(Chart)).toBeTruthy();
            expect(wrapper.find(Chart.Line)).toHaveLength(1);
        });

        it('has chart title that is correct', () => {
            let wrapper = shallow(<LineChartRender data={data} title={title} />);
            expect(wrapper.find(Chart).first().prop('title')).toBe(title);
        });

        it('has a Chart.Line with right data ', () => {
            let wrapper = shallow(<LineChartRender data={data} title={title} />);
            let line = wrapper.find(Chart.Line).first();
            expect(line.prop('data')).toEqual([1, 2]);
            expect(line.prop('name')).toEqual('test');
            expect(line.prop('color')).toEqual('blue');
        });
    });
});