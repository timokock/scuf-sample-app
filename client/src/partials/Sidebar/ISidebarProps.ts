import { RouterStore } from 'mobx-router5';
import GlobalStore from '@Stores/GlobalStore/GlobalStore';
 
export default interface ISidebarProps {
    routerStore?: RouterStore;
    globalStore?: GlobalStore;
}