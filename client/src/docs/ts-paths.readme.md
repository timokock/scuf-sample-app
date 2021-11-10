# Typescript Paths Config

## What is it and Why do we use it?
This is a file that configures Typescript to allow path aliases in our components. 

This might seem redundant when looking at the CRACO config file, but we need to remember that Typescript is a tool we are using inside of Create React App and has its own native complier. So we need to tell Typescript that we have path aliases defined and are being consumed by components. This will also satisfy TSLint and not display errors in our import statements.

## How do we use it?
All we do is create an object like:
```json
"compilerOptions": {
    "baseUrl": "./src",
    "paths": {
        "@Routes/*": ["routes"],
        "@Assets/*": ["assets/*"],
        "@Stores/*": ["stores/*"],
        "@Utils/*": ["utils/*"],
        "@Services/*": ["services/*"],
        "@Partials/*": ["partials/*"]
    }
}
```
The paths are resolved relative to the baseUrl value.