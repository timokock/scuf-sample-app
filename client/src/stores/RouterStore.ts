import { RouterStore } from 'mobx-router5';
import { Route, Params } from 'router5/create-router';

export interface IDecoratedRoute extends Route {
    params: Params;
}
export class GlobalRouterStore extends RouterStore {
    public route!: IDecoratedRoute;
}

export default GlobalRouterStore; 