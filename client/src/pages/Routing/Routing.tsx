import * as React from 'react';
import { GlobalRouterStore } from 'stores/RouterStore';
import { inject, observer } from 'mobx-react';
import { Button, Grid } from '@scuf/common';
import ListHeader from '../../partials/ListHeader/ListHeader';
type Props = { routerStore?: GlobalRouterStore };

// If a component needs its own styles, we store these in a .scss file in the same directory.
import './Routing.scss';

@observer
export class RouterPage extends React.Component<Props> {
    render() {
        // Store router as a const for easy access
        const router = this.props.routerStore!;
        return (
            <>
                <Grid>
                    <ListHeader
                        title={this.buildTitle()}
                        description="Here we demonstrate routing with parameters."
                    />
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <ul>
                                <li>
                                    In this case we use parameters to create unique pages for each of our characters
                                </li>
                                <li>
                                    Notice the URL reflects the character parameter
                                </li>
                                <li>
                                    For specifics on configuring the router, visit the <code>routes.ts</code> file
                                </li>
                            </ul>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <h3>Current route information:</h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={2} className="loader-frame">
                            Current route name:
                        </Grid.Column>
                        <Grid.Column className="border" width={8}>
                            <code>
                                {router.route.name}
                            </code>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={2} className="loader-frame">
                            Current route path:
                        </Grid.Column>
                        <Grid.Column className="border" width={8}>
                            <code>
                                {router.route.path}
                            </code>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={2} className="loader-frame">
                            Current route params:
                        </Grid.Column>
                        <Grid.Column className="border" width={8}>
                            <code>
                                {this.genParams()}
                            </code>
                        </Grid.Column>
                    </Grid.Row>
                    <br />
                    <br />
                    <Grid.Row>
                        <Grid.Column width={12}>
                            <h3>Click a button to route to a particular page</h3>
                        </Grid.Column>
                    </Grid.Row>
                    {/* 
                        Each button makes a call to the router's navigate function. First parameter is the route name, second is the params object.
                        Notice that we are actually passing in two paramers (character, actor) even though we only use 'character' in this example.
                     */}
                    <Grid.Row>
                        <Grid.Column className="horizontal-center" width={3}>
                            <Button
                                size="small"
                                icon="caret-right"
                                iconPosition="right"
                                onClick={() => router.navigate('routes', { character: 'Gamora', actor: 'Zoe Saldana' })}
                                content="Gamora"
                            />
                        </Grid.Column>
                        <Grid.Column className="vertical-center" width={9}>
                            <code>onClick={'{'}() => router.navigate('routes', {'{'} character: 'Gamora', actor: 'Zoe Saldana' {'}'}){'}'}</code>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column className="horizontal-center" width={3}>
                            <Button
                                size="small"
                                icon="caret-right"
                                iconPosition="right"
                                onClick={() => router.navigate('routes', { character: 'Groot', actor: 'Vin Diesel' })}
                                content="Groot"
                            />
                        </Grid.Column>
                        <Grid.Column className="vertical-center" width={9}>
                            <code>onClick={'{'}() => router.navigate('routes', {'{'} character: 'Groot', actor: 'Vin Diesel' {'}'}){'}'}</code>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column className="horizontal-center" width={3}>
                            <Button
                                size="small"
                                icon="caret-right"
                                iconPosition="right"
                                onClick={() => router.navigate('routes', { character: 'Rocket Raccoon', actor: 'Bradley Cooper' })}
                                content="Rocket Raccoon"
                            />
                        </Grid.Column>
                        <Grid.Column className="vertical-center" width={9}>
                            <code>onClick={'{'}() => router.navigate('routes', {'{'} character: 'Rocket Raccoon', actor: 'Bradley Cooper' {'}'}){'}'}</code>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>
        );
    }
    // Add the character name to the page title, if that parameter is present.
    private buildTitle = () => {
        let params = this.props.routerStore!.route.params;
        let char = 'character';
        let character = params[char] ? ' - ' + params[char] : '';
        return 'Routing Page' + character;
    }
    // Stringify route params for display purposes
    private genParams = () => {
        let params = this.props.routerStore!.route.params;
        return JSON.stringify(params);
    }
}
// This is how the RouterPage component gets access to the routerStore. You can add as many stores as you would like here.
export default inject('routerStore')(RouterPage);