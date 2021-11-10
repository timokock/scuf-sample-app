import ValidationService from './ValidationService';

type MockForm = {
    foo?: string
    test?: string;
};

describe('ValidationService', () => {
    describe('default values', () => {
        it('formIsDirty defaults to false', () => {
            const instance = new ValidationService<{}>({});
            expect(instance.formIsDirty).toBe(false);
        });
        it('formIsValid defaults to false', () => {
            const instance = new ValidationService<{}>({});
            expect(instance.formIsValid).toBe(true);
        });
        it('formIsInvalid defaults to true', () => {
            const instance = new ValidationService<{}>({});
            expect(instance.formIsInvalid).toBe(false);
        });
    });

    describe('setters', () => {
        it('has setFormConfig populates data', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: 'foo', validators: [] },
                test: { value: 'test' , validators: [] }
            });
            expect(instance.value).toEqual({ foo: 'foo', test: 'test' });
        });

        it('has setFormValue that populates right all the right form data', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: undefined , validators: [] },
                test: { value: undefined , validators: [] }
            });
            expect(instance.value).toEqual({ foo: '', test: '' });
            instance.setFormValue({ foo: 'foo', test: 'test' });
            expect(instance.value).toEqual({ foo: 'foo', test: 'test' });
        });

        it('has setFormValue that rejects values not in config', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: undefined , validators: [] },
                test: { value: undefined , validators: [] }
            });
            instance.setFormValue({ baz: 'foo' });
            expect(instance.value).toEqual({ foo: undefined, test: undefined });
        });
    });

    describe('resetters', () => {
        it('has resetForm converts value back to initial set', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: 'foo', validators: []  },
                test: { value: 'test', validators: []  }
            });
            instance.value.foo = 'test';
            instance.resetForm();
            expect(instance.value).toEqual({ foo: 'foo', test: 'test' });
        });

        it('has resetValue converts selected value back to initial value', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: 'foo', validators: []  },
                test: { value: 'test', validators: []  }
            });
            instance.value.foo = 'test';
            instance.resetValue('foo');
            expect(instance.value).toEqual({ foo: 'foo', test: 'test' });
        });

        it('has resetValue that ignores keys not in config', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: 'foo', validators: []  },
                test: { value: 'test', validators: []  }
            });
            instance.resetValue('baz');
            expect(instance.value).toEqual({ foo: 'foo', test: 'test' });
        });

        it('has resetValue defaults to undefined', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: undefined , validators: [] },
                test: { value: undefined, validators: []  }
            });
            instance.resetValue('foo');
            expect(instance.value).toEqual({ foo: undefined, test: '' });
        });

        it('has resetValue that ignores keys not in config', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: 'foo' , validators: [] },
                test: { value: 'test', validators: []  }
            });
            instance.resetValue('baz');
            expect(instance.value).toEqual({ foo: 'foo', test: 'test' });
        });

        it('has clearValue that sets the targeted field to empty string', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: 'foo', validators: []  },
                test: { value: 'test', validators: []  }
            });
            instance.clearValue('foo');
            expect(instance.value).toEqual({ foo: '', test: 'test' });
        });

        it('has clearValue that ignores keys not in config', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: 'foo', validators: []  },
                test: { value: 'test' , validators: [] }
            });
            instance.clearValue('baz');
            expect(instance.value).toEqual({ foo: 'foo', test: 'test' });
        });

        it('has clearForm that converts all fields to empty string', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: 'foo' , validators: [] },
                test: { value: 'test', validators: []  }
            });
            instance.clearForm();
            expect(instance.value).toEqual({ foo: '', test: '' });
        });
    });

    describe('computed', () => {

        it('setting a value prop updates formIsValid', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: undefined, validators: ['required'] },
                test: { value: 'test', validators: [] }
            });
            expect(instance.formIsValid).toEqual(false);
            instance.value.foo = 'test';
            expect(instance.formIsValid).toEqual(true);
            instance.value.foo = '';
            expect(instance.formIsValid).toEqual(false);
            
        });

        it('setting a value prop updates formIsInvalid', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: undefined, validators: ['required'] },
                test: { value: 'test', validators: [] }
            });
            expect(instance.formIsInvalid).toEqual(true);
            instance.value.foo = 'test';
            expect(instance.formIsInvalid).toEqual(false);
            instance.resetValue('foo');
            expect(instance.formIsInvalid).toEqual(true);
        });

        it('setting a value prop updates formIsDirty', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: undefined, validators: ['required'] },
                test: { value: 'test', validators: [] }
            });
            expect(instance.formIsDirty).toEqual(false);
            instance.value.foo = 'test';
            expect(instance.formIsDirty).toEqual(true);
            instance.resetValue('foo');
            expect(instance.formIsDirty).toEqual(false);
        });

        it('setting a value prop updates formIsClean', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: undefined, validators: ['required'] },
                test: { value: 'test', validators: [] }
            });
            expect(instance.formIsClean).toEqual(true);
            instance.value.foo = 'test';
            expect(instance.formIsClean).toEqual(false);
            instance.resetValue('foo');
            expect(instance.formIsClean).toEqual(true);
        });

        it('has error that auto validates form', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: undefined, validators: ['required'] },
                test: { value: 'test', validators: [] }
            });
            expect(instance.errors.foo).toBeTruthy();
            instance.value.foo = 'https://test.com';
            expect(instance.errors.foo).toBeFalsy();
        });

        it('has dirtyErrors that auto validates form', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: undefined, validators: ['required', 'https'] },
                test: { value: 'test', validators: [] }
            });
            expect(instance.dirtyErrors.foo).toBeFalsy();
            instance.value.foo = 'foo';
            expect(instance.dirtyErrors.foo).toBeTruthy();
        });

        it('it ignores invalid validators', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: undefined, validators: ['required', 'baz'] },
                test: { value: 'test', validators: [] }
            });
            expect(instance.errors.foo).toBeTruthy();
            instance.value.foo = 'https://test.com';
            expect(instance.errors.foo).toBeFalsy();
        });

        it('has dirty that auto validates form', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: undefined, validators: ['required'] },
                test: { value: 'test', validators: [] }
            });
            expect(instance.dirty.foo).toBeFalsy();
            instance.value.foo = 'https://test.com';
            expect(instance.dirty.foo).toBeTruthy();
        });

        it('sets a new validator', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: 'foo', validators: ['projectId'] },
                test: { value: 'test', validators: [] },
            });
            instance.setValidator('projectId', { format: { message: 'Not a valid project ID', pattern: /^(?![0-9]+$)(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$/, flags: 'i' } });
            instance.value.foo = 'f#$#$';
            expect(instance.errors.foo).toBeTruthy();
        });

        it('has a data props that produces a raw js of form value', () => {
            const instance = new ValidationService<MockForm>({
                foo: { value: 'moo', validators: ['required'] },
                test: { value: 'test', validators: [] }
            });
            expect(instance.data).toEqual({
                foo: 'moo',
                test: 'test'
            });
        });
    });
});