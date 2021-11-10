import { ApiModelProperty } from '@nestjs/swagger';

export class ChartData {
@ApiModelProperty({
    description: 'Name',
    type: String
  })
  name: string;

  @ApiModelProperty({
    description: 'Data',
    type: Number,
    isArray: true
  })
  data: Array<number>;

  @ApiModelProperty({
    description: 'Color',
    type: String
  })
  color: string;
}