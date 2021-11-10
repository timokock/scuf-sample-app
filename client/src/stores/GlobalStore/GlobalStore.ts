import { observable, action } from 'mobx';
export default class GlobalStore {
    @observable
    public sideBarCollapsed: boolean = false;

    @action
    toggleSideBar(state: boolean) {
        this.sideBarCollapsed = state;
    }
} 