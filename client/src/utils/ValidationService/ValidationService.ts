import { observable, action, computed, observe, toJS } from 'mobx';
import { single } from 'validate.js';
import { FormConfigData, FormDirty, PatchFormData, FormObject, ValidationEntry } from './IValdation';

export default class ValidationService<T extends FormObject> {

    @computed
    get dirty() {
        const dirtyOutput: {
            [P in keyof T]?: boolean
        } = {};
        for (let key in this.formDirty) {
            dirtyOutput[key] = this.formDirty[key];
        }
        return dirtyOutput;
    }

    @computed
    get formIsDirty() {
        for (let key in this.formDirty) {
            if (this.formDirty[key]) {
                return true;
            }
        }
        return false;
    }

    @computed
    get formIsClean() {
        for (let key in this.formDirty) {
            if (this.formDirty[key]) {
                return false;
            }
        }
        return true;
    }

    @computed
    get formIsValid() {
        return Object.keys(this.errors).length === 0;
    }

    @computed
    get formIsInvalid() {
        return !this.formIsValid;
    }

    @computed
    get errors() {
        type ErrorOutput = {
            [P in keyof T]?: string
        };
        
        const errorOutput: ErrorOutput = {};
        for (let key in this.config) {
            const errors = this.getErrorsForKey(key);
            Object.assign(errorOutput, errors);
        }
        return errorOutput;
    }

    @computed
    get dirtyErrors() {
        const errorOutput: {
            [P in keyof T]?: string
        } = {};
        for (let key in this.errors) {
            if (this.formDirty[key]) {
                errorOutput[key] = this.errors[key];
            }
        }
        return errorOutput;
    }

    @computed
    get data() {
        return toJS(this.value);
    }
    @observable
    public value: T;
    @observable
    private formDirty: FormDirty = {};
    @observable
    private formData: PatchFormData = {};

    private validationDictionary: ValidationEntry = {
        required: {
            presence: { message: 'Required', allowEmpty: false }
        },
        https: {
            url: { message: 'Invalid url. Must be https://', schemes: ['https'] }
        },
        guid: {
            format: { message: 'Not a valid GUID', pattern: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/, flags: 'i' }
        },
        noSpaces: {
            format: { message: 'No Spaces Allowed', pattern: /^\S*$/ }
        },
        validId: {
            format: { message: 'Not a valid ID', pattern: /^(?![-.])(?!.*[-.]$)[A-z0-9-.]{1,255}?$/, flags: 'i'}
        },
        maxLength: {
            length: { maximum: 39, message: 'Name too long' }
        },
        validName: {
            format: { message: 'Not a valid name', pattern: /^[^-\s][a-zA-Z0-9_\s-]+[^-\s]$/, flags: 'i'}
        },
        url: {
            format: { message: 'Not a valid URL', pattern: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/}
        }
    };

    constructor(private config: FormConfigData<T>) {
        const value = {} as T;

        Object.keys(this.config).forEach( key => {
            const initialValue = this.config[key].value ? this.config[key].value : '';
            this.formData[key] = initialValue;
            value[key] = initialValue;
            this.formDirty[key] = false;
        });

        this.value = value;

        observe(this.value, (val) => {
            this.formDirty[val.name] = true;
        });
    }

    @action
    setFormValue(data: T) {
        for (let key in this.config) {
            this.config[key].value = data[key];
            this.value[key] = data[key];
            this.formData[key] = data[key];
            this.formDirty[key] = false;
        }
    }

    @action
    resetForm() {
        this.formDirty = {};
        Object.keys(this.config).forEach(key => {
            this.config[key].value = this.formData[key];
            this.value[key] = this.formData[key];
            this.formDirty[key] = false;
        });
    }

    @action
    clearForm() {
        this.formData = {};
        this.formDirty = {};
        Object.keys(this.config).forEach( key => {
            this.config[key].value = undefined;
            this.value[key] = '';
            this.formDirty[key] = false;
        });
    }

    @action
    resetValue(key: string) {
        if (this.config.hasOwnProperty(key)) {
            if (this.config[key] && this.formData[key]) {
                this.value[key] = this.formData[key];
            }
            else {
                this.value[key] = undefined;
            }
            this.formDirty[key] = false;
        }
    }

    @action
    clearValue(key: string) {
        if (this.config.hasOwnProperty(key)) {
            this.formDirty[key] = false;
            this.value[key] = '';
            this.config[key].value = undefined;
        }
    }
 
    @action
    setValidator(name: string, rule: object) {
       this.validationDictionary[name] = rule;
    }

    private getErrorsForKey = (key: string) => {
        type ErrorOutput = {
            [P in keyof T]?: string
        };

        const { validators } = this.config[key];
        const inputValue = this.value[key];

        return validators.reduce(
            (object: ErrorOutput, validation: string) => {
                const validationRules = this.validationDictionary[validation];
                const reset = !inputValue && validators.indexOf('required') === -1;
                
                const errors = single(inputValue, validationRules);
                if (errors && !reset) {
                    object[key] = errors[0];
                }
                return object;
            },                
            {}
        );
    }
}