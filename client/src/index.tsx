import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'whatwg-fetch';
// import 'es6-shim';
import App from './App';
// Here we import common's required csss
import '@scuf/common/honeywell/theme.css';
// Here we import datatable's required csss
import '@scuf/datatable/honeywell/theme.css';


import RootStore  from '@Stores/RootStore';

//Here we instated the RootStore which has every store as a public property
const stores = new RootStore();
import { Provider } from 'mobx-react';
import createRouter from './router';
import './index.scss';

// Here we are importing our stores file and spreading it across this Provider. All stores added to this will be accessible via child injects
const wrappedApp = (
  <Provider {...stores}>
      <App />
  </Provider>
);

// Here the router is bootstrapped
const router = createRouter(stores);

router.start(() => {
  ReactDOM.render(wrappedApp, document.getElementById('root') as HTMLElement);
});