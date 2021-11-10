import * as React from 'react';
import {  shallow } from 'enzyme';
import { DashboardPage } from './Dashboard';
import DashboardStore from '@Stores/stores/DashboardStore/DashboardStore';
import { fromPromise } from 'mobx-utils';
import { Grid, Loader, Table } from '@scuf/common';
import LineChartRender from './LineChartRender/LineChartRender';
import ContentLoader from '@Partials/ContentLoader/ContentLoader';
// Mock data files live next to the store they relate to allow for easy consistent testing.
import { MockChartData, MockTableData, MockNotifications } from '@Stores/DashboardStore/MockData';
import { Chart } from '@scuf/charts';


// All tests should be wrapped in  a describe block.
describe('<DashboardPage />', () => {
    // This is a mock store used as static holder for data in tests.
    let dashboardStore: DashboardStore;

    beforeEach(() => {
        //  Resetting the store before each test clears all its data and spy functions.
        dashboardStore = {
            //  These represent the dashboardStore's data. We wrap them in promises so the types match those used in the app (PromiseBasedObservable).
            lineChartContents: fromPromise(Promise.resolve([MockChartData])),
            barChartContents: fromPromise(Promise.resolve([MockChartData])),
            tableContents: fromPromise(Promise.resolve([MockTableData])),
            notifications: MockNotifications,
            // Most setters should be mocked with a Jest function: 
            getLineChartData: jest.fn(),
            getBarChartData: jest.fn(),
            getTableData: jest.fn()
        } as any as DashboardStore;
    });

    /*
        - The first test in any test file is always a direct shallow rendering of the component.
        - Notice that we are injecting the mock dashboardStore here.
    */
    it('renders without crashing', () => {
        shallow(<DashboardPage dashboardStore={dashboardStore} />);
    });

    /* Here we can test the output of resolved data callbacks. */
    describe(`ContentLoader resolves output`, () => {
        it('has a first ContentLoader that outputs a chart ', () => {
            const wrapper = shallow(<DashboardPage dashboardStore={dashboardStore} />);
            const lineLoader = wrapper.find(ContentLoader).first();
            /* 
            - Here we render our lineLoader with known mock data. We store this output as a constant.
            - In order to use Enzyme methods like toBeTruthy() we must render output using the shallow() function.
            */
            const output = shallow(lineLoader.prop('resolve')([MockChartData]));
            expect(output.is(Chart)).toBeTruthy();
        });

        it('has a second ContentLoader that outputs a chart ', () => {
            const wrapper = shallow(<DashboardPage dashboardStore={dashboardStore} />);
            const barLoader = wrapper.find(ContentLoader).at(1);
            const output = shallow(barLoader.prop('resolve')([MockChartData]));
            expect(output.is(Chart)).toBeTruthy();
        });

        it('has a third ContentLoader that outputs a table ', () => {
            const wrapper = shallow(<DashboardPage dashboardStore={dashboardStore} />);
            const lineLoader = wrapper.find(ContentLoader).at(2);
            const output = shallow(lineLoader.prop('resolve')([MockTableData]));
            expect(output.is(Table)).toBeTruthy();
        });
    });
});