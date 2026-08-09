import { ApiProperty } from "@nestjs/swagger";

export class WorkhouseStatDto {
  @ApiProperty()
  workhouse_id: number;

  @ApiProperty()
  workhousen_name: string;

  @ApiProperty()
  total_quantity: number;
}