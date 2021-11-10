///<reference types="jest"/>
import { Test } from '@nestjs/testing';
import { TableService } from './TableService';
import { TableData } from '../Models/TableData';

describe('tableService', () => {
    let tableService: TableService;

    const tableDataStub: Array<TableData> = [
        {
            name: 'Alpha',
            letter: 'α',
            index: 1
        },
        {
            name: 'Beta',
            letter: 'β',
            index: 2
        },
        {
            name: 'Gamma',
            letter: 'γ',
            index: 3
        },
        {
            name: 'Delta',
            letter: 'δ',
            index: 4
        },
        {
            name: 'Epsilon',
            letter: 'ε',
            index: 5
        }
    ];

    const detailsDataStub: Array<TableData> = [
        {
            name: 'Alpha',
            letter: 'α',
            index: 1
        },
        {
            name: 'Beta',
            letter: 'β',
            index: 2
        },
        {
            name: 'Gamma',
            letter: 'γ',
            index: 3
        },
        {
            name: 'Delta',
            letter: 'δ',
            index: 4
        },
        {
            name: 'Epsilon',
            letter: 'ε',
            index: 5
        },
        {
            name: 'Zeta',
            letter: 'ζ',
            index: 6
        },
        {
            name: 'Eta',
            letter: 'η',
            index: 7
        },
        {
            name: 'Theta',
            letter: 'θ',
            index: 8
        },
        {
            name: 'Iota',
            letter: 'ι',
            index: 9
        },
        {
            name: 'Kappa',
            letter: 'κ',
            index: 10
        }
    ];

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            components: [TableService]
        }).compile();

        tableService = module.get(TableService);
    });

    describe('getIndexData', () => {
        it('should return an array of IndexData', async () => {
            expect(await tableService.getIndexData()).toEqual(tableDataStub);
        });
    });

    describe('getDetailsData', () => {
        it('should return an array of DetailsData', async () => {
            expect(await tableService.getDetails()).toEqual(detailsDataStub);
        });
    });
});