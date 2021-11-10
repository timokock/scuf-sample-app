///<reference types="jest"/>
import { Test } from '@nestjs/testing';
import { TableController } from './TableController';
import { TableService } from '../Services/TableService';
import { TableData } from '../Models/TableData';

describe('TableController', () => {
    let tableController: TableController;
    let tableService: TableService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [TableController],
            components: [TableService]
        }).compile();

        tableService = module.get(TableService);
        tableController = module.get(TableController);
    });

    const tableDataStub: Array<TableData> = [
        {
            name: 'Alpha',
            callId: 'BCallOne',
            count: 1
        },
        {
            name: 'Bravo',
            callId: 'ACallTwo',
            count: 2
        },
        {
            name: 'Charlie',
            callId: '1CallThree',
            count: 3
        },
        {
            name: 'Delta',
            callId: '5CallFour',
            count: 1
        },
        {
            name: 'Echo',
            callId: 'ZCallFive',
            count: 5
        },
        {
            name: 'Foxtrot',
            callId: '6CallOne',
            count: 1
        },
        {
            name: 'Golf',
            callId: '7CallTwo',
            count: 2
        },
        {
            name: 'Hotel',
            callId: '8CallThree',
            count: 3
        },
        {
            name: 'India',
            callId: '9CallFour',
            count: 1
        },
        {
            name: 'Juliet',
            callId: '10CallFive',
            count: 5
        }
    ];

    describe('GET tabledata', () => {
        it('should make a call to TableService.getIndexData', async () => {
            const mock = jest.spyOn(tableService, 'getIndexData').mockImplementation(() => Promise.resolve(tableDataStub));

            expect(mock).toHaveBeenCalledTimes(0);
            await tableController.getIndexData();
            expect(mock).toHaveBeenCalledTimes(1);
        });

        it('should return an array of TableData', async () => {
            jest.spyOn(tableService, 'getIndexData').mockImplementation(() => Promise.resolve(tableDataStub));

            expect(await tableController.getIndexData()).toBe(tableDataStub);
        });
    });

    describe('Get table details', () => {

        it('should make a call to TableService.getDetails', async () => {
            const mock = jest.spyOn(tableService, 'getDetails').mockImplementation(() => Promise.resolve(tableDataStub));

            expect(mock).toHaveBeenCalledTimes(0);
            await tableController.getDetails();
            expect(mock).toHaveBeenCalledTimes(1);
        });

        it('should return an array of Details', async () => {
            jest.spyOn(tableService, 'getDetails').mockImplementation(() => Promise.resolve(tableDataStub));

            expect(await tableController.getDetails()).toBe(tableDataStub);
        });
    });
});