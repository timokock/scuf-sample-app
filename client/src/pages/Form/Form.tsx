import * as React from 'react';
import { Grid, Card, InputLabel, Notification } from '@scuf/common';
import IFormProps from './IFromProps';
import { inject, observer } from 'mobx-react';
import ListHeader from '@Partials/ListHeader/ListHeader';
import LetterForm from './LetterFom/LetterForm';
@observer
/* 
    - This shows a view built around the supplied ValidationService, which simplifies form logic.
    - Notice the save and reject buttons are disabled while the store is disabled
    - Notice how to capture and use actionError for displaying server based errors
*/
export class FormPage extends React.Component<IFormProps> {
    constructor(props: IFormProps){
        super(props);
        this.props.formStore!.getRestricted();
    }
    render() {
        const store = this.props.formStore!;
        return (
            <Grid>
                <ListHeader
                    title="Form Page"
                    description="This page demonstrates building complex and reactive forms"
                />
                <Grid.Row>
                    <Grid.Column width={6} sWidth={12} sOrder={2} className="loader-frame">
                        {store.actionError && <Notification severity="critical">{store.actionError}</Notification>}
                        <LetterForm />
                        <Grid.Row>
                            <Grid.Column width={12}>
                                <p>The Save and Reject button are disabled when the form is invalid</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={6} sWidth={12} sOrder={1}>
                        <Card>
                            <Card.Header title="Form States" />
                            <Card.Content >
                                <InputLabel label="Form Errors" />
                                <code><pre>{JSON.stringify(store.form.errors, undefined, 2)}</pre></code>
                                <InputLabel label="Dirty Input Errors" />
                                <code><pre>{JSON.stringify(store.form.dirtyErrors, undefined, 2)}</pre></code>
                                <InputLabel label="Dirty Inputs" />
                                <code><pre>{JSON.stringify(store.form.dirty, undefined, 2)}</pre></code>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
export default inject('formStore')(FormPage);