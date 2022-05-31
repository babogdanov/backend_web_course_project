import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import { DataImportExtension, getFileExtension } from './file.utils';

export const multerOptions: MulterOptions = {
  limits: {
    // Limit the file to be 10mb at max
    fileSize: 1000 * 1000 * 10,
  },
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) {
    const { originalname } = file;
    const fileExtension = getFileExtension(originalname);
    const isExtensionAllowed =
      DataImportExtension[fileExtension as DataImportExtension] !== undefined;

    if (!isExtensionAllowed) {
      callback(
        new BadRequestException(`File type ${fileExtension} is not supported.`),
        false,
      );
    } else {
      callback(null, true);
    }
  },
};
