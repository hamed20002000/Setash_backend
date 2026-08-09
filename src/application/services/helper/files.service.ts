import { Injectable } from '@nestjs/common';
import { unlink } from 'fs/promises';

@Injectable()
export class FileService {
  async deleteFile(filePath: string): Promise<void> {
    try {
      await unlink(filePath);
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
      
    }
  }
}
