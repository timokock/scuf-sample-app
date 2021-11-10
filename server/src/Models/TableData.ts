import { ApiModelProperty } from '@nestjs/swagger';

export class TableData {
@ApiModelProperty({
    description: 'Name',
    type: String
  })
  name: string;

  @ApiModelProperty({
    description: 'Letter',
    type: String,
  })
  letter: string;

  @ApiModelProperty({
    description: 'Index',
    type: Number
  })
  index: number;
}