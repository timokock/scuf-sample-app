import * as React from 'react';
import {  shallow, mount } from 'enzyme';
import { DataTablePage } from './DataTable';
import { DataTable } from '@scuf/datatable';
import DataTableStore from '@Stores/DataTableStore/DataTableStore';
import { Grid } from '@scuf/common';
import { MockTableData } from '@Stores/DashboardStore/MockData';
import { fromPromise } from 'mobx-utils';
import ListHeader from '@Partials/ListHeader/ListHeader';
import ContentLoader from '@Partials/ContentLoader/ContentLoader';
describe('<DataTablePage />', () => {
    let tableStore: DataTableStore;
    beforeEach(() => {
        tableStore = {
            tableContents: fromPromise(Promise.resolve([MockTableData])),
            displayData: fromPromise(Promise.resolve([MockTableData])),
            getTableData: jest.fn(),
            setFilter: jest.fn(),
        } as any as DataTableStore;
    });

    it('renders without crashing', () => {
        shallow(<DataTablePage tableStore={tableStore} />);
    });

    it('renders a list header whose on filter calls the tableStore setFilter', () => {
        const wrapper = shallow(<DataTablePage tableStore={tableStore} />);
        wrapper.find(ListHeader).prop('onFilter')('test');
        expect(tableStore.setFilter).toHaveBeenCalled();
        expect(tableStore.setFilter).toHaveBeenCalledWith('test');
    });

    it('has a ContentLoader that outputs a Table view component with the right data', async () => {
        const wrapper = shallow(<DataTablePage tableStore={tableStore} />);
        const res = shallow(wrapper.find(ContentLoader).prop('resolve')([MockTableData]));
        expect(res.prop('data')).toEqual([MockTableData]);
    });
});