import * as React from 'react';
import { Chart } from '@scuf/charts';
import ILineChartRenderProps from './ILineChartRenderProps';

export default class LineChartRender extends React.Component<ILineChartRenderProps> {
    render() {
        const { title, data } = this.props;
        return (
            <Chart title={title} >
                {data.map((item, index) => <Chart.Line key={index} name={item.name} data={item.data} color={item.color} />)}
            </Chart>
        );
    }
}