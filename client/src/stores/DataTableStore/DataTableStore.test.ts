
import DataTableStore from './DataTableStore';
import { MockTableData } from '../DashboardStore/MockData';
import nock from 'nock';
import RootStore from '@Stores/RootStore';
describe('DataTableStore', () => {
    let instance: DataTableStore;
   
    const mock = [{
        name: 'test',
        letter: 'a',
        index: 1
    }, {
        name: 'foo',
        letter: 'b',
        index: 2
    }];
    beforeEach(() => {
        const stores = new RootStore();
        instance = stores.tableStore;
    });

    describe('Ajax Behavior', () => {
        it('has a getTableData method that populates lineChartContents', async () => {
            const test = nock('http://test')
            .persist()
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
                'Content-Type': 'application/json'
            })
            .get('/greek-alphabet')
            .reply(200, mock);
            instance.getTableData();
            await instance.tableContents;
            expect(instance.tableContents.state).toBe('fulfilled');
            if (instance.tableContents.state === 'fulfilled') {
                expect(instance.tableContents.value).toEqual(mock);
            }
        });
    });

    describe('Computed Behavior', () => {
        it('returns full app as displayData when no filter is set', async () => {
            instance.getTableData();
            const test = instance.displayData;
            await test;
            expect(test.state).toBe('fulfilled');
            if (test.state === 'fulfilled') {
                expect(test.value).toEqual(mock);
            }
        });

        it('returns filtered displayData when filter is set', async () => {
            instance.getTableData();
            await instance.tableContents;
            instance.setFilter(MockTableData.name);
            const test = instance.displayData;
            await test;
            expect(test.state).toBe('fulfilled');
            if (test.state === 'fulfilled') {
                expect(test.value).toEqual([MockTableData]);
            }
        });
    });
});