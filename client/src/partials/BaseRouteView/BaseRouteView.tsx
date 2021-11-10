import * as React from 'react';
import { routeNode, RouteView } from 'react-mobx-router5';
import routes from '../../routes';
import IBaseRouteViewProps from './IBaseRouteViewProps';
/*
   - The router we use requires a view component. Here we load the routes via the routes prop.
   - The component also loads the global router store which is used to navigate and read parameters from urls
   - Here we load the routes via the routes prop, which is coming from the routeNode HOC
*/

/*
   - The routeNodeName const represents the root url of your app.
   - Change it if your app will be hosted on a url that has any text before your app home route
*/
const routeNodeName = '';
export class BaseRouteView extends React.Component<IBaseRouteViewProps> {
    render() {
        return (
            <RouteView
                routes={routes}
                route={this.props.route}
                routeNodeName={routeNodeName}
            />
        );
    }
}
export default routeNode(routeNodeName)(BaseRouteView);