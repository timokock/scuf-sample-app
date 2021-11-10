import * as React from 'react';
import { Chart } from '@scuf/charts';
import IBarChartRenderProps from './IBarChartRenderProps';

export default class BarChartRender extends React.Component<IBarChartRenderProps> {
    render() {
        const { title, data } = this.props;
        return (
            <Chart title={title} >
                {data.map((item, index) => <Chart.Column key={index} name={item.name} data={item.data}/>)}
            </Chart>
        );
    }
}