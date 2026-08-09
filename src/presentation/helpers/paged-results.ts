import { ApiProperty } from '@nestjs/swagger';

export class PagedResult<T> {
  @ApiProperty({ description: 'The list of items on the current page.', isArray: true, type: Object })
  items: T[];

  @ApiProperty({ description: 'The current page number.', example: 1 })
  pageNumber: number;

  @ApiProperty({ description: 'The size of each page.', example: 10 })
  pageSize: number;

  @ApiProperty({ description: 'The total number of items.', example: 100 })
  totalItems: number;

  @ApiProperty({ description: 'The total number of pages.', example: 10 })
  totalPages: number;

  constructor(
    items: T[],
    pageNumber: number,
    pageSize: number,
    totalItems: number,
    totalPages: number,
  ) {
    this.items = items;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalItems = totalItems;
    this.totalPages = totalPages;
  }
}
