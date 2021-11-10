/*
    -  Here we define the dashboard's stores core data interfaces that are used to strongly type data. 
    -  Putting these in this file allow for a centralized  place that can be easily imported in various files.
*/
export interface IChartData {
    // Legend Name
    name: string;
    // Chart Data
    data: Array<number>;
    // Line color
    color: string;
}

export interface ITableData {
    // Row 'Name'
    name: string;
    // Row 'Greek Alphabet Letter'
    letter: string;
    // 'Letter Index'
    index: number;
}

export interface INotificationData {
    // whta type of notification 
    severity: 'critical' | 'important' | 'information' | 'success';
    // Test of notification
    content: string;
    // Tags to appear in notification
    tags?: Array<string>;
}
