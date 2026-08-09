// src/dashboard/dto/workhouse-dispatch-price-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class WorkhouseDispatchPriceResponseDto {
  @ApiProperty()
  workhouse_id: number;

  @ApiProperty()
  workhousen_name: string;

  @ApiProperty()
  total_price: number;
}
