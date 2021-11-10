import { IChartData } from '../../../stores/DashboardStore/IDashboardStore';
export default interface ICardRenderProps {
    data: Array<IChartData>;
    title: string;
}