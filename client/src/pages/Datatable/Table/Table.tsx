import * as React from 'react';
import { DataTable } from '@scuf/datatable';
import ITableProps from './ITableProps';
// This import shows how to get access to the ICellData interface from SCUF datatable package.
import { ICellData } from '@scuf/datatable/dist/components/DataTable/IDataTableInterfaces';
export default class Table extends React.Component<ITableProps> {
    render() {
        return (
            <DataTable
                data={this.props.data}
                reorderableColumns={true}
                resizableColumns={true}
            >
                <DataTable.Column field="name" header="Name" sortable={true} />
                <DataTable.Column field="index" header="Index" sortable={true} />
                <DataTable.Column
                    field="none"
                    header="Is Even"
                    renderer={(cellData) => this.renderStatusCell(cellData)}
                />
                <DataTable.Column field="letter" header="Letter" />
            </DataTable>
        );
    }

     // This function shows how to use the DataTable.Status and access row index and other row data
     private renderStatusCell = (cellData: ICellData) => {
        const color = (cellData.rowIndex + 1) % 2 === 0 ? 'green' : 'red';
        return <div className="custom-cell-wrap"><DataTable.Status color={color} />Is this Row Index Even?</div>;
    }
}