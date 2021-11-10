import { observable, action, computed, toJS } from 'mobx';
import ValidationService from '@Utils/ValidationService/ValidationService';
import ITableData from '@Stores/DataTableStore/IDataTableStore';
import { IPromiseBasedObservable, fromPromise, PENDING, REJECTED } from 'mobx-utils';
import RootStore from '@Stores/RootStore';

export default class FormStore {
    /* 
        - Here a form is set to an instance of the ValidationService. Then we can create an observable form that automatically validates its data.
            * 'Required' makes that key required
            * 'noSpaces' ensures no whitespace
            * 'unique' is a custom validator added below that ensures a value is not present in the passed in array
        - Notice that the ValidationService interface requires the passing in of an interface that maps to the shape of the form data.
            * This is used to strongly type the config, value, and dirtyErrors
    */
    public form = new ValidationService<ITableData>({
        name: { validators: ['required', 'noSpaces'] },
        letter: { value: 'ψ' , validators: []},
        index: { validators: ['required', 'unique'] },
    });

    @observable
    public sideBarCollapsed: boolean = false;
    @observable
    // This create one PromiseBasedObservable that can be assigned to any crud action and is used for loading state.
    public currentAction: IPromiseBasedObservable<ITableData> | null;
    @observable
    public restricted: Array<number> = [];
    constructor(
        // Stores can be used as dependencies of other stores. This allows for complex reactions to populated data sets.
        private rootStore: RootStore
    ) {
    }

    // This action is asynchronous, allowing for the resolution of an external PromiseBasedObservable.
    @action
    getRestricted = async () => {
        this.rootStore.tableStore.getTableData();
        /* 
            - This shows a shorthand way of extracting data from a PromiseBasedObservable, this produces and an array of indexes from the tableContents Observable.
            - Notice the await which auto extracts the promise resolution data.
            - The index is set to the length of restricted as this will be one longer the the data set.
        */
        this.restricted = await this.rootStore.tableStore.tableContents.then((res) => res.map((item) => item.index));
        this.form.value.index = this.restricted.length + 1;
        /* 
           - Here a custom validator is added to the validation service allowing for very context specific validators.
           - Validators come from Validate.js. For more see https://validatejs.org/#validators.
       */
        this.form.setValidator('unique', { exclusion: { within: this.restricted, message: '%{value} Is an existing index' } });
    }

    @action
    populate(data: ITableData) {
        // This shows how to patch an existing value into the form. It sets the form value and auto-validates the data.
        this.form.setFormValue(data);
    }

    @action
    save() {
        // Here we mock out an async call to show loading state and how to use currentAction to create efficient loading.
        let timeout: Promise<ITableData> = new Promise((resolve) => {
            let id = setTimeout(() => { clearTimeout(id); resolve(toJS(this.form.value)); }, 1000);
        });
        this.currentAction = fromPromise(timeout);
    }

    @action
    reject() {
        // Here we mock out an async call to show how to capture server call failures.
        let timeout: Promise<ITableData> = new Promise((_resolve, reject) => {
            let id = setTimeout(() => { clearTimeout(id); reject('Sample Server Error'); }, 1000);
        });
        this.currentAction = fromPromise(timeout);
    }

    @action
    clear() {
        // Here we clear all the value from ValidationService without affecting the core validators.
        this.form.clearForm();
    }

    @computed
    get isDisabled() {
        // This shows one of the key utilities offered by the ValidationService: a single key to track the form's validity. 
        return this.form.formIsInvalid;
    }

    // These use mobx-util's PENDING and REJECTED enums to call status checks.
    @computed
    get isLoading() {
        return !!this.currentAction && this.currentAction.state === PENDING || !this.restricted.length;
    }

    @computed
    get actionError(): string | undefined {
        return this.currentAction && this.currentAction.state === REJECTED && this.currentAction.value;
    }
} 