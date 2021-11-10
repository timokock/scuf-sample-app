import * as React from 'react';
import {  shallow } from 'enzyme';

import Table from './Table';
import { MockTableData } from '@Stores/DashboardStore/MockData';
import DataTable from '@scuf/datatable/dist/components/DataTable/DataTable';


describe('<Table />', () => {
    const data = [MockTableData];
    it('renders without crashing', () => {
        shallow(<Table data={data} />);
    });

    it('has four columns', () => {
        const wrapper = shallow(<Table data={data} />);
        expect(wrapper.find(DataTable.Column)).toHaveLength(4);
    });

    it('has the correct default props', () => {
        const wrapper = shallow(<Table data={data} />);
        expect(wrapper.prop('reorderableColumns')).toBe(true);
        expect(wrapper.prop('resizableColumns')).toBe(true);
        expect(wrapper.prop('data')).toEqual(data);
    });

    it('has a column with the correct render output when odd row', () => {
        const wrapper = shallow(<Table data={data} />);
        const out = shallow(wrapper.find(DataTable.Column).at(2).prop('renderer')({ rowIndex: 0, rowData: MockTableData }));
        expect(out.hasClass('custom-cell-wrap')).toBeTruthy();
        expect(out.find(DataTable.Status).prop('color')).toBe('red');
    });

    it('has a column with the correct render render output event odd row', () => {
        const wrapper = shallow(<Table data={data} />);
        const out = shallow(wrapper.find(DataTable.Column).at(2).prop('renderer')({ rowIndex: 1, rowData: MockTableData }));
        expect(out.hasClass('custom-cell-wrap')).toBeTruthy();
        expect(out.find(DataTable.Status).prop('color')).toBe('green');
    });
});