# Routing
This will be an overview of the router we use and how we use it.

## Router 5
We are currently using [Router5](https://router5.js.org) to handle routing within our application.

### Why Router5?
We decided on using Router5 in our applications because it has a clean, declarative syntax for defining routes. It also renders components for each route, and hooks in with MobX which is our state management tool of choice. These are the main reasons why we decided to use this package.

<em>There is more information that can be found in `router.ts` and `routes.ts` via comments about exact implementation details. This will be more of an high-level overview and not in-depth.</em>

### How to use Router5
The way routing works is by utilizing `routeNode` which is just a component that excepts props passed from the router state. An example of a `routeNode` component looks like:
```jsx
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
```
Based on the route being passed via the props, it will render the corresponding view component!

This is a very important concept to understand, especially dealing with nested routes.


Here is an example of one route on a `routes.ts` file:
```js
{
    name: 'roles',
    path: '/:sub',
    component: RolesRoutes,
    children: [
        {
            name: 'list',
            path: '/roles',
            component: RolesListPage
        },
        {
            name: 'role',
            path: '/:roleId/:roleTabId',
            component: RoleDetailPage
        },
    ]
}
```
<b>Let's break this down a bit:</b>

The top level route has a path of `/:sub` which is a path param, so we can pass any parameter for the path here: I.E `roles`. The `RolesRoutes` component is a `routeNode` that handles any sub routing for `/roles`.

In the same object, we have an array of `children` and this is where we define all children routes that will be consumed by the `RolesRoutes` component. If we want to route to the Roles list page, we do not render the list page component on `name:‘roles'`’. We instead create a RouteView, then create a child route: `name:‘list’` which then routes through the `roles` routeNode and renders a child for us, being the ListPage.

This looks like: `navigate(‘roles.list, { params })`

>Here if we simply routed to `roles` and stop, an error would throw because the router is waiting for you to route to a React Component, NOT A ROUTENODE COMPONENT. So we go one more level deeper, PAST the Roles routeView component, to `’list’`, which is where we actually have the list view for Roles.

---
## More Information
Below are supplemental packages we use to connect Router5 to our front-end application and state management:
- [React-Router5](https://github.com/router5/react-router5)
- [React-MobX-Router5](https://github.com/LeonardoGentile/react-mobx-router5)