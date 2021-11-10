// tslint:disable-next-line:no-any
export type FormObject = { [key: string]: any };

export type FormConfigData<T extends FormObject> = {
    [K in keyof T]: IFormConfigDataItem;
};

export interface IFormConfigDataItem { 
    value?: string | number | object | undefined; 
    validators?: Array<string>; 
}

export interface IPatchFormData {
    [key: string]: string | number | object | undefined;
}

export interface IFormDirty {
    [key: string]: boolean;
}