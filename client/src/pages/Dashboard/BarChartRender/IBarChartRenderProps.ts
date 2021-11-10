import { IChartData } from '@Stores/DashboardStore/IDashboardStore';
export default interface ICardRenderProps {
    data: Array<IChartData>;
    title: string;
}