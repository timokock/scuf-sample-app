import { observable, action, computed } from 'mobx';
// This store uses the MobX-utils method for ajax updates more can be found at https://github.com/mobxjs/mobx-utils#frompromise.
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import ITableData from './IDataTableStore';
import RootStore from '@Stores/RootStore';
export default class DataTableStore {
    // The IPromiseBasedObservable interface requires passing the interface of the the outputted data 
    @observable
    public tableContents: IPromiseBasedObservable<Array<ITableData>>;
    @observable
    public selected: Array<ITableData> = [];
    @observable
    public filterBy: string | null;
    constructor(
        // The ajax calls are made in a single service to allow multiple stores to reuse the same web api code
        public rootStore: RootStore
    ) {}
    /* 
        - Computed values in stores are used to transform existing data
        - Computed values usually depend on at least two store values
        - These are recomputed when any dependant observable is altered
        - Notice that all PromiseBasedObservables also contain the state callbacks of the native js promises
    */
    @computed
    get displayData(): IPromiseBasedObservable<Array<ITableData>> {
        // We define filter as a constant to help mobx see that the value in the fromPromise is dependent on the filterBy observable
        const filter = this.filterBy!;
        return fromPromise(this.tableContents.then((results) => {
            const data = results;
            if (filter) {
                const query = filter!.toLowerCase();
                return data.filter((item) => (item.name.toLowerCase().includes(query)));
            }
            else {
                return data;
            }
        }));
    }

    @action
    setFilter(query: string) {
        this.filterBy = query;
    }

    @action
    getTableData = () => {
        this.tableContents = fromPromise(this.rootStore.transport.get<Array<ITableData>>('/greek-alphabet').then((res) => res.data));
    }
}