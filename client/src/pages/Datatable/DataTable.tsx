import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid } from '@scuf/common';
import IDataTableProps from './IDataTableProps';
import ListHeader from '@Partials/ListHeader/ListHeader';
import ContentLoader from '@Partials/ContentLoader/ContentLoader';
import Table from './Table/Table';
@observer
export class DataTablePage extends React.Component<IDataTableProps> {
    constructor(props: IDataTableProps) {
        super(props);
        // It is best to populate stores in the constructor.
        this.props.tableStore!.getTableData();
    }
    render() {
        const store = this.props.tableStore!;
        return (
            <Grid>
                <ListHeader
                    title="Data Table Page"
                    description="This page demonstrates some of the basics of using data tables"
                    placeholder="Filter by Name"
                    onFilter={(query) => store.setFilter(query)}
                />
                <Grid.Row>
                    <Grid.Column width={12} className="loader-frame">
                        <ContentLoader
                            data={store.displayData}
                            resolve={(data) => <Table data={data}/>}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }   
}

export default inject('tableStore')(DataTablePage);