
import * as React from 'react';
import {  shallow } from 'enzyme';

import { RouterStore } from 'mobx-react-router';
import { AppSidebar } from './Sidebar';
import { SidebarLayout } from '@scuf/common';
import Routes from '@Routes';
import GlobalRouterStore from '@Stores/RouterStore';
import GlobalStore from '@Stores/GlobalStore/GlobalStore';
describe('<AppSidebar />', () => {
    const routingStore = { navigate: jest.fn(), route: { name: 'dashboard' } } as any as GlobalRouterStore;
    const globalMock = { sideBarCollapsed: true } as any as GlobalStore;
    beforeEach(() => {
        (routingStore.navigate as jest.Mock).mockReset();
    });

    it('renders without crashing', () => {
        shallow(<AppSidebar routerStore={routingStore} globalStore={globalMock} />);
    });

    it('is wrapped in SidebarLayout', () => {
        const wrapper = shallow(<AppSidebar routerStore={routingStore} globalStore={globalMock} />);
        expect(wrapper.is(SidebarLayout)).toBeTruthy();
    });

    describe('Nav Links', () => {
        // Here we create a helper function that calls tests and can take in variables
        function testLink(content: string, route: string) {
            describe(`content`, () => {
                it(`should have a content prop with "${content}"`, () => {
                    const wrapper = shallow(<AppSidebar routerStore={routingStore} globalStore={globalMock} />);
                    const sidebar = wrapper.find(SidebarLayout.Sidebar);
                    expect(sidebar.findWhere((c) => c.is(SidebarLayout.Sidebar.Item) && c.prop('content') == content)).toHaveLength(1)
                });

                it(`navigates to ${route}`, () => {
                    const wrapper = shallow(<AppSidebar routerStore={routingStore} globalStore={globalMock} />);
                    const sidebar = wrapper.find(SidebarLayout.Sidebar);
                    const item = sidebar.findWhere((c) => c.is(SidebarLayout.Sidebar.Item) && c.prop('content') == content);
                    item.prop('onClick')();
                    expect(routingStore.navigate).toHaveBeenCalled();
                    expect(routingStore.navigate).toHaveBeenCalledWith(route);
                });
            });
        }
        // Now repetitive tasks can be simplified 
        testLink('Dashboard Page', 'dashboard');
        testLink('DataTable Page', 'datatable');
        testLink('Hero Page', 'hero');
        testLink('Form Page', 'form');
        testLink('Routing Page', 'routing');
    });
});