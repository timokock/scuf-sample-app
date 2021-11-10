
import DashboardStore from './DashboardStore';
import { MockChartData, MockTableData } from './MockData';
import nock from 'nock';
import RootStore from '@Stores/RootStore';

describe('DashboardStore', () => {
    let instance: DashboardStore;
    beforeEach(() => {
        const stores = new RootStore();
        instance = stores.dashboardStore;
    });

    describe('Ajax Behavior', () => {
        it('has a getLineChartData method that populates lineChartContents', async () => {
             nock('http://test')
            .persist()
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
                'Content-Type': 'application/json'
            })
            .get('/chartdata')
            .reply(200, MockChartData);
            instance.getLineChartData();
            await instance.lineChartContents;
            expect(instance.lineChartContents.state).toBe('fulfilled');
            if (instance.lineChartContents.state === 'fulfilled') {
                expect(instance.lineChartContents.value).toEqual(MockChartData);
            }
        });

        it('has a getBarChartData method that populates barChartContents', async () => {
             nock('http://test')
            .persist()
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
                'Content-Type': 'application/json'
            })
            .get('/detailsdata')
            .reply(200, MockChartData);
            instance.getBarChartData();
            await instance.barChartContents;
            expect(instance.barChartContents.state).toBe('fulfilled');
            if (instance.barChartContents.state === 'fulfilled') {
                expect(instance.barChartContents.value).toEqual(MockChartData);
            }
        });

        it('has a getTableData method that populates lineChartContents', async () => {
            const test = nock('http://test')
            .persist()
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
                'Content-Type': 'application/json'
            })
            .get('/greek-alphabet')
            .reply(200, MockTableData);
            instance.getTableData();
            await instance.tableContents;
            expect(instance.tableContents.state).toBe('fulfilled');
            if (instance.tableContents.state === 'fulfilled') {
                expect(instance.tableContents.value).toEqual(MockTableData);
            }
        });
    });
});