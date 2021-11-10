
import RootStore from './RootStore';
import GlobalStore from './GlobalStore/GlobalStore';
import DataTableStore from '@Stores/DataTableStore/DataTableStore';
import DashboardStore from '@Stores/DashboardStore/DashboardStore';
import Transport from '@Utils/Transport/Transport';
import HeroStore from '@Stores/HeroStore/HeroStore';
import FormStore from '@Stores/FormStore/FormStore';
// Here we can check that the RootStore contains instance of the required child stores
import { GlobalRouterStore } from './RouterStore';
describe('RootStore Class', () => {
    let instance: RootStore;
    beforeEach(() => {
        instance = new RootStore();
    });

    it('contains the expected stores', () => {
        expect(instance.routerStore instanceof GlobalRouterStore).toBe(true);
        expect(instance.heroStore instanceof HeroStore).toBe(true);
        expect(instance.tableStore instanceof DataTableStore).toBe(true);
        expect(instance.globalStore instanceof GlobalStore).toBe(true);
        expect(instance.dashboardStore instanceof DashboardStore).toBe(true);
        expect(instance.formStore instanceof FormStore).toBe(true);
    });
});