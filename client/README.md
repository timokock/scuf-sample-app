# Client Overview

## Important Packages
Important packages this application uses:
- [SCUF](https://scuf.dev.spec.honeywell.com/) the core of the UI is built around this component library
- [Create React App](https://facebook.github.io/create-react-app/) for scaffolding and setting up the application
- [Typescript](https://www.typescriptlang.org/) for type checking.
- [MobX](https://mobx.js.org/) for state management.
- [Router5](https://router5.js.org/) for routing.
- [Mobx-router5](https://www.npmjs.com/package/mobx-router5) for integrating Router5 and Mobx together.

## More information on configuration files:
Below will be additional README's for the configuration files we use and how / why we use them:
- **carco.config.js**: [README](docs/craco.readme.md), [Documentation Site](https://github.com/sharegate/craco)
- **tsconfig.paths.json**: [README](docs/ts-paths.readme.md)
- **setupTests.ts**: [README](docs/setupTest.readme.md)
- **Routing**: [README](docs/routing.readme.md)
## Folder Layout

- **COVERAGE**</br>
  This folder is generated as a result from running `yarn test`. This will output an html file that can be open in browser to view all test cases.
  This application has 100% test coverage. This is the standard for the Sentience team, and is also a good practice.

- **NODE_MODULES**</br>
  This folder contains all packages that have been installed for this project. There should not be any need to go into this folder.

- **PUBLIC**</br>
  Public folder contains your base HTML file. React uses this to anchor onto when mounting the route component. The HTML file should only be changed to link libraries (for example stylesheets), and change the title. There should be **NO** HTML actually written in this file.
  You may also add/change the favicon if need be.

- **SRC**</br>
  This is where everything about the application lives. All components, stores, etc. are found here. This will be where majority of all work will be done. This documentation will go more in depth in the next section about this folder.

- **MISC**</br>
  Rest of the files in the root directory are mainly config files. These are setup with what the Sentience team uses, but configure as you see fit.


## SRC Folder

This is the center of truth for this application. All components, styles, state management, routing, etc. are stored in this directory.

### **Important Files**

An outline of important files and their functions.

### index.tsx:

Root component for the entire application. There should be no business logic in here besides:

```js
<Provider {...store}>
	<App />
</Provider>
```

Which is wrapping the `<App />` component in a High Order Component (HOC), which provides all children components with the stores we created using MobX. There should be no need to touch this file going forward.

### App.tsx:

This file creates the the SideBar Layout and Header used for this application. It is importing from SCUF to use the components. </br>

We import a component `<BaseRouteView>` wrapped around a `<SidebarLayout.Content>` tag:

```js
<SidebarLayout.Content>
	<BaseRouteView />
</SidebarLayout.Content>
```

This is where all our components will render as we route throughout the application.

### BaseRouteView.tsx:

This file creates the anchor for all our routes.</br>
The [react-mobx-router5](https://github.com/LeonardoGentile/react-mobx-router5) package has all documentation on the finer details of what this is exactly doing.

### Router.tsx

This file is where we can create and configure our router. This is setup currently so it should not need many changes. A logger is added so you may see the route state in the browser console, which is helpful for debugging purposes.</br>

```js
createRouter(routes, { allowNotFound: false });
```

The object after `routes` is where you can add more routing options to change how it behaves. This is documented in the [router5 documentation](https://router5.js.org/guides/router-options) with available options.

### Routes.ts

A simple declaration file that defines the structure of our routes. It uses objects to define a route:

```js
{ name: 'home', path: '/', component: Home }
```

Here we have the route declaration for our Home or root path.</br>

- Name: this will be the target name you will use to navigate with.
- Path: this is the path that will actually show in the browser url.
- Component: The component that will be rendered when the user navigates to this route.

For nested routing:

```js
{
   name: 'operations.controlPanel',
   path: '/control-panel',
   component: ControlPanel
}
```

## Stores Folder and Root Store

Make sure you are familiar with MobX, our state management tool. [MobX](https://mobx.js.org/intro/concepts.html) uses 'stores' to contain our state.</br>

This project is setup with having a store for any component that might need state. The idea is to remove **ALL** business logic out of a component and into its own store. So if you ever find yourself creating class methods or defining state inside a component, than you should create a new store for that component.

A directory is created for each store for ease of navigating. It should contain the store itself plus a test file containing test cases for all actions/computed methods.

Use the stores already implemented as a template when creating future stores.

**IMPORTANT**

routerStore.tsx is a file with a simple export of the imported package from [mobx-router5](https://www.npmjs.com/package/mobx-router5). There is documentation if you need to create your own router store.

index.tsx is just a barrel so we can export all stores, which the `<Provider>` HOC consumes (see above).

## Interfaces Folder

Contains Typescript files defining interface types. These are necessary when consuming or using data that has a specific structure. Interfaces are core to using Typescript in a React application, so please familiarize yourself with them.

Only global interfaces, or ones used throughout the app in multiple files, are contained here. If there is an interface needed only for a component, then those should be defined at that component level.

## MockData Folder

---

These are basic js files simply to mock out an API call's response.

This folder is only used for testing purposes.

## **Components Folder**

This folder contains all component this application uses. It is recommended to go through all components to understand the structure they follow.

Some main points to note:

- React is a unidirectional framework, and so the component folders also follow this pattern.
- Parent components are first and if there are nested children they will go into a partials folder, and so on and so forth. An example of this is the `Devices` folder.
- Each component, parent or child, will have its own stylesheet files.
- Any interfaces need for that component should be defined in that components folder.
- Each component will have its own test file.