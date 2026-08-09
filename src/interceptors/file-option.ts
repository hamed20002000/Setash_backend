import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';  // Import fs to check and create directories

export const fileUploadOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
     const uploadPath = process.env.UPLOAD_LOCATION || path.resolve(__dirname, '../../uploads');

      // Check if the directory exists, if not, create it
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });  // Create directory if it doesn't exist
      }

      cb(null, uploadPath);  // Proceed to save the file in the directory
    },
    filename: (req, file, cb) => {
      const fileExtName = path.extname(file.originalname);
      const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExtName}`;
      cb(null, fileName);
    },
  }),
};
