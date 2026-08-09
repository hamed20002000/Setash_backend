import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
import { ApiResponse } from 'src/presentation/helpers/api-response';
import { getHttpStatusName } from 'src/presentation/helpers/http-status-code';
import * as fs from "fs";
import * as path from "path";
  
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const logDir = path.join(__dirname, '../logs');
    const logFile = path.join(logDir, 'apple-login.log');

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const logMessage = `[${new Date().toISOString()}] error: ${JSON.stringify(exception, Object.getOwnPropertyNames(exception))}\n`;
    fs.appendFileSync(logFile, logMessage);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const statusName = getHttpStatusName(status);

    const rawResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : null;

    const message =
      typeof rawResponse === 'string'
        ? rawResponse
        : rawResponse && typeof rawResponse === 'object'
          ? (Array.isArray((rawResponse as any).message)
              ? (rawResponse as any).message[0]
              : (rawResponse as any).message ?? (exception as any).message)
          : exception instanceof HttpException
            ? (exception as any).message
            : 'Internal server error';

    const errors =
      typeof rawResponse === 'string'
        ? [rawResponse]
        : rawResponse && typeof rawResponse === 'object'
          ? (Array.isArray((rawResponse as any).message)
              ? (rawResponse as any).message
              : [(rawResponse as any).message])
          : ['An unexpected error occurred'];

    const errorResponse = new ApiResponse(
      false,
      status,
      statusName,
      message,
      undefined,
      undefined,
      errors,
    );

    response.status(status).json(errorResponse);
  }
}
