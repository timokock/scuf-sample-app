import { IPromiseBasedObservable } from 'mobx-utils';
/*
-  Typescript allows for variable types allowing the capturing of passed in interfaces 
-  The <T> defines that as a variable within the interface
-  Here T is used to capture the interface defined in the stores definition of the passed in IPromiseBasedObservable
*/
export default interface IContentLoaderProps<T> {
    data: IPromiseBasedObservable<T>;
    resolve: (data: T) => JSX.Element;
}