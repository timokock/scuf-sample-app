
import * as React from 'react';
import {  shallow } from 'enzyme';

import { FormPage } from './Form';
import FormStore from '@Stores/FormStore/FormStore';
import { Button, Notification, Loader, Input } from '@scuf/common';

describe('<FormPage />', () => {
    let formStore: FormStore;
    const data = { name: 'test', letter: 'a', index: 13 };
    beforeEach(() => {
        formStore = {
            save: jest.fn(),
            reject: jest.fn(),
            clear: jest.fn(),
            reset: jest.fn(),
            getRestricted: jest.fn(),
            form: {
                value: data,
                dirtyErrors: { name: 'e1', letter: 'e2', index: 'e3' },
            },
            isDisabled: false,
            isLoading: false,
            actionError: null
        } as any as FormStore;
    });

    it('renders without crashing', () => {
        shallow(<FormPage formStore={formStore} />);
    });

    describe('actionError display', () => {
        it('displays an error notification when there is an actionError', () => {
            formStore.actionError = 'test error';
            const wrapper = shallow(<FormPage formStore={formStore} />);
            expect(wrapper.find(Notification)).toHaveLength(1);
            expect(wrapper.find(Notification).prop('children')).toBe('test error');
        });
    });
});