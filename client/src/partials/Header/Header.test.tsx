
import * as React from 'react';
import { AppHeader } from './Header';
import {  shallow } from 'enzyme';
import GlobalStore from '@Stores/GlobalStore/GlobalStore';
describe('<AppHeader />', () => {
    let globalStore: GlobalStore;
    let routingStore:  GlobalRouterStore;

    beforeEach(() => {
        globalStore = {
            toggleSideBar: jest.fn()
        } as any as GlobalStore;

    });

    it('renders without crashing', () => {
        shallow(<AppHeader globalStore={globalStore}/>);
    });

    it('toggles menu close', () => {
        const wrapper =  shallow(<AppHeader globalStore={globalStore}/>);
        wrapper.prop('onMenuToggle')(false);
    });

    it('toggles menu open', () => {
        const wrapper =  shallow(<AppHeader globalStore={globalStore}/>);
        wrapper.prop('onMenuToggle')(true);
    });

    it('closes the menu when the onHeaderTransition sets collapsed to true', () => {
        const wrapper =  shallow(<AppHeader globalStore={globalStore}/>);
        wrapper.prop('onHeaderTransition')({ compressed: true, collapsed: true });
        expect(globalStore.toggleSideBar).toHaveBeenCalledTimes(1);
        expect(globalStore.toggleSideBar).toHaveBeenCalledWith(true);
    });
});