import { Input } from '@scuf/common';
import {  shallow } from 'enzyme';
import ValidationService from '@Utils/ValidationService/ValidationService';
import FormStore from './FormStore';
import DataTableStore from '../DataTableStore/DataTableStore';
import { fromPromise, REJECTED, FULFILLED } from 'mobx-utils';
import { MockTableData } from '../DashboardStore/MockData';
import nock from 'nock';
// import { toJS } from 'mobx';
import RootStore from '@Stores/RootStore';
describe('FormStore', () => {
    let instance: FormStore;
    let tableStore: DataTableStore;
    const data = { name: 'test', letter: 'a', index: 13 };
    beforeEach(() => {
        const stores = new RootStore();
        instance = stores.formStore;
    });

    describe('actions', () => {
        it('has a populate method that populate the form prop', async () => {
            instance.populate(data);
            expect(instance.form.value).toEqual(data);
        });

        it('has a clear method that populate the form prop', async () => {
            instance.form.value = data;
            instance.clear();
            expect(instance.form.value).toEqual({ name: '', letter: '', index: '' });
        });

        it('has a save method that populate currentAction and returns data', async () => {
            instance.populate(data);
            instance.save();
            await instance.currentAction;
            expect(instance.currentAction.state).toBe(FULFILLED);
            if (instance.currentAction.state === FULFILLED) {
                expect(instance.currentAction.value).toEqual(data);
            }
        });

        it('has a save method that populate currentAction and returns data', async () => {
            instance.populate(data);
            instance.save();
            await instance.currentAction;
            expect(instance.currentAction.state).toBe(FULFILLED);
            if (instance.currentAction.state === FULFILLED) {
                expect(instance.currentAction.value).toEqual(data);
            }
        });

        it('getRestricted sets the form index value', async () => {
            const mock = [{
                name: 'test',
                letter: 'a',
                index: 1
            }, {
                name: 'foo',
                letter: 'b',
                index: 2
            }];
            const test = nock('http://test')
            .persist()
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
                'Content-Type': 'application/json'
            })
            .get('/greek-alphabet')
            .reply(200, mock);
            await instance.getRestricted();
            expect(instance.form.data.index).toBe(mock.length + 1);
        });
    });

    describe('computed', () => {
        it('has a isDisabled prop that reacts to the forms validity', () => {
            expect(instance.isDisabled).toBe(true);
            instance.populate(data);
            expect(instance.isDisabled).toBe(false);
        });

        it('has a isLoading prop is true after save and currentAction is outstanding ', async () => {
            await instance.getRestricted();
            expect(instance.isLoading).toBe(false);
            instance.populate(data);
            instance.save();
            expect(instance.isLoading).toBe(true);
        });

        it('has actionError prop that gets populated when currentAction is rejected', async () => {
            expect(instance.actionError).toBeFalsy();
            instance.populate(data);
            instance.reject();
            try {
                await instance.currentAction;
            }
            catch (e) { /**/ }
            expect(instance.actionError).toBe('Sample Server Error');
        });
    });
});