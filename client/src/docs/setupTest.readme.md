# Setup Tests Configuration File

## What is it?
This file will setup any configuratins needed before any tests are ran.

## How do we use it?
The `setupTests.ts file` is ran whenever we run `yarn test` in the CLI. Create React App has this functionality built in and there is no additional setup needed.

In this file, we have this code:
```js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import nock from 'nock';
import RootStore from '@Stores/RootStore';
nock.disableNetConnect();
configure({ adapter: new Adapter() });
```
All these imports and configurations are called / imported whenever we run a test. It is applied to every test file as it is ran and allows us to have one place to put code that is used across multiple test files. This keeps our code DRY.

[Nock](https://github.com/nock/nock) is a testing tool used to mock out api calls.