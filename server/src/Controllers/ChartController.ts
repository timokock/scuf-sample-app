import { Get, Controller, Inject } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ChartService } from '../Services/ChartService';
import { ChartData } from '../Models/ChartData';

@ApiUseTags('Chart')
@Controller('api')
export class ChartController {

    constructor(@Inject(ChartService) private chartService: ChartService) { }

    @ApiResponse({ status: 200, description: 'Ok', isArray: true, type: Array<ChartData>() })
    @ApiOperation({ title: 'Get static chart data' })
    @Get('chartdata')
    async getChartData(): Promise<Array<ChartData>> {
        return await this.chartService.getChartData();
    }

    @ApiResponse({ status: 200, description: 'Ok', isArray: true, type: Array<ChartData>() })
    @ApiOperation({ title: 'Get static details data' })
    @Get('detailsdata')
    async getDetailsData(): Promise<Array<ChartData>> {
        return await this.chartService.getDetailsData();
    }
}