import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}\n`;
    
    var filePath = `$'./src/cdn/profile-files'}/${'requests.log'}`;

    // Write to log file
    fs.appendFileSync(filePath, logMessage);
    
    next();
  }
}
