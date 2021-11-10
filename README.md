# SCUF Sample Application
This sample application uses Sentience Common UI Framework (SCUF) components and has everything you need to get started, including a nest.js backend and a react.js frontend with mobx integration and unit testing with Jest.

# Getting Started

## Structure of the Project
There are two major folders in this project: `client` and `server`. 

### Client
Inside of the `client` folder lives a react app created using 
- [Create React App (v1)](https://github.com/facebook/create-react-app)
- [React-app-rewire](https://github.com/timarney/react-app-rewired)

Please also look at their documentation for working with this package. Note that a new version of Create React App has been released and that this will have altered some of the configuration methodology such as typescript inclusion and Sass support. Please read the new documentation before choosing whether to use this or the new process.

For more information on the frontend checkout the client's [README](client/README.md)

### Server

Inside of the server folder is a Nest.JS application written in Typescript. It is responsible for providing APIs and serving the static assets from the client once deployed.

## Installation
There are 3 sections, each with their own package.json. The project has been setup, though, so that everything can be installed and ran using the root directory's package.json.

To install all of the required node modules, run `yarn install` in the root directory. This will install the required packages for running both the client and the server as well as install the client and server's node modules.

## Development
Development is easy. Simply run `yarn start` from the root directory. This will start both the client and the server's dev servers, linking the two together and will live-reload when any of them change. If ever a backend change is made, you may have to reload the client page manually to make a new API request.


## Deployment
This application is designed to be deployed, however at its core it is just a Docker image. The first step in the build process is to build a "builder" docker image. This "builder" docker image contains all of the necessary tools to be able to deploy to SPEC (openshift command line, docker, etc). It was chosen to do it this way because we didn't want to have to install all of these dependencies on every build server. The only thing the build server needs is Docker. The "builder" image then gets ran which runs the build/build.sh script which builds the application docker image and runs the deployment steps if it is building from the master branch.

