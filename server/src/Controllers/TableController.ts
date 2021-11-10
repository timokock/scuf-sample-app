import { Get, Controller, Inject } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { TableService } from '../Services/TableService';
import { TableData } from '../Models/TableData';

@ApiUseTags('Table')
@Controller('api')
export class TableController {

    constructor(@Inject(TableService) private tableService: TableService) { }

    @ApiResponse({ status: 200, description: 'Ok', isArray: true, type: Array<TableData>() })
    @ApiOperation({ title: 'Get static table data' })
    @Get('greek-alphabet')
    async getIndexData(): Promise<Array<TableData>> {
        return await this.tableService.getIndexData();
    }

    @ApiResponse({ status: 200, description: 'Ok', isArray: true, type: Array<TableData>() })
    @ApiOperation({ title: 'Get static table details' })
    @Get('details')
    async getDetails(): Promise<Array<TableData>> {
        return await this.tableService.getDetails();
    }
}