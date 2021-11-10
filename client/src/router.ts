import { createRouter } from 'router5';
import { mobxPlugin } from 'mobx-router5';
import loggerPlugin from 'router5/plugins/logger';
import browserPlugin from 'router5/plugins/browser';
import routes from './routes';
import RootStore  from '@Stores/RootStore';

/* This Utility function is used to:
 * configure the router to use slashes instead of hash,
 * allow the use of a 404 page 
 * sets up the mobx route store 
*/
export default function configureRouter(stores: RootStore) {
    return createRouter(routes, { allowNotFound: false })
        .usePlugin(browserPlugin({ useHash: false }))
        .usePlugin(mobxPlugin(stores.routerStore)) // Notice the function takes in the RootStore that is instaited in the index.tsx
        .usePlugin(loggerPlugin); // Used for logging out state
}
// See docs/routing.readme.md for more details about this file