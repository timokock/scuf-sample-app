import * as React from 'react';
import { Table, Badge } from '@scuf/common';
import { IIndexPageRenderProps } from './ITableRenderProps';
import { ITableData } from '../../../stores/DashboardStore/IDashboardStore';
export default class TableRender extends React.Component<IIndexPageRenderProps> {
    render() {
        const { data } = this.props;
        return (
            <Table className="loading-table">
                <Table.Header>
                    <Table.HeaderCell content="Greek Alphabet Name" />
                    <Table.HeaderCell content="Greek Alphabet Letter" />
                    <Table.HeaderCell content="Letter Index" />
                </Table.Header>
                <Table.Body>
                    {data.map((item) => this.genRow(item))}
                </Table.Body>
            </Table>
        );
    }

    private genRow(item: ITableData) {
        return (
            <Table.Row key={item.index}>
                <Table.Cell content={item.name} />
                <Table.Cell content={item.letter} />
                <Table.Cell>
                    <Badge content={item.index.toString()} color="green" />
                </Table.Cell>
            </Table.Row>
        );
    }
}