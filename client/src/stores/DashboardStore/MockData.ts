import { INotificationData } from './IDashboardStore';

export const MockNotifications: Array<INotificationData> = [
    {
        severity: 'information',
        content: 'Flight KE320 Departed At 9:00am (PST)',
        tags: ['On Time', 'Korean Air', 'SFO']
    },
    {
        severity: 'success',
        content: 'Freight reached its destination (Atlanta Midtown).'
    },
    {
        severity: 'critical',
        content: 'Excessive pump vibration caused by a failing metal frame',
        tags: ['Refinery', 'Pump']
    }
];

export const MockChartData = { name: 'test', data: [1, 2], color: 'blue' };

export const MockTableData = {
    name: 'test',
    letter: 'a',
    index: 1
};