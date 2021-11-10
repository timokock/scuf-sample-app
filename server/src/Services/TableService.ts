import { Component } from '@nestjs/common';
import { TableData } from '../Models/TableData';

@Component()
export class TableService {
    public async getIndexData(): Promise<Array<TableData>> {
        return new Array<TableData> (
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
        });
    }

    public async getDetails(): Promise<Array<TableData>> {
        return new Array<TableData> (
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
        });
    }
}