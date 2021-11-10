import * as React from 'react';
import { Grid, Input, Loader, Card, Button } from '@scuf/common';
import IFormProps from './ILetterFromProps';
import { inject, observer } from 'mobx-react';

/* 
    - Input components display and adjust the stores form.value. This allows for clean, complex state management.
    - Notice the errors are bound to the form's dirtyErrors which means they will only appear after that key has been changed.
    - You can use the store's isLoading observable to capture the various actions that qualify as loading.
*/
@observer
export class LetterForm extends React.Component<IFormProps> {
    render() {
        const store = this.props.formStore!;
        const value = store.form.value;
        if (store.isLoading) {
            return <Loader minHeight={400} />;
        } else {
            return (
                <Card>
                    <Card.Header title="Form" />
                    <Card.Content>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={12}>
                                    <Input
                                        label="Name"
                                        error={store.form.dirtyErrors.name}
                                        fluid={true}
                                        onChange={(input) => value.name = input}
                                        value={value.name}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={12}>
                                    <Input
                                        label="Letter"
                                        error={store.form.dirtyErrors.letter}
                                        indicator="optional"
                                        fluid={true}
                                        onChange={(input) => value.letter = input}
                                        value={value.letter}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={12}>
                                    <Input
                                        label="Index"
                                        error={store.form.dirtyErrors.index}
                                        fluid={true}
                                        type="number"
                                        onChange={(input) => value.index = parseInt(input, 10)}
                                        value={value.index.toString()}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Button type="primary" content="Save" disabled={store.isDisabled} onClick={() => store.save()} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Button type="secondary" content="Reject" disabled={store.isDisabled} onClick={() => store.reject()} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Button type="inline" content="Clear" onClick={() => store.clear()} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
            );
        }
    }
}
export default inject('formStore')(LetterForm);