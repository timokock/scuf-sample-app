import * as React from 'react';
import { observer } from 'mobx-react';
import { Loader, Notification } from '@scuf/common';
import IContentLoaderProps from './IContentLoaderProps';
import APIException from '@Utils/APIException';
/* 
   - This case function is one of the primary utilities provided by the MobX-utils PromiseBasedObservable.
       * Rejected is called if the passed promise is rejected and is passed the rejection error
       * Pending is called while the the passed promise is unresolved
       * Fulfilled is called when the passed promise is resolved and is passed in the resolve output 
   - The resolve prop is called when we reach the fulfilled case.
*/
@observer
export default class ContentLoader<T> extends React.Component<IContentLoaderProps<T>> {
    render() {
        const { resolve } = this.props;
        return this.props.data.case({
            rejected: (err: APIException) => <Notification hasIcon={true} severity="critical" title="Server Error">{err.status}</Notification>,
            pending: () => <Loader text="Loading Data" minHeight={400} />,
            fulfilled: (data) => { return resolve(data); }
        });
    }
}