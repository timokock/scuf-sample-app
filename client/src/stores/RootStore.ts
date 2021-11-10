import GlobalStore from './GlobalStore/GlobalStore';
import DataTableStore from '@Stores/DataTableStore/DataTableStore';
import DashboardStore from '@Stores/DashboardStore/DashboardStore';
import Transport from '@Utils/Transport/Transport';
import HeroStore from '@Stores/HeroStore/HeroStore';
import FormStore from '@Stores/FormStore/FormStore';
import { GlobalRouterStore } from './RouterStore';
import { AxiosInstance } from 'axios';
/* Using a root Mobx store allows for a number of befits over the object oriented approach:
 * Allows for ever store to have access to all stores
 * Allows for creating shared dependencies such as web ajax clients 
 * Allows for stores to be test via integration approach limited the need for mocks
 * Allows for easy typings
*/
export default class RootStore {
    public globalStore: GlobalStore;
    public routerStore: GlobalRouterStore;
    public tableStore: DataTableStore;
    public dashboardStore: DashboardStore;
    public transport: AxiosInstance;
    public heroStore: HeroStore
    public formStore: FormStore;
    constructor() {
        // Passing this into stores that require access to other stores
        this.transport = Transport;
        this.routerStore = new GlobalRouterStore();
        this.heroStore = new HeroStore();
        this.tableStore = new DataTableStore(this);
        this.globalStore = new GlobalStore();
        this.dashboardStore = new DashboardStore(this);
        this.formStore = new FormStore(this);
    }
}
