import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import nock from 'nock';
import RootStore from '@Stores/RootStore';
nock.disableNetConnect();
configure({ adapter: new Adapter() });