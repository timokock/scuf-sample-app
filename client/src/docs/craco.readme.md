# Craco Config

## What is it?
Taken from the documentation site:
> Create React App Configuration Override is an easy and comprehensible configuration layer for create-react-app v2.
Get all the benefits of create-react-app and customization without using 'eject' by adding a single craco.config.js file at the root of your application and customize your eslint, babel, postcss configurations and many more.

## Why do we use it?
Create React App (CRA) gives a lot of great tooling that is provided by the Facebook team such as, but not limited to:
- Latest version of React
- Testing, build, and run scripts
- Instant scaffolding of our project structure
- and more!

However, there are times when CRA does not do everything we need from our application. CRA takes a bit of a 'closed off' mindset, meaning the only way to change any configurations that are not exposed by CRA is to eject. This can have negative implications and is generally not recommended. This is where CRACO comes into play.

By leveraging CRACO and the config file, we are able to set any configurations that CRA uses without ejecting. Best of both worlds!

## How we use it
We are currently using CRACO to configure two items:

### 1. <b>Webpack</b>
We are configurating Webpack with path aliases and also defining a Plugin that sets a global varibale to a sting.

<i>
    This will be a quick overview of these two options and how / why we use them. This will NOT be a deep dive of Webpack and all configuration options available. Your application might need more configuration for Webpack, please look at the <a href="https://webpack.js.org/">Webpack Doc Site</a> for available options.
</i>


#### Path Aliases
Path aliases are a useful way to clean up import statements and clearly represent where the import is coming from.

Here is the alias object defined in the webpack config object:<br/>
```js
    alias: {
        "@Routes": `${__dirname}/src/routes`,
        "@Utils": `${__dirname}/src/utils`,
        "@Assets": `${__dirname}/src/assets`,
        "@Stores": `${__dirname}/src/stores`,
        "@Services": `${__dirname}/src/services`,
        "@Partials": `${__dirname}/src/partials`,
    },
```

What this code represents is a list of alias definitions used for import statements.

Without aliases we might have an import like
```js
import DashboardStore from '../../../../stores/DashboardStore';
```
As you can see relative paths can get very large as an application grows. By utilizing aliases, we can write cleaner import statements that are easier to read and maintain.

And with an alias:
```js
import DashboardStore from '@Stores/DashboardStore'
```

#### Plugins
Webpack has many plugins that you can use if needed, but we are also able to define our own plugins for the application to consume.

Currently we have this plugin defined:
```js
new webpack.DefinePlugin({
    API_BASE: JSON.stringify("/api")
})
```
All we are doing here is telling Webpack that we are going to use a global variable called `API_BASE` and the value is `"/api"`. You can see this is use by looking at the Transport utility file.


### 2. <b>Jest</b>
This is the second option we are overriding in the CRACO config file.

Create React App does surface some configurations for Jest but there are cases when we need a little more customization. This is particularly true when we use Path Aliases! Jest runs in its own Node instance and thus does not know about Webpack setting up these path aliases for us, so we need to configure Jest to know about these paths that we have imported for the component. Here is what that looks like: 
```js
moduleNameMapper: {
    "@Assets/(.*)": "<rootDir>/src/assets/$1",
    "@Routes/(.*)": "<rootDir>/src/routes",
    "@Utils/(.*)": "<rootDir>/src/utils/$1",
    "@Stores/(.*)": "<rootDir>/src/stores/$1",
    "@Services/(.*)": "<rootDir>/src/services/$1",
    "@Partials/(.*)": "<rootDir>/src/partials/$1",
},
```
You can see the syntax is very similar, but with some slight differences.

We can also configure where we want to collect coverage from when running a coverage report:
```js
collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/index.tsx",
    "!src/router.ts"
],
```
The `!` before a path is saying we do NOT want to collect coverage from these. This is usually used for helper components or files that are not being tested because they are not units.

Lastly, we also configure Jest to know that we have a global variable that is being consumed by multiple components:
```js
globals: {
    API_BASE: "http://test"
}
```
<br/>

You can find out more about what Jest configurations are available at https://jestjs.io/docs/en/configuration

---
## More Information
There are many more configuration options that are available. You can find an extensive list [here](https://github.com/sharegate/craco/blob/master/packages/craco/README.md#configuration-overview).

Make sure to only add configurations when absolutely necessary and make sense for the application.