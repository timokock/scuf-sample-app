///<reference types="jest"/>
import { Test } from '@nestjs/testing';
import { ChartController } from './ChartController';
import { ChartService } from '../Services/ChartService';
import { ChartData } from '../Models/ChartData';

describe('ChartController', () => {
    let chartController: ChartController;
    let chartService: ChartService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [ChartController],
            components: [ChartService]
        }).compile();

        chartService = module.get(ChartService);
        chartController = module.get(ChartController);
    });

    const chartDataStub: Array<ChartData> = [
        {
            name: 'High',
            data: [ 51, 54, 62, 71, 79, 86, 87, 86, 82, 72, 61, 52 ],
            color: '#e01616'
        },
        {
            name: 'Low',
            data: [ 35, 37, 43, 51, 60, 67, 70, 69, 64, 54, 43, 37 ],
            color: '#1e87d8'
        }
    ];

    describe('GET chartdata', () => {      
        it('should make a call to ChartService.getChartData', async () => {
            const mock = jest.spyOn(chartService, 'getChartData').mockImplementation(() => Promise.resolve(chartDataStub));

            expect(mock).toHaveBeenCalledTimes(0);
            await chartController.getChartData();
            expect(mock).toHaveBeenCalledTimes(1);
        });

        it('should return an array of ChartData', async () => {
            jest.spyOn(chartService, 'getChartData').mockImplementation(() => Promise.resolve(chartDataStub));

            expect(await chartController.getChartData()).toBe(chartDataStub);
        });
    });

    describe('GET detailsData', () => {        
        it('should make a call to ChartService.getDetailsData', async () => {
            const mock = jest.spyOn(chartService, 'getDetailsData').mockImplementation(() => Promise.resolve(chartDataStub));

            expect(mock).toHaveBeenCalledTimes(0);
            await chartController.getDetailsData();
            expect(mock).toHaveBeenCalledTimes(1);
        });

        it('should return an array of ChartData', async () => {
            jest.spyOn(chartService, 'getDetailsData').mockImplementation(() => Promise.resolve(chartDataStub));

            expect(await chartController.getDetailsData()).toBe(chartDataStub);
        });
    });
});