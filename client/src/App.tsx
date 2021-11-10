import * as React from 'react';
import { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { RouterStore } from 'mobx-router5';
import AppHeader from './partials/Header/Header';
import AppFooter from './partials/Footer/Footer';
import AppSidebar from './partials/Sidebar/Sidebar';
import BaseRouteView from './partials/BaseRouteView/BaseRouteView';

export interface IProps {
  routerStore: RouterStore;
}

@observer
export class App extends Component {
    render() {
        return (
            <React.Fragment>
                <AppHeader />
                <AppSidebar>
                    <BaseRouteView/>
                </AppSidebar>
                <AppFooter />
            </React.Fragment>
        );
    }
}

export default inject('routerStore')(App);
