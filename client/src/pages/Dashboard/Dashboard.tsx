import * as React from 'react';
import { Grid, Card, Notification } from '@scuf/common';
import { inject, observer } from 'mobx-react';
import LineChartRender from './LineChartRender/LineChartRender';
import BarChartRender from './BarChartRender/BarChartRender';
import TableRender from './TableRender/TableRender';
import ListHeader from '../../partials/ListHeader/ListHeader';
import ContentLoader from '../../partials/ContentLoader/ContentLoader';
// If a component needs its own styles, we store these in a .scss file in the same directory.
import './Dashboard.scss';
// We store component props interfaces in separate files to simplify the main component file.
import IDashboardProps from './IDashboardProps';

@observer
export class DashboardPage extends React.Component<IDashboardProps> {
    constructor(props: IDashboardProps) {
        super(props);
        // it is best to populate stores in the constructor
        this.props.dashboardStore!.getLineChartData();
        this.props.dashboardStore!.getBarChartData();
        this.props.dashboardStore!.getTableData();
    }

    render() {
        /*
        -  The ContentLoader component offers a way to standardize an output for loading and error states. 
        -  This helps in writing small and testable view components.
        -  The page also uses a list header component due to the shared look and function across all pages of the site.
        -  The card content area also has a wrap class for the loader positioning.
        */
        const dashboard = this.props.dashboardStore!;
        return (
            <Grid>
                <ListHeader
                    title="Dashboard Page"
                    description="This page demonstrates the use of a REST API call that after successfully being processed, it renders the content of a chart. It also demonstrates the dynamic creation of components with map functions."
                />
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Card>
                            <Card.Header title="Line Chart Example" />
                            <Card.Content className="loader-frame">
                                <ContentLoader
                                    data={dashboard.lineChartContents}
                                    resolve={(data) => <LineChartRender data={data} title="Sample Chart" />}
                                />
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Card>
                            <Card.Header title="Column Chart Example" />
                            <Card.Content className="loader-frame">
                                <ContentLoader
                                    data={dashboard.lineChartContents}
                                    resolve={(data) => <BarChartRender data={data} title="Sample Chart" />}
                                />
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8} className="loader-frame">
                        <ContentLoader
                            data={dashboard.tableContents}
                            resolve={(data) => <TableRender data={data} />}
                        />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        {this.renderNotifications()}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    private renderNotifications = () => {
        /*  
            - This shows a simple method for iterating over data and outputting a view component. 
            - The index is often the best key which are required for lists.
        */
        const dashboard = this.props.dashboardStore!;
        return dashboard.notifications.map((notification, index) => (
            <Notification
                className="dashboard-notification"
                key={index}
                hasIcon={true}
                severity={notification.severity}
                tags={notification.tags}
            >
                {notification.content}
            </Notification>
        ));
    }
}
// Here the dashboardStore is injected from the stores key.
export default inject('dashboardStore')(DashboardPage);