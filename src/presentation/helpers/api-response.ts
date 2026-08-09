import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  @ApiProperty({ description: 'Indicates whether the request was successful.', example: true })
  success: boolean;

  @ApiProperty({ description: 'The HTTP status code of the response.', example: 200 })
  httpStatusCode: number;
  @ApiProperty({ description: 'The HTTP status code Name of the response.', example: 200 })
  httpStatusCodeName: string
  @ApiProperty({ description: 'The message associated with the response.', example: 'Operation completed successfully.' })
  message: string;

  @ApiProperty({ description: 'The count of data items if applicable.', example: 10, required: false })
  dataCount?: number;

  @ApiProperty({ description: 'The response data.', type: Object, required: false })
  data?: T;

  @ApiProperty({ description: 'A list of errors if any occurred.', isArray: true, type: String, required: false })
  errors: string[];

  constructor(
    success: boolean,
    httpStatusCode: number,
    httpStatusCodeName:string,
    message: string,
    data?: T,
    dataCount?: number,
    errors: string[] = [],
  ) {
    this.success = success;
    this.httpStatusCode = httpStatusCode;
    this.httpStatusCodeName=httpStatusCodeName;
    this.message = message;
    this.data = data;
    this.dataCount = dataCount;
    this.errors = errors;
  }
}
