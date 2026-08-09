// src/dashboard/dto/workhouse-item-quantity-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class WorkhouseBetonQuantityResponseDto {
  @ApiProperty()
  workhouse_id: number;

  @ApiProperty()
  workhousen_name: string;

  @ApiProperty()
  total_quantity: number;

  @ApiProperty()
  total_price: number;
}
