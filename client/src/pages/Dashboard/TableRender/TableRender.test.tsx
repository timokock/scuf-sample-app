
import * as React from 'react';
import {  shallow } from 'enzyme';

import  TableRender from './TableRender';
import { Table } from '@scuf/common';


describe('<TableRender />', () => {
    let results = [{ name: 'test one', letter: 'a', index: 1 }, { name: 'test two', letter: 'b', index: 2 }];
    it('renders without crashing', () => {
        shallow(<TableRender data={results}/>);
    });

    it('renders the right amount of cells', () => {
        const wrapper =  shallow(<TableRender data={results}/>);
        expect(wrapper.find(Table.Cell)).toHaveLength(6);
    });
});