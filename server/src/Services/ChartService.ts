import { Component } from '@nestjs/common';
import { ChartData } from '../Models/ChartData';

@Component()
export class ChartService {
    public async getChartData(): Promise<Array<ChartData>> {
        return new Array<ChartData>(
        {
            name: 'High',
            data: [ 51, 54, 62, 71, 79, 86, 87, 86, 82, 72, 61, 52 ],
            color: '#e01616'
        },
        {
            name: 'Low',
            data: [ 35, 37, 43, 51, 60, 67, 70, 69, 64, 54, 43, 37 ],
            color: '#1e87d8'
        });
    }

    public async getDetailsData(): Promise<Array<ChartData>> {
        return new Array<ChartData>(
        {
            name: 'New',
            data: [199999, 179999, 149999, 149999, 149999, 199999, 219999, 199999, 149999 ],
            color: ''
        },
        {
            name: 'User',
            data: [ 110000, 90000, 90000, 90000, 105000, 130000, 115000, 90000 ],
            color: ''
        });
    }
}