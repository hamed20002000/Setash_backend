import {
    Injectable,
    BadRequestException,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Injectable()
export class FileUploadService {
    constructor() {}

    /**
     * Ensures the directory exists, or creates it if not.
     * @param dirPath The directory path to ensure.
     */
    private ensureDirectory(dirPath: string): void {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    /**
     * Get MulterOptions for file upload with specified path and validation.
     * @param uploadPath The path where files will be uploaded.
     */
    getMulterOptions(uploadPath: string): MulterOptions {
        this.ensureDirectory(uploadPath);

        return {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    cb(null, uploadPath);
                },
                filename: (req, file, cb) => {
                    const fileExtName = path.extname(file.originalname);
                    const fileName = `${Date.now()}-${Math.round(
                        Math.random() * 1e9,
                    )}${fileExtName}`;
                    cb(null, fileName);
                },
            }),
            fileFilter: (req, file, cb) => {
                const allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4'];
                if (allowedMimeTypes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new BadRequestException('Only images and videos are allowed!'), false);
                }
            },
        };
    }
}
