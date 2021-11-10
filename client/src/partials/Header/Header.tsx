import * as React from 'react';
import { Header } from '@scuf/common';
import { IHeaderProps } from './IHeaderProps';
import { inject, observer } from 'mobx-react';

// This component uses a global store which is used to synchronize the state of the header and sidebar.
@observer
export class AppHeader extends React.Component<IHeaderProps> {
    render() {
        return (
            <Header title="Sentience Portal" onMenuToggle={this.toggleMenu} onHeaderTransition={this.transitionMenu}>
                <Header.UserProfile firstName="Tom" lastName="Jones" />
            </Header>
        );
    }

    private toggleMenu = () => {
        this.props.globalStore!.toggleSideBar(!this.props.globalStore!.sideBarCollapsed);
    }
    /*
        - The onHeaderTransition callback allows the app to capture when the header transitions view states. This includes its initial mount.
        - Collapsed is when the menu items are put into a drop down and compressed is the  mobile view.
    */
    private transitionMenu = (data: { compressed: boolean, collapsed: boolean, }) => {
        this.props.globalStore!.toggleSideBar(data.collapsed);
    }

}

export default inject('globalStore')(AppHeader);