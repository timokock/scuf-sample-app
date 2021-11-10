
import * as React from 'react';
import {  shallow, mount } from 'enzyme';

import { fromPromise } from 'mobx-utils';
import { Grid, Notification, Loader } from '@scuf/common';
import ContentLoader from './ContentLoader';


describe('<ContentLoader />', () => {
    it('renders without crashing', () => {
        const data = fromPromise(Promise.resolve([]));
        shallow(<ContentLoader data={data} resolve={() => <span/>} />);
    });

    describe('markdown', () => {
        // If a test will require the resultion of a promise it must be setup as a async function
        it('outputs resolve JSX on a resolved promise when the data is resolved', async () => {
            // Here we mock out a test PromiseBasedObservable
            const prom = Promise.resolve({});
            const data = fromPromise(prom);
            // The test requires that the passed in promise resolves so it is awaited here
            await prom;
            const wrapper =  shallow(<ContentLoader data={data} resolve={() => <span className="out"/>} />);
            expect(wrapper.find('.out')).toHaveLength(1);
        });

        it('resolve function should be called on a when has data', async () => {
            const prom = Promise.resolve([1, 2, 3]);
            const data = fromPromise(prom);
            await prom;
            const resolveFn = jest.fn();
            const wrapper =  shallow(<ContentLoader data={data} resolve={resolveFn} />);
            expect(resolveFn).toBeCalled();
        });

        it('outputs a Notification on a rejected promise', async () => {
            const prom = Promise.reject({status: 'test'});
            const data = fromPromise(prom);
            try {
                await prom;
            }
            catch (e) {
                // noop
            }
            const wrapper = shallow(<ContentLoader data={data} resolve={() => <span className="out"/>} />);
            expect(wrapper.find('.out')).toHaveLength(0);
            expect(wrapper.find(Notification)).toHaveLength(1);
            const note = wrapper.find(Notification).first();
            expect(note.prop('children')).toEqual('test');
        });

        it('outputs a loader on a pending promise', () => {
            const prom = new Promise(() => null);
            const data = fromPromise(prom);
            const wrapper =  shallow(<ContentLoader data={data} resolve={() => <span className="out"/>} />);
            expect(wrapper.find(Loader)).toHaveLength(1);
        });

        it('passes the loaderHeight to the loader or sets it to 400', () => {
            const prom = new Promise(() => null);
            const data = fromPromise(prom);
            const wrapper =  shallow(<ContentLoader data={data} resolve={() => <span className="out"/>} />);
            const loader = wrapper.find(Loader).first();
            expect(loader.prop('minHeight')).toBe(400);
        });

    });
});