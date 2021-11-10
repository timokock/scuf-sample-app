import * as React from 'react';
import { SidebarLayout } from '@scuf/common';
import { observer, inject } from 'mobx-react';
import ISidebarProps from './ISidebarProps';
import './Sidebar.scss';

// The const allows for shortening names of view sub-components
const Sidebar = SidebarLayout.Sidebar;
@observer
export class AppSidebar extends React.Component<ISidebarProps> {
    render() {
        const globalStore = this.props.globalStore!;
        const router = this.props.routerStore!;
        const route = router.route;
        // Here the global router store is used to track the current routes name, this is used for active link detection
        const name = route && route.name ? route.name : '';
        // Navigation works through the routerStore's navigate function
        return (
            <SidebarLayout collapsed={globalStore.sideBarCollapsed} className="app-sidebar">
                <Sidebar>
                    <Sidebar.Item
                        content="Dashboard Page"
                        icon="dashboard"
                        iconRoot="building"
                        onClick={() => router.navigate('dashboard')}
                        active={name === 'dashboard'}
                    />
                    <Sidebar.Item
                        content="DataTable Page"
                        icon="multiple-devices"
                        iconRoot="building"
                        onClick={() => router.navigate('datatable')}
                        active={name === 'datatable'}
                    />
                     <Sidebar.Item
                        content="Hero Page"
                        icon="globe"
                        iconRoot="building"
                        onClick={() => router.navigate('hero')}
                        active={name === 'hero'}
                    />
                    <Sidebar.Item
                        content="Form Page"
                        icon="doc-annotate"
                        iconRoot="building"
                        onClick={() => router.navigate('form')}
                        active={name === 'form'}
                    />
                    <Sidebar.Item
                        content="Routing Page"
                        icon="location"
                        iconRoot="global"
                        onClick={() => router.navigate('routing')}
                        active={name === 'routing' || name === 'routes'}
                    />
                </Sidebar>
                <SidebarLayout.Content>
                    {this.props.children}
                </SidebarLayout.Content>
            </SidebarLayout>
        );
    }
}
export default inject('routerStore', 'globalStore')(AppSidebar);