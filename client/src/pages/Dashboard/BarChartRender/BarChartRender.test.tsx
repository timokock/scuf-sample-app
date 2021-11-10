
import * as React from 'react';
import {  shallow } from 'enzyme';

import BarChartRender from './BarChartRender';
import { Chart } from '@scuf/charts';
import { Grid, Card } from '@scuf/common';



describe('<BarChartRender />', () => {
    let data = [{ name: 'test', data: [1, 2], color: 'blue'}];
    let title = 'test title';
    let content = 'test content';
    it('renders without crashing', () => {
        shallow(<BarChartRender data={data} title={title}/>);
    });

    describe('markup', () => {
        it('is a Grid.Column width one child Line', () => {
            let wrapper = shallow(<BarChartRender data={data} title={title}/>);
            expect(wrapper.is(Chart)).toBeTruthy();
            expect(wrapper.childAt(0).is(Chart.Column)).toBeTruthy();
        });

        it('contains a chart with one Chart.Line', () => {
            let wrapper = shallow(<BarChartRender data={data} title={title}/>);
            expect(wrapper.is(Chart)).toBeTruthy();
            expect(wrapper.find(Chart.Column)).toHaveLength(1);
        });

        it('has chart title that is correct', () => {
            let wrapper = shallow(<BarChartRender data={data} title={title} />);
            expect(wrapper.find(Chart).first().prop('title')).toBe(title);
        });

        it('has a Chart.Line with right data ', () => {
            let wrapper = shallow(<BarChartRender data={data} title={title} />);
            let bar = wrapper.find(Chart.Column).first();
            expect(bar.prop('data')).toEqual([1, 2]);
            expect(bar.prop('name')).toEqual('test');
        });
    });
});