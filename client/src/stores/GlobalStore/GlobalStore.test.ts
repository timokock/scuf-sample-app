import GlobalStore from './GlobalStore';
import RootStore from '@Stores/RootStore';
describe('GlobalStore', () => {
    let instance: GlobalStore;
    beforeEach(() => {
        instance = new GlobalStore();
    });
    
    describe('Side bar actions',  () => {

        it('toggles side bar open', () => {
            instance.toggleSideBar(true);
            const test = instance.sideBarCollapsed;
            expect(test).toBe(true);
        });

        it('toggles side bar close', () => {
            instance.toggleSideBar(false);
            const test = instance.sideBarCollapsed;
            expect(test).toBe(false);
        });
    });
});
