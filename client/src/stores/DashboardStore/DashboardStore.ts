import { observable, action } from 'mobx';
// This store uses the MobX-utils method for ajax updates more can be found at https://github.com/mobxjs/mobx-utils#frompromise.
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { IChartData, ITableData, INotificationData } from './IDashboardStore';
import { MockNotifications } from './MockData';
import RootStore from '@Stores/RootStore';
export default class DashboardStore {
    // The IPromiseBasedObservable interface requires passing the interface of the the outputted data.
    @observable
    public lineChartContents: IPromiseBasedObservable<Array<IChartData>>;
    @observable
    public barChartContents: IPromiseBasedObservable<Array<IChartData>>;
    @observable
    public tableContents: IPromiseBasedObservable<Array<ITableData>>;
    @observable
    public notifications: Array<INotificationData>;
    constructor(
        // The ajax calls are made in a single service to allow multiple stores to reuse the same web api code
        private rootStore: RootStore
    ) {
        this.notifications = MockNotifications;
    }
    @action
    getLineChartData() {
        // The fromPromise function converts a promise to a PromiseBasedObservable. 
        this.lineChartContents = fromPromise(this.rootStore.transport.get<Array<IChartData>>('/chartdata').then((res) => res.data));
    }

    @action
    getBarChartData() {
        this.barChartContents = fromPromise(this.rootStore.transport.get<Array<IChartData>>('/detailsdata').then((res) => res.data));
    }

    @action
    getTableData = () => {
        this.tableContents = fromPromise(this.rootStore.transport.get<Array<ITableData>>('/greek-alphabet').then((res) => res.data));
    }
}