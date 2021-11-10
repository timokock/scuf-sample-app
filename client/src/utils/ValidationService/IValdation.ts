// tslint:disable-next-line:no-any
export type FormObject = { [key: string]: any };

export type ValidationEntry = { [key: string]: object };

export type FormConfigData<T extends FormObject> = {
    [K in keyof T]: FormConfigDataItem;
};

export interface FormConfigDataItem { 
    value?: string | number | object | undefined; 
    validators: Array<string>;
}

export interface PatchFormData {
    [key: string]: string | number | object | undefined;
}

export interface FormDirty {
    [key: string]: boolean;
}