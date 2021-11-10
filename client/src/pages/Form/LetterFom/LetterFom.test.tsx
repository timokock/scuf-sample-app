
import * as React from 'react';
import {  shallow } from 'enzyme';

import { LetterForm } from './LetterForm';
import { Button, Notification, Loader, Input } from '@scuf/common';
import FormStore from '@Stores/FormStore/FormStore';

describe('<LetterForm />', () => {
    let formStore: FormStore;
    const data = { name: 'test', letter: 'a', index: 13 };
    beforeEach(() => {
        formStore = {
            save: jest.fn(),
            reject: jest.fn(),
            clear: jest.fn(),
            form: {
                value: data,
                dirtyErrors: { name: 'e1', letter: 'e2', index: 'e3' },
            },
            isDisabled: false,
            isLoading: false,
            actionError: null
        } as any as FormStore;
    });

    describe('Inputs', () => {
        // Here we create a helper function that calls tests and can take in variables
        function testInput(friendlyName: string, fieldName: string) {
            describe(friendlyName, () => {
                it(`should have a label with "${friendlyName}"`, () => {
                    const wrapper = shallow(<LetterForm formStore={formStore} />);
                    expect(wrapper.findWhere((c) => c.is(Input) && c.prop('label') === friendlyName)).toHaveLength(1);
                });

                it(`should have a be bound to the right data prop`, () => {
                    const val = formStore.form.value;
                    const wrapper = shallow(<LetterForm formStore={formStore} />);
                    expect(wrapper.findWhere((c) => c.is(Input) && c.prop('value') === val[fieldName])).toBeTruthy();
                });

                it(`should have a be bound to the right error prop`, () => {
                    const val = formStore.form.dirtyErrors;
                    const wrapper = shallow(<LetterForm formStore={formStore} />);
                    expect(wrapper.findWhere((c) => c.is(Input) && c.prop('error') === val[fieldName])).toBeTruthy();
                });

                it('should set the value when input.onChange is called with a new value', () => {
                    const val = formStore.form.value;
                    const wrapper = shallow(<LetterForm formStore={formStore} />);
                    const search = fieldName === 'index' ? val[fieldName].toString() : val[fieldName];
                    const newval = fieldName === 'index' ? 12 : 'new val';
                    wrapper.findWhere((c) => c.is(Input) && c.prop('value') === search).prop('onChange')(newval);
                    expect(val[fieldName]).toEqual(newval);
                });
            });
        }
        // Now repetitive tasks can be simplified 
        testInput('Name', 'name');
        testInput('Letter', 'letter');
        testInput('Index', 'index');
    });

    describe('form actions', () => {
        // Here we test private functions by finding the button in the view bound to them.
        it('has a Save button that calls the stores save method', () => {
            const wrapper = shallow(<LetterForm formStore={formStore} />);
            const save = wrapper.find(Button).at(0);
            save.prop('onClick')(null, null);
            expect(formStore.save).toHaveBeenCalled();
        });

        it('has a Reject button that calls the stores reject method', () => {
            const wrapper = shallow(<LetterForm formStore={formStore} />);
            const save = wrapper.find(Button).at(1);
            save.prop('onClick')(null, null);
            expect(formStore.reject).toHaveBeenCalled();
        });

        it('has a Clear button that calls the stores clear method', () => {
            const wrapper = shallow(<LetterForm formStore={formStore} />);
            const save = wrapper.find(Button).at(2);
            save.prop('onClick')(null, null);
            expect(formStore.clear).toHaveBeenCalled();
        });
    });

    describe('loader display', () => {
        it('displays loader when store loading true', () => {
            formStore.isLoading = true;
            const wrapper = shallow(<LetterForm formStore={formStore} />);
            expect(wrapper.find(Loader)).toHaveLength(1);
        });
    });
});