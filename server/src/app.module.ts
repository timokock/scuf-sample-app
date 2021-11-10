import { Module } from '@nestjs/common';
import { ChartController } from './Controllers/ChartController';
import { ChartService } from './Services/ChartService';
import { TableController } from './Controllers/TableController';
import { TableService } from './Services/TableService';

@Module({
  imports: [],
  controllers: [
      ChartController,
      TableController
  ],
  components: [
      ChartService,
      TableService
  ],
})
export class AppModule {}
