
import * as React from 'react';
import {  shallow } from 'enzyme';
import { RouterPage } from './Routing';
import { Button } from '@scuf/common';
import ListHeader from '@Partials/ListHeader/ListHeader';

describe('<RouterPage />', () => {
    let RoutingStore;
    let routeName;
    let routeParams;

    // Create a new mock RoutingStore prior to each test. This lets us see which mock functions were called.
    beforeEach(() => {
        RoutingStore = {
            route: {
                path: 'testPath',
                name: 'testName',
                params: {
                    paramOne: 'testParam',
                    character: 'Groot'
                }
            },
            navigate: jest.fn()
        };
        routeName = 'routes';
        routeParams = RoutingStore.route.params;
    });

    it('renders without crashing', () => {
        shallow(<RouterPage routerStore={RoutingStore} />);
    });
    describe('router navigation', () => {
        it('performs navigation for Gamora button', () => {
            const wrapper = shallow(<RouterPage routerStore={RoutingStore} />);
            const button = wrapper.find(Button).filterWhere(b => b.prop('content') === 'Gamora');
            button.prop('onClick')(null, null);
            expect(RoutingStore.navigate).toHaveBeenCalledTimes(1);
            expect(RoutingStore.navigate).toHaveBeenCalledWith(routeName, {character: 'Gamora', actor: 'Zoe Saldana'});
        });
        it('performs navigation for Gamora button', () => {
            const wrapper = shallow(<RouterPage routerStore={RoutingStore} />);
            const button = wrapper.find(Button).filterWhere(b => b.prop('content') === 'Groot');
            button.prop('onClick')(null, null);
            expect(RoutingStore.navigate).toHaveBeenCalledTimes(1);
            expect(RoutingStore.navigate).toHaveBeenCalledWith(routeName, {character: 'Groot', actor: 'Vin Diesel'});
        });
        it('performs navigation for Gamora button', () => {
            const wrapper = shallow(<RouterPage routerStore={RoutingStore} />);
            const button = wrapper.find(Button).filterWhere(b => b.prop('content') === 'Rocket Raccoon');
            button.prop('onClick')(null, null);
            expect(RoutingStore.navigate).toHaveBeenCalledTimes(1);
            expect(RoutingStore.navigate).toHaveBeenCalledWith(routeName, {character: 'Rocket Raccoon', actor: 'Bradley Cooper'});
        });
    });
    describe('render functions', () => {
        it('has a buildTitle function that builds a page title using a present route param', () => {
            const wrapper = shallow(<RouterPage routerStore={RoutingStore} />);
            expect(wrapper.find(ListHeader).prop('title')).toEqual('Routing Page - ' + RoutingStore.route.params.character);
        });
        it('has a buildTitle function that builds a page title if no route param is present', () => {
            // Remove param 'Character' from current route
            delete RoutingStore.route.params.character;
            const wrapper = shallow(<RouterPage routerStore={RoutingStore} />);
            expect(wrapper.find(ListHeader).prop('title')).toEqual('Routing Page');
        });
    });
});