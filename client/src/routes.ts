import DashboardPage from './pages/Dashboard/Dashboard';
import DataTable from './pages/Datatable/DataTable';
import HeroPage from './pages/Hero/Hero';
import FormPage from './pages/Form/Form';
import NotFoundPage from './pages/NotFound/NotFound';
import RoutingPage from './pages/Routing/Routing';
import { constants } from 'router5';
/* 
    - Each item defines a route by its name, the component to be rendered, and the parameters it accepts.
    - The component bound to the route will be loaded into the base route view component.
 */
export default [
    {
        name: 'dashboard',
        path: '/',
        component: DashboardPage
    },
    {
        name: 'datatable',
        path: '/data-table',
        component: DataTable
    },
    {
        name: 'hero',
        path: '/hero',
        component: HeroPage
    },
    {
        name: 'form',
        path: '/form',
        component: FormPage
    },
    {
        name: 'routing',
        path: '/routing',
        component: RoutingPage
    },
    {
        name: 'routes',
        path: '/routes/:character',
        component: RoutingPage,
    },
     // This entry captures any unknown routes and redirects them to a component. This is our 404 page.
     {
        name: constants.UNKNOWN_ROUTE,
        path: '/not-found',
        component: NotFoundPage
    },
];